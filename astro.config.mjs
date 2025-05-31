import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "./src/locales";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
// https://astro.build/config
export default defineConfig({
  site: "https://woilasoft.com", // Set your site's URL
  i18n: {
    defaultLocale: DEFAULT_LOCALE_SETTING,
    locales: Object.keys(LOCALES_SETTING),
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [tailwind({
    nesting: true,
    //applyBaseStyles:false
  }), mdx(), sitemap({
    i18n: {
      defaultLocale: DEFAULT_LOCALE_SETTING,
      locales: Object.fromEntries(
        Object.entries(LOCALES_SETTING).map(([key, value]) => [
          key,
          value.lang ?? key,
        ])
      ),
    },
  }), react(), icon()],
});