import { resolveSegment, isSuppressedPath } from "@/config/exit-intent";
import { trackExitIntent } from "@/lib/utils/tracking";
import type { ExitIntentSegment } from "@/types";

interface ExitIntentState {
  shown_at?: number;
  dismissed_at?: number;
  converted_at?: number;
}

const STATE_KEY = "exit_intent_state";
const SESSION_KEY = "exit_intent_shown_session";
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const MIN_TIME_ON_PAGE_MS = 10_000;
const MIN_SCROLL_PERCENT = 25;
const MIN_DESKTOP_WIDTH = 768;

function readState(): ExitIntentState {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? (JSON.parse(raw) as ExitIntentState) : {};
  } catch {
    return {};
  }
}

function writeState(state: ExitIntentState) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    /* storage full / disabled — non-fatal */
  }
}

function canShow(): boolean {
  if (window.innerWidth < MIN_DESKTOP_WIDTH) return false;
  if (isSuppressedPath(window.location.pathname)) return false;
  if (sessionStorage.getItem(SESSION_KEY)) return false;

  const state = readState();
  if (state.converted_at) return false;
  if (
    state.dismissed_at &&
    Date.now() - state.dismissed_at < DISMISS_COOLDOWN_MS
  ) {
    return false;
  }
  return true;
}

function isFocusedInForm(): boolean {
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    (el as HTMLElement).isContentEditable === true
  );
}

async function openOverlay(segment: ExitIntentSegment) {
  const overlay = document.getElementById(`exit-intent-${segment}`);
  if (!overlay) return;
  try {
    // Preline ships overlay.mjs without bundled .d.ts. GlobalScripts.astro
    // resolves the same module via @ts-nocheck; here we narrow it locally.
    // @ts-expect-error — no declaration file for preline/dist/overlay.mjs
    const mod = (await import("preline/dist/overlay.mjs")) as {
      HSOverlay?: { open: (selector: string) => void };
      default?: { open: (selector: string) => void };
    };
    const HSOverlay = mod.HSOverlay ?? mod.default;
    HSOverlay?.open(`#exit-intent-${segment}`);
  } catch {
    /* Preline failed to load — leave modal hidden, don't break the page */
  }
}

export function initExitIntent() {
  if (window.innerWidth < MIN_DESKTOP_WIDTH) return;
  if (isSuppressedPath(window.location.pathname)) return;

  const segment = resolveSegment(window.location.pathname);
  const overlay = document.getElementById(`exit-intent-${segment.segment}`);
  if (!overlay) return;

  const pageLoadedAt = Date.now();
  let maxScrollPercent = 0;
  let triggered = false;

  const updateScroll = () => {
    const scrollable = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    const pct = (window.scrollY / scrollable) * 100;
    if (pct > maxScrollPercent) maxScrollPercent = pct;
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  const trigger = async () => {
    if (triggered) return;
    if (!canShow()) return;
    if (Date.now() - pageLoadedAt < MIN_TIME_ON_PAGE_MS) return;
    if (maxScrollPercent < MIN_SCROLL_PERCENT) return;
    if (isFocusedInForm()) return;

    triggered = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    const state = readState();
    state.shown_at = Date.now();
    writeState(state);

    await openOverlay(segment.segment);
    trackExitIntent("shown", segment.segment);
  };

  const onMouseLeave = (e: MouseEvent) => {
    // Desktop exit-intent: cursor crossing top edge into browser chrome.
    // relatedTarget is null when leaving the document entirely.
    if (e.clientY > 10 || e.relatedTarget !== null) return;
    void trigger();
  };

  document.documentElement.addEventListener("mouseleave", onMouseLeave);

  // Wire dismiss tracking. Preline fires `close.hs.overlay` when the user
  // closes via the X button, backdrop click, or Esc. The submit handler in
  // ExitIntentModal.astro persists `converted_at` separately, so a close
  // event after a successful submit shouldn't be recorded as a dismissal.
  document.addEventListener("close.hs.overlay", (event: Event) => {
    const detail = (event as CustomEvent).detail;
    const overlayEl = detail?.payload as HTMLElement | undefined;
    const closedSegment = overlayEl?.getAttribute("data-exit-intent-overlay");
    if (!closedSegment) return;
    if (closedSegment !== segment.segment) return;

    const state = readState();
    if (state.converted_at) return;
    state.dismissed_at = Date.now();
    writeState(state);
    trackExitIntent("dismissed", segment.segment as ExitIntentSegment);
  });
}
