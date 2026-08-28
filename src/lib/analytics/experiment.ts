/**
 * PostHog A/B experiments for static (Astro MPA) pages.
 *
 * Usage — mark each variant of an element with the same flag key and a variant name:
 *
 *   <span data-ab="hero_headline" data-ab-variant="control">Find verified buyers.</span>
 *   <span data-ab="hero_headline" data-ab-variant="test_a" hidden>Outbound that lands.</span>
 *
 * The "control" variant renders by default (no flash / no blank) and is swapped
 * to the assigned variant once PostHog resolves the feature flag. Create the
 * matching experiment in the PostHog UI with:
 *   - Feature flag key = the `data-ab` value (e.g. `hero_headline`)
 *   - Variants = the `data-ab-variant` values (`control`, `test_a`, …)
 *   - Goal metric = a captured event (e.g. `signup_click`)
 *
 * Exposure is tracked automatically: getFeatureFlag() fires `$feature_flag_called`,
 * which PostHog uses to attribute the goal metric to the assigned variant.
 */
export function initExperiments() {
  if (typeof window === "undefined") return;
  const ph = (window as any).posthog;
  if (!ph || typeof ph.onFeatureFlags !== "function") return;

  const apply = () => {
    const groups = new Map<string, HTMLElement[]>();
    document.querySelectorAll<HTMLElement>("[data-ab]").forEach((el) => {
      const key = el.getAttribute("data-ab");
      if (!key) return;
      (groups.get(key) ?? groups.set(key, []).get(key)!).push(el);
    });

    groups.forEach((els, key) => {
      const flag = ph.getFeatureFlag(key); // string variant | boolean | undefined
      const chosen = typeof flag === "string" ? flag : "control";
      els.forEach((el) => {
        const variant = el.getAttribute("data-ab-variant") || "control";
        // Inline + important, so this beats both the default stylesheet rule and
        // the pre-paint style regardless of cascade layers. (`hidden` can't be
        // used here — see the note in components.css.)
        el.style.setProperty(
          "display",
          variant === chosen ? "block" : "none",
          "important",
        );
      });
    });

    // The pre-paint script in Head.astro applied the *cached* assignment as
    // !important CSS. Real flags have now landed, so drop it — otherwise a
    // stale cached variant would outrank the answer we just applied.
    document.getElementById("ab-preboot")?.remove();
  };

  // Fires now if flags are already loaded, and again if they change.
  ph.onFeatureFlags(apply);
}
