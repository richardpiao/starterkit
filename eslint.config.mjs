// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import promisePlugin from "eslint-plugin-promise";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
  // Base ESLint recommended
  eslint.configs.recommended,

  // TypeScript strict configs
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Global ignores
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.git/**",
      "**/public/**",
      "*.config.mjs",
      "*.config.js",
      "*.config.cjs",
      ".lintstagedrc.mjs",
      ".prettierrc.mjs",
      "next-env.d.ts",
    ],
  },

  // Main configuration for TypeScript/React files
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
      promise: promisePlugin,
      sonarjs: sonarjsPlugin,
      "@next/next": nextPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // ==========================================
      // TypeScript Strict Rules
      // ==========================================
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "off", // Using unused-imports instead
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: true,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowAny: false,
        },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
        {
          selector: "enum",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/return-await": ["error", "always"],
      "@typescript-eslint/promise-function-async": "error",

      // ==========================================
      // React Rules
      // ==========================================
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-no-constructed-context-values": "error",
      "react/hook-use-state": "error",
      "react/no-array-index-key": "warn",
      "react/no-unstable-nested-components": "error",

      // ==========================================
      // React Hooks Rules
      // ==========================================
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      // ==========================================
      // Next.js Rules
      // ==========================================
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "@next/next/no-sync-scripts": "error",

      // ==========================================
      // Accessibility Rules
      // ==========================================
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "error",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/tabindex-no-positive": "error",

      // ==========================================
      // Import Rules
      // ==========================================
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
        },
      ],
      "import/no-duplicates": "error",
      "import/no-cycle": "error",
      "import/no-self-import": "error",
      "import/no-useless-path-segments": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-mutable-exports": "error",

      // ==========================================
      // Unused Imports
      // ==========================================
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // ==========================================
      // Promise Rules
      // ==========================================
      "promise/always-return": "error",
      "promise/no-return-wrap": "error",
      "promise/param-names": "error",
      "promise/catch-or-return": "error",
      "promise/no-nesting": "warn",
      "promise/no-promise-in-callback": "warn",
      "promise/no-callback-in-promise": "warn",
      "promise/no-return-in-finally": "error",

      // ==========================================
      // SonarJS (Code Quality)
      // ==========================================
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-duplicate-string": ["error", { threshold: 3 }],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/prefer-immediate-return": "error",
      "sonarjs/no-redundant-jump": "error",

      // ==========================================
      // General Best Practices
      // ==========================================
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "prefer-spread": "error",
      "prefer-rest-params": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-param-reassign": ["error", { props: true }],
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "default-case": "error",
      "default-case-last": "error",
      "no-else-return": ["error", { allowElseIf: false }],
      "no-lonely-if": "error",
      "no-multi-assign": "error",
      "no-useless-return": "error",
      "object-shorthand": "error",
      "one-var": ["error", "never"],
      "operator-assignment": ["error", "always"],
      "prefer-destructuring": [
        "error",
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      "prefer-object-spread": "error",
      "spaced-comment": ["error", "always"],
      yoda: "error",
      "max-depth": ["error", 4],
      "max-lines-per-function": [
        "warn",
        { max: 100, skipBlankLines: true, skipComments: true },
      ],
      "max-params": ["error", 4],
      complexity: ["error", 10],
    },
  },

  // Config files can be more relaxed
  {
    files: ["*.config.{js,mjs,ts}", "*.config.*.{js,mjs,ts}"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "import/no-default-export": "off",
    },
  },

  // Allow default exports in Next.js pages and layouts
  {
    files: [
      "**/app/**/page.tsx",
      "**/app/**/layout.tsx",
      "**/app/**/loading.tsx",
      "**/app/**/error.tsx",
      "**/app/**/not-found.tsx",
      "**/app/**/route.ts",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  }
);
