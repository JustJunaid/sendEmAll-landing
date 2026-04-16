/**
 * Shared tracking utilities for form submissions and page events.
 * Fires GA4 events, identifies visitors in Intercom, and tracks Clarity goals.
 *
 * GA4 `gtag` is defined globally in CookieConsent.astro's inline script.
 * Intercom loads on every page via CookieConsent.astro.
 * Both queue events if not yet loaded — safe to call immediately.
 */

type FormType = "lead-magnet" | "service-request" | "product-interest";

interface FormData {
  formType: FormType;
  email?: string;
  company?: string;
  [key: string]: string | undefined;
}

/** Convenience wrapper — gtag may not exist if consent denied + ad-blocker */
function gtag(...args: any[]) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag(...args);
  }
}

/** Convenience wrapper for Intercom */
function intercom(method: string, data?: any) {
  if (typeof window !== "undefined" && (window as any).Intercom) {
    (window as any).Intercom(method, data);
  }
}

/** Convenience wrapper for Clarity */
function clarity(method: string, ...args: any[]) {
  if (typeof window !== "undefined" && (window as any).clarity) {
    (window as any).clarity(method, ...args);
  }
}

/**
 * Fire all tracking events after a successful form submission.
 * Call this in the form's success handler, right after showing the success state.
 */
export function trackFormSubmission(data: FormData) {
  const { formType, email, company, ...rest } = data;

  // --- GA4: generate_lead event ---
  // This is GA4's recommended event for lead gen conversions.
  // Mark it as a Key Event in GA4 Admin > Events for conversion tracking.
  gtag("event", "generate_lead", {
    form_type: formType,
    currency: "USD",
    value: formType === "lead-magnet" ? 25 : formType === "service-request" ? 50 : 10,
    lead_source: rest.utm_source || "direct",
  });

  // --- GA4: custom event with more detail ---
  gtag("event", "form_submission", {
    form_type: formType,
    volume: rest.volume || "",
    landing_page: rest.landing_page || "",
    utm_source: rest.utm_source || "",
    utm_medium: rest.utm_medium || "",
    utm_campaign: rest.utm_campaign || "",
  });

  // --- Intercom: identify the visitor ---
  // Converts anonymous Intercom Visitor into a known Lead.
  // Their entire browsing history is now attached to their identity.
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

    // Fire Intercom event for sequence triggers
    intercom("trackEvent", "form-submitted", {
      form_type: formType,
      ...(rest.volume && { volume: rest.volume }),
    });
  }

  // --- Clarity: tag the session ---
  // Makes this session filterable in Clarity dashboard as a conversion session.
  clarity("set", "form_type", formType);
  if (email) clarity("identify", email);
}

/**
 * Track high-intent page views.
 * Call on pricing, compare, and product pages.
 */
export function trackPageIntent(pageName: string) {
  gtag("event", `${pageName}_view`, {
    page_title: document.title,
    page_location: window.location.href,
  });
  clarity("set", "intent_page", pageName);
}

/**
 * Track CTA button clicks.
 * Attach to primary CTA buttons across the site.
 */
export function trackCTAClick(ctaLabel: string, destination: string) {
  gtag("event", "cta_click", {
    cta_label: ctaLabel,
    cta_destination: destination,
    page_location: window.location.href,
  });
}

/**
 * Track form start (first field interaction).
 * Measures form abandonment — how many start vs complete.
 */
export function trackFormStart(formType: FormType) {
  gtag("event", "form_start", {
    form_type: formType,
  });
}
