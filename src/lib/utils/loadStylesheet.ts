const pending = new Map<string, Promise<void>>();

/**
 * Appends a stylesheet at runtime, once per URL.
 *
 * Vite resolves a bare `import("some.css")` at build time and hoists the result
 * into the page's <head> — even when that import sits inside a lazy code path
 * that never runs. Two vendor stylesheets were shipping exactly that way:
 *
 *  - Plyr's (32 KB, on 60 pages) for a video player no page currently renders.
 *  - vanilla-cookieconsent's (32 KB, on all 82 pages) directly beneath a comment
 *    promising it is "imported on demand here only — never for US/non-GDPR".
 *
 * Pair this with a `?url` import so Vite still emits and content-hashes the
 * asset; only the <link> insertion moves to runtime, off the critical path.
 */
export function loadStylesheet(href: string): Promise<void> {
  const existing = pending.get(href);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.addEventListener("load", () => resolve());
    link.addEventListener("error", () =>
      reject(new Error(`Failed to load stylesheet: ${href}`)),
    );
    document.head.appendChild(link);
  });

  pending.set(href, promise);
  return promise;
}
