import { plainify, removeWhitespace } from "./textConverter";

type TitleProps = {
  title?: string;
  metaTitle?: string;
  disableTagline?: boolean;
};

type TitleConfig = {
  site: { title: string; tagline?: string; taglineSeparator?: string };
};

/**
 * The page's own title with no brand or tagline attached. Used for schema.org
 * `headline`, which is meant to be the article headline on its own.
 */
export function resolveBaseTitle(
  props: TitleProps,
  config: TitleConfig,
): string {
  return removeWhitespace(
    plainify(props.metaTitle || props.title || config.site.title),
  );
}

/**
 * Single source of truth for the page title used by <title>, Open Graph, and
 * JSON-LD.
 *
 * All three consumers used to compose this string themselves and had drifted:
 * JsonLD ignored `disableTagline`, discarded `metaTitle` entirely, and fell back
 * to a " - " separator — so every non-blog page reported the *same* name
 * ("SendEmAll - Find verified buyers…") to search engines while <title> said
 * something else. Keeping the rule in one place is the actual fix.
 *
 * Rules:
 *  - `disableTagline` means the page already wrote its own suffix — append nothing.
 *  - A page with its own title gets the brand appended ("Page title | SendEmAll").
 *    The tagline is 49 characters; on a 70-character blog title it pushes the
 *    brand past Google's ~60-character display window, so the brand never renders.
 *  - Only the bare site title (the homepage fallback) carries the full tagline.
 */
export function buildPageTitle(props: TitleProps, config: TitleConfig): string {
  const { metaTitle, title, disableTagline } = props;
  const base = plainify(metaTitle || title || config.site.title);
  const separator = config.site.taglineSeparator || " - ";

  if (disableTagline) return removeWhitespace(base);

  // Homepage / bare site title: the tagline is the whole point of the title.
  if (base === config.site.title) {
    return removeWhitespace(
      config.site.tagline ? base + separator + config.site.tagline : base,
    );
  }

  return removeWhitespace(base + separator + config.site.title);
}
