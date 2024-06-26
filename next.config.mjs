/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import bundleAnalyzer from "@next/bundle-analyzer";
import nextRoutes from "nextjs-routes/config";
const withRoutes = nextRoutes();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
  modularizeImports: {
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
  reactStrictMode: false,
  output: "standalone",

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental: {
    instrumentationHook: true,
    optimizePackageImports: [
      "ajv",
      "@jsonforms/core",
      "@jsonforms/material-renderers",
      "@jsonforms/react",
      "lodash",
    ],
  },
};

export default withRoutes(withBundleAnalyzer(config));
