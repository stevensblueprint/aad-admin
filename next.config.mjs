/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import nextRoutes from "nextjs-routes/config";
const withRoutes = nextRoutes();

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
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
  },
};

export default withRoutes(config);
