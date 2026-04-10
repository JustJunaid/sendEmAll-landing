import type { APIRoute } from "astro";

export const prerender = false;

type FormType = "lead-magnet" | "service-request" | "product-interest";

function buildFields(
  formType: FormType,
  data: Record<string, string>,
): Record<string, unknown> {
  const utm = {
    ...(data.utm_source && { utm_source: data.utm_source }),
    ...(data.utm_medium && { utm_medium: data.utm_medium }),
    ...(data.utm_campaign && { utm_campaign: data.utm_campaign }),
    ...(data.utm_content && { utm_content: data.utm_content }),
    ...(data.utm_term && { utm_term: data.utm_term }),
    ...(data.referrer && { referrer: data.referrer }),
    ...(data.landing_page && { landing_page: data.landing_page }),
  };

  if (formType === "lead-magnet") {
    return {
      "Work Email": data.email,
      "Company Name": data.company,
      "Ideal Customer Description": data.icp,
      "Monthly Volume": data.volume,
      ...utm,
    };
  }

  if (formType === "service-request") {
    return {
      "Work Email": data.email,
      "Company Name": data.company,
      "What Do You Need": data.need,
      ...(data.website && { Website: data.website }),
      ...utm,
    };
  }

  // product-interest
  return {
    "Work Email": data.email,
    "Company Name": data.company,
    "Products Interested": data.products
      ? data.products.split(",").map((p) => p.trim()).filter(Boolean)
      : [],
    ...(data.current_tool && { "Current Outbound Tool": data.current_tool }),
    ...utm,
  };
}

export const POST: APIRoute = async ({ request }) => {
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const formType = data.formType as FormType;
  if (!["lead-magnet", "service-request", "product-interest"].includes(formType)) {
    return json({ error: "Invalid form type." }, 400);
  }

  const apiKey = import.meta.env.AIRTABLE_API_KEY;
  const baseId = import.meta.env.AIRTABLE_BASE_ID;
  const tableMap: Record<FormType, string> = {
    "lead-magnet": import.meta.env.AIRTABLE_TABLE_LEAD_MAGNET ?? "",
    "service-request": import.meta.env.AIRTABLE_TABLE_SERVICE_REQUEST ?? "",
    "product-interest": import.meta.env.AIRTABLE_TABLE_PRODUCT_INTEREST ?? "",
  };
  const tableId = tableMap[formType];

  if (!apiKey || !baseId || !tableId) {
    console.error("Missing Airtable env vars for form type:", formType);
    return json({ error: "Server configuration error." }, 500);
  }

  const fields = buildFields(formType, data);

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields }),
      },
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Airtable error:", JSON.stringify(err));
      return json({ error: "Submission failed. Please try again." }, 502);
    }

    return json({ success: true });
  } catch (err) {
    console.error("Network error submitting to Airtable:", err);
    return json({ error: "Network error. Please try again." }, 500);
  }
};
