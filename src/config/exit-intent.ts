import type { ExitIntentConfig } from "@/types";

/**
 * Exit-intent modal segments. Route patterns are matched as prefixes
 * against `window.location.pathname` (after stripping the optional [...lang]
 * segment). First match wins, evaluated in array order — keep more specific
 * patterns before broader ones. Anything that matches nothing falls through
 * to the "default" segment, which must remain last.
 */
export const exitIntentConfig: ExitIntentConfig = {
  segments: [
    {
      segment: "cold-email",
      routes: [
        "/products/cold-email",
        "/products/email-warmup",
        "/products/email-verification",
        "/services/cold-email-infrastructure",
        "/compare/instantly",
        "/compare/lemlist",
      ],
      title: "Before you go — what's your stack costing you?",
      description:
        "Your $37/mo tool actually costs $600+ once you add domains, inboxes, warmup, and a verifier. Tell us your setup and we'll send you the true-cost breakdown across 18 providers.",
      submitLabel: "Send me the comparison",
      successTitle: "Check your inbox.",
      successBody:
        "We'll email the 18-provider true-cost comparison within an hour. Reply to that email if you want a 10-minute audit of your current stack.",
      fields: [
        {
          name: "email",
          label: "Work Email",
          type: "email",
          placeholder: "you@company.com",
          required: true,
          autocomplete: "email",
        },
        {
          name: "current_tool",
          label: "What are you using today?",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select your current tool" },
            { value: "Instantly", label: "Instantly" },
            { value: "Lemlist", label: "Lemlist" },
            { value: "Smartlead", label: "Smartlead" },
            { value: "Apollo", label: "Apollo" },
            { value: "Salesloft", label: "Salesloft" },
            { value: "Outreach", label: "Outreach" },
            { value: "Other", label: "Other / DIY" },
            { value: "Nothing yet", label: "Nothing yet" },
          ],
        },
        {
          name: "monthly_send_volume",
          label: "How many emails per month?",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select monthly volume" },
            { value: "<5k", label: "Under 5,000" },
            { value: "5k-25k", label: "5,000 – 25,000" },
            { value: "25k-100k", label: "25,000 – 100,000" },
            { value: "100k+", label: "100,000+" },
          ],
        },
      ],
    },
    {
      segment: "leads",
      routes: [
        "/services/apollo-scraper",
        "/services/sales-navigator-scraper",
        "/services/custom-scraping",
        "/services/free-leads",
        "/products/email-finder",
        "/compare/apollo",
        "/compare/clay",
      ],
      title: "Describe your ideal customer",
      description:
        "We'll match 25 signal-qualified potential buyers to your ICP and deliver verified decision-maker contacts within 48 hours. No credit card.",
      submitLabel: "Get my 25 free buyers",
      successTitle: "You're on the list.",
      successBody:
        "We'll match 25 signal-qualified potential buyers to your ICP and deliver them within 48 hours. Watch your inbox.",
      fields: [
        {
          name: "email",
          label: "Work Email",
          type: "email",
          placeholder: "you@company.com",
          required: true,
          autocomplete: "email",
        },
        {
          name: "company",
          label: "Company Name",
          type: "text",
          placeholder: "Acme Corp",
          required: true,
          autocomplete: "organization",
        },
        {
          name: "icp",
          label: "Describe your ideal customer",
          type: "textarea",
          placeholder:
            "e.g. B2B SaaS, 50-200 employees, using HubSpot, actively hiring SDRs",
          required: true,
          rows: 4,
        },
      ],
    },
    {
      segment: "pricing",
      routes: ["/pricing"],
      title: "See what your stack actually costs",
      description:
        "Tell us what you're spending today and where it hurts. We'll send a personalized comparison showing what the same outcome costs on SendEmAll — including the costs your current tool hides.",
      submitLabel: "Send my cost breakdown",
      successTitle: "Got it.",
      successBody:
        "Your personalized cost comparison is on the way. We'll also flag the hidden costs in your current stack — domains, inboxes, warmup, and verification.",
      fields: [
        {
          name: "email",
          label: "Work Email",
          type: "email",
          placeholder: "you@company.com",
          required: true,
          autocomplete: "email",
        },
        {
          name: "current_monthly_spend",
          label: "What are you spending per month today?",
          type: "text",
          placeholder: "$600 / mo across all outbound tools",
          required: true,
        },
        {
          name: "biggest_pain",
          label: "What's hurting most?",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Pick one" },
            { value: "Deliverability", label: "Emails landing in spam" },
            { value: "Cost", label: "Hidden costs adding up" },
            { value: "Replies", label: "Sending a lot, getting nothing back" },
            { value: "Scale", label: "Can't scale beyond a few mailboxes" },
          ],
        },
      ],
    },
    {
      segment: "use-case",
      routes: [
        "/use-cases/saas",
        "/use-cases/agencies",
        "/use-cases/recruiters",
        "/use-cases/consultants",
        "/use-cases/startups",
      ],
      title: "Get the outbound playbook for your team",
      description:
        "A 12-page playbook with the exact sequences, signals, and ICP filters that work for teams like yours — built from 200+ campaigns we've run.",
      submitLabel: "Send me the playbook",
      successTitle: "On the way.",
      successBody:
        "Your role-specific outbound playbook lands in your inbox within an hour. Reply to it if you want us to walk through it on a call.",
      fields: [
        {
          name: "email",
          label: "Work Email",
          type: "email",
          placeholder: "you@company.com",
          required: true,
          autocomplete: "email",
        },
      ],
    },
    {
      segment: "default",
      routes: ["/"],
      title: "Get the weekly outbound playbook",
      description:
        "One email a week. Real campaign teardowns, deliverability fixes, and ICP signals worth chasing. No fluff, unsubscribe anytime.",
      submitLabel: "Send me the playbook",
      successTitle: "Subscribed.",
      successBody:
        "First playbook lands in your inbox this week. Reply any time — we read every response.",
      fields: [
        {
          name: "email",
          label: "Work Email",
          type: "email",
          placeholder: "you@company.com",
          required: true,
          autocomplete: "email",
        },
      ],
    },
  ],
};

const KNOWN_LANGS = new Set(["en", "english"]);

/**
 * Strip a leading language segment so `/en/products/cold-email` matches
 * the `/products/cold-email` route pattern. Keeps the leading slash.
 */
function stripLangPrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && KNOWN_LANGS.has(parts[0]!.toLowerCase())) {
    return "/" + parts.slice(1).join("/");
  }
  return pathname;
}

/**
 * Resolve which segment a pathname belongs to. Matches by route prefix in
 * config order. The "default" segment must be last and is always returned
 * as a fallback (matches "/").
 */
export function resolveSegment(
  pathname: string,
): ExitIntentConfig["segments"][number] {
  const normalized = stripLangPrefix(pathname);
  for (const segment of exitIntentConfig.segments) {
    if (segment.segment === "default") continue;
    for (const route of segment.routes) {
      if (normalized === route || normalized.startsWith(route + "/")) {
        return segment;
      }
    }
  }
  const fallback = exitIntentConfig.segments.find(
    (s) => s.segment === "default",
  );
  if (!fallback) throw new Error("exit-intent: missing default segment");
  return fallback;
}

/**
 * Paths where the modal must never show. Forms here already capture intent
 * (contact) or are internal (API). Match by prefix.
 */
export const SUPPRESS_PATH_PREFIXES = ["/contact", "/api"];

export function isSuppressedPath(pathname: string): boolean {
  const normalized = stripLangPrefix(pathname);
  return SUPPRESS_PATH_PREFIXES.some(
    (p) => normalized === p || normalized.startsWith(p + "/"),
  );
}
