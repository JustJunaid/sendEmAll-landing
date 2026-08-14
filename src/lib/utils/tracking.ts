/**
 * Shared tracking utilities for form submissions and page events.
 * Fires GA4 events (frozen legacy layer), PostHog events (primary), and
 * identifies visitors in Intercom.
 *
 * GA4 `gtag` is defined globally in CookieConsent.astro's inline script.
 * PostHog + Intercom load on consent via CookieConsent.astro.
 * All wrappers guard the missing global — safe to call immediately.
 */

type FormType = "lead-magnet" | "service-request" | "product-interest";

interface FormData {
  formType: FormType;
  email?: string;
  company?: string;
  [key: string]: string | undefined;
}

/** Convenience wrapper — window.gtag may not exist if consent denied + ad-blocker */
function ga(...args: any[]) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag(...args);
  }
}

/** Convenience wrapper for Intercom (variadic — trackEvent takes name + metadata) */
function intercom(...args: any[]) {
  if (typeof window !== "undefined" && (window as any).Intercom) {
    (window as any).Intercom(...args);
  }
}

/** Convenience wrapper for PostHog (primary product analytics) */
function ph(event: string, props?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture(event, props);
  }
}
function phIdentify(id: string, props?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.identify(id, props);
  }
}

/**
 * Fire all tracking events after a successful form submission.
 * Call this in the form's success handler, right after showing the success state.
 */
export function trackFormSubmission(data: FormData) {
  const { formType, email, company, ...rest } = data;

  // --- GA4: generate_lead event (frozen legacy) ---
  ga("event", "generate_lead", {
    form_type: formType,
    currency: "USD",
    value: formType === "lead-magnet" ? 25 : formType === "service-request" ? 50 : 10,
    lead_source: rest.utm_source || "direct",
  });
  ga("event", "form_submission", {
    form_type: formType,
    volume: rest.volume || "",
    landing_page: rest.landing_page || "",
    utm_source: rest.utm_source || "",
    utm_medium: rest.utm_medium || "",
    utm_campaign: rest.utm_campaign || "",
  });

  // --- PostHog: form_submission (primary) + identify ---
  ph("form_submission", {
    form_type: formType,
    volume: rest.volume || undefined,
    utm_source: rest.utm_source || undefined,
    utm_medium: rest.utm_medium || undefined,
    utm_campaign: rest.utm_campaign || undefined,
    landing_page: rest.landing_page || undefined,
  });
  if (email) {
    phIdentify(email, {
      email,
      ...(company && { company }),
      form_type: formType,
    });
  }

  // --- Intercom: identify the visitor (anonymous Visitor -> known Lead) ---
  if (email) {
    intercom("update", {
      email,
      ...(company && {
        company: { name: company },
      }),
      custom_attributes: {
        form_type: formType,
        ...(rest.volume && { volume_needed: rest.volume }),
        ...(rest.icp && { icp_description: rest.icp }),
        ...(rest.utm_source && { utm_source: rest.utm_source }),
        ...(rest.landing_page && { landing_page: rest.landing_page }),
        signup_date: new Date().toISOString().split("T")[0],
      },
    });
    intercom("trackEvent", "form-submitted", {
      form_type: formType,
      ...(rest.volume && { volume: rest.volume }),
    });
  }
}

/**
 * Track high-intent page views (pricing, compare, product pages).
 */
export function trackPageIntent(pageName: string) {
  ga("event", `${pageName}_view`, {
    page_title: document.title,
    page_location: window.location.href,
  });
  ph("page_intent", { page: pageName, title: document.title });
}

/**
 * Track CTA button clicks. `signup_click` is the primary conversion signal —
 * fired whenever a CTA points at the app's registration.
 */
export function trackCTAClick(ctaLabel: string, destination: string) {
  ga("event", "cta_click", {
    cta_label: ctaLabel,
    cta_destination: destination,
    page_location: window.location.href,
  });
  ph("cta_click", { label: ctaLabel, destination });
  if (/app\.sendemall\.com\/register|\/register|\/signup/.test(destination)) {
    ph("signup_click", { label: ctaLabel, location: window.location.pathname });
  }
}

/**
 * Track form start (first field interaction) — measures abandonment.
 */
export function trackFormStart(formType: FormType) {
  ga("event", "form_start", { form_type: formType });
  ph("form_start", { form_type: formType });
}

/**
 * Track how far down the page a visitor scrolls. Fired once per threshold
 * (25/50/75/100%). Answers "does the hero's promise actually pull people down?"
 * PostHog-only — GA4 stays the frozen legacy layer.
 */
export function trackScrollDepth(percent: number) {
  ph("scroll_depth", {
    percent,
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

/**
 * Track when a named page section first enters the viewport (fired once each).
 * Turns the page into a funnel — which "beats" (problem, how, pricing, why)
 * get seen before the visitor bounces or converts.
 */
export function trackSectionView(section: string) {
  ph("section_view", {
    section,
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}
