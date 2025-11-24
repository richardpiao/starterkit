/** @type {import('lint-staged').Config} */
const config = {
  // TypeScript and JavaScript files
  "*.{ts,tsx,js,jsx,mjs,cjs}": [
    "eslint --fix --max-warnings 0",
    "prettier --write",
  ],

  // JSON files
  "*.json": ["prettier --write"],

  // Markdown files
  "*.md": ["prettier --write"],

  // CSS files
  "*.{css,scss}": ["prettier --write"],

  // Type check the entire project when TypeScript files change
  "*.{ts,tsx}": () => "tsc --noEmit",
};

export default config;
