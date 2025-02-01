import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";
import reactPlugin from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended",
  ),
  {
    plugins: {
      "@stylistic": stylistic,
      react: reactPlugin,
    },
  },
  {
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never", propElementValues: "always" },
      ],
      "@stylistic/jsx-self-closing-comp": [
        "error",
        { component: true, html: true },
      ],
      "react/jsx-tag-spacing": [
        "error",
        {
          closingSlash: "never",
          beforeSelfClosing: "always",
          afterOpening: "never",
        },
      ],
    },
  },
];

export default eslintConfig;
