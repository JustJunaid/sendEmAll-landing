#!/bin/bash

# Astro reads the canonical/sitemap host from `site` in astro.config.mjs, which
# prefers $SITE_URL when set (see astro.config.mjs). We export it per-env here.
#
# NOTE: the old `npm run build -- --site "$url"` form was inert — the build
# script is a chain (`toml:watch && astro build && remove-draft-from-sitemap`),
# so the appended flag landed on the LAST command, never on `astro build`.
# Setting $SITE_URL is the reliable way to drive Astro's `site`.

if [[ $VERCEL_ENV == "production" ]]; then
  export SITE_URL="https://www.sendemall.com"
else
  export SITE_URL="https://staging.${VERCEL_PROJECT_PRODUCTION_URL}"
fi

npm run build
