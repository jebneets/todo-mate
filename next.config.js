/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
if (!process.env.SKIP_ENV_VALIDATION) {
  require("./src/env.js");
}

/** @type {import("next").NextConfig} */
const config = {};

module.exports = config;
