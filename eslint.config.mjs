import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

/**
 * Builds a rule that forbids a layer from importing the given modules,
 * enforcing the Clean Architecture dependency rule (dependencies point inward).
 */
const forbidImports = (layer, groups) => ({
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: groups,
          message: `The ${layer} layer must not depend on this module (see docs/ARCHITECTURE.md).`,
        },
      ],
    },
  ],
});

const frameworks = ["react", "react-dom", "react/*", "next", "next/*"];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ["src/domain/**"],
    rules: forbidImports("domain", [
      "@/application/*",
      "@/infrastructure/*",
      "@/presentation/*",
      "@/main/*",
      "@/app/*",
      ...frameworks,
    ]),
  },
  {
    files: ["src/application/**"],
    rules: forbidImports("application", [
      "@/infrastructure/*",
      "@/presentation/*",
      "@/main/*",
      "@/app/*",
      ...frameworks,
    ]),
  },
  {
    files: ["src/infrastructure/**"],
    rules: forbidImports("infrastructure", ["@/presentation/*", "@/main/*", "@/app/*"]),
  },
  {
    files: ["src/presentation/**"],
    rules: forbidImports("presentation", ["@/infrastructure/*", "@/main/*"]),
  },
  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts"]),
]);

export default eslintConfig;
