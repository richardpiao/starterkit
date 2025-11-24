/** @type {import("prettier").Config} */
const config = {
  // General
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",

  // JSX
  jsxSingleQuote: false,

  // Plugins
  plugins: ["prettier-plugin-tailwindcss"],

  // Overrides for specific file types
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
    {
      files: "*.md",
      options: {
        proseWrap: "always",
      },
    },
  ],
};

export default config;
