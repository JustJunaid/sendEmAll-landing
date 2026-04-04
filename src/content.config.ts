import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import config from "../.astro/config.generated.json";

const { integrationFolder } = config.settings;

const contentLoader = (base: string) =>
  glob({ pattern: "**/[^_]*.{md,mdx}", base });

/* -------------------------------------------------------------------------- */
/* PAGE SCHEMA */
/* -------------------------------------------------------------------------- */

const page = z.object({
  title: z.string(),
  date: z.coerce.date().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  draft: z.boolean().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  robots: z.string().optional(),
  excludeFromSitemap: z.boolean().optional(),
  customSlug: z.string().optional(),
  canonical: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  disableTagline: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/* CTA BUTTON */
/* -------------------------------------------------------------------------- */

const buttonSchema = z.object({
  enable: z.boolean(),
  label: z.string(),
  url: z.string(),
  rel: z.string().optional(),
  target: z.string().optional(),
});

/* -------------------------------------------------------------------------- */
/* PAGES */
/* -------------------------------------------------------------------------- */

const pagesCollection = defineCollection({
  loader: contentLoader("./src/content/pages"),
  schema: page,
});

/* -------------------------------------------------------------------------- */
/* BLOG */
/* -------------------------------------------------------------------------- */

const blogCollection = defineCollection({
  loader: contentLoader("./src/content/blog"),
  schema: page.extend({
    categories: z.array(z.string()).default(["others"]),
    author: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

/* -------------------------------------------------------------------------- */
/* INTEGRATIONS */
/* -------------------------------------------------------------------------- */

const integrationCollection = defineCollection({
  loader: contentLoader("./src/content/integration"),
  schema: page.extend({
    categories: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
    ctaBtn: buttonSchema.optional(),

    sections: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          category: z.string(),
        }),
      )
      .optional(),

    fields: z
      .array(
        z.object({
          name: z.string(),
          content: z.string(),
        }),
      )
      .optional(),
  }),
});

/* -------------------------------------------------------------------------- */
/* EXPORT COLLECTIONS */
/* -------------------------------------------------------------------------- */

export const collections = {
  blog: blogCollection,
  integration: integrationCollection,
  [integrationFolder]: integrationCollection,

  pages: pagesCollection,

  sections: defineCollection({
    loader: contentLoader("./src/content/sections"),
  }),
  contact: defineCollection({
    loader: contentLoader("./src/content/contact"),
  }),
  faq: defineCollection({
    loader: contentLoader("./src/content/faq"),
  }),
  pricing: defineCollection({
    loader: contentLoader("./src/content/pricing"),
  }),
  homepage: defineCollection({
    loader: contentLoader("./src/content/homepage"),
  }),
  author: defineCollection({
    loader: contentLoader("./src/content/author"),
  }),
  changelog: defineCollection({
    loader: contentLoader("./src/content/changelog"),
  }),
};
