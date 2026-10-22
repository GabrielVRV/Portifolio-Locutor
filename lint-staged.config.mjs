/** @type {import("lint-staged").Configuration} */
const config = {
  "*.{ts,tsx,js,mjs,mts}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css,yaml,yml}": ["prettier --write"],
};

export default config;
