import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig( [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "object-curly-spacing": [ "error", "always" ],
      "array-bracket-spacing": [ "error", "always" ],
      "computed-property-spacing": [ "error", "always" ],
      "template-curly-spacing": [ "error", "always" ],
      "space-in-parens": [ "error", "always" ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores( [
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ] ),
] )

export default eslintConfig
