import js from '@eslint/js';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import path from 'node:path';

const currentDirectory = import.meta.dirname;
const gitignorePath = path.join(currentDirectory, '.gitignore');

const noRestrictedPropertiesRules = [
  'error',
  {
    message: 'Do not use Object.prototype.__defineGetter__; use Object.defineProperty to define an accessor.',
    property: '__defineGetter__',
  },
  {
    message: 'Do not use Object.prototype.__defineSetter__; use Object.defineProperty to define an accessor.',
    property: '__defineSetter__',
  },
];

const noRestrictedSyntaxRules = [
  'error',
  {
    message:
      '`for...in` is not allowed because it also iterates inherited properties; use Object.keys, Object.values, or Object.entries instead.',
    selector: 'ForInStatement',
  },
  {
    message: '`with` is disallowed because it makes code impossible to predict and optimize.',
    selector: 'WithStatement',
  },
];

const jsConfig = defineConfig([
  { name: 'js/config', ...js.configs.all },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  rules.base.importsStrict,
]);

const nodeConfig = defineConfig([plugins.node, ...configs.node.recommended]);

const typescriptConfig = defineConfig([
  plugins.typescriptEslint,
  ...configs.base.typescript,
  rules.typescript.typescriptEslintStrict,
]);

const localConfig = defineConfig([
  { languageOptions: { parserOptions: { tsconfigRootDir: currentDirectory } }, name: 'local/typescript-root' },
  {
    name: 'local/rules',
    // Resolves overlaps between presets and applies project policy, preferring the stricter or automatically fixable rule.
    rules: {
      // Allow inferred return types on exported functions; explicit annotations are only required when they aid clarity.
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // The equivalent Unicorn rule covers more cases and can fix them automatically, so it is used instead.
      '@typescript-eslint/prefer-find': 'off',
      // for...of is allowed; loop modernization is handled by the equivalent Unicorn rule to avoid duplicate reports.
      '@typescript-eslint/prefer-for-of': 'off',
      // The equivalent Unicorn rule is used instead to keep a single source for this check.
      '@typescript-eslint/prefer-includes': 'off',
      // The equivalent Unicorn rule is used instead of the TypeScript version for this check.
      '@typescript-eslint/prefer-regexp-exec': 'off',
      // The equivalent Unicorn rule is used instead to keep a single source for this check.
      '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      // Naming of function expressions is already enforced by the function style rule below.
      'func-names': 'off',
      // Require the declaration form for named functions, while still allowing arrow functions.
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      // for...in is already fully disallowed by the restricted syntax rule, so a guard requirement adds nothing.
      'guard-for-in': 'off',
      // Default export style is handled by Unicorn, except in source files where it is fully disallowed.
      'import-x/no-anonymous-default-export': 'off',
      // Named default import and export style is handled by the equivalent Unicorn rule.
      'import-x/no-named-default': 'off',
      // Import sorting is handled by Perfectionist; this rule is disabled so two rules do not reorder imports.
      'import-x/order': 'off',
      // Default exports are fully disallowed in source files and otherwise handled by Unicorn.
      'import-x/prefer-default-export': 'off',
      // This rule reports false positives for this project's TypeScript entry files.
      'n/hashbang': 'off',
      // Browser dialog functions do not apply to this Node.js package.
      'no-alert': 'off',
      // The equivalent Unicorn rule is used instead to avoid duplicate reports for the same code.
      'no-lonely-if': 'off',
      // Unicorn replaces this core rule with its own, but Prettier disables the Unicorn version, so the core rule is re-enabled to keep the check.
      'no-nested-ternary': 'error',
      // Default export restrictions are handled by the import and Unicorn rules instead.
      'no-restricted-exports': 'off',
      // Disabled to avoid duplicate reports with the equivalent Unicorn rules for numbers and globals.
      'no-restricted-globals': 'off',
      // Keeps only the restrictions that do not overlap with other active rules.
      'no-restricted-properties': noRestrictedPropertiesRules,
      // Disallows for...in loops and the with statement.
      'no-restricted-syntax': noRestrictedSyntaxRules,
      // The equivalent Unicorn rule covers more cases and can fix them automatically, so it is used instead.
      'no-undef-init': 'off',
      // Spread syntax suggestions are handled by the equivalent Unicorn rule.
      'prefer-spread': 'off',
      // Predicate helpers named with check* are accepted alongside Unicorn's default boolean prefixes.
      'unicorn/consistent-boolean-name': ['error', { prefixes: { check: true } }],
      // Array forEach is an accepted style in this project, so this rule is not enforced.
      'unicorn/no-array-for-each': 'off',
      // Array reduce is allowed when it expresses the logic most clearly.
      'unicorn/no-array-reduce': 'off',
      // The Node plugin rule is used for the process.exit check instead.
      'unicorn/no-process-exit': 'off',
      // The Node plugin rule is used for the node: import protocol check instead.
      'unicorn/prefer-node-protocol': 'off',
      // An early return is preferred over rewriting these branches into a ternary.
      'unicorn/prefer-ternary': 'off',
    },
  },
  {
    ignores: ['src/**'],
    name: 'local/no-extraneous-deps',
    rules: {
      // Tooling and GitHub scripts are allowed to import development dependencies.
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['src/**'],
    name: 'local/src-default-export-policy',
    rules: {
      // Library source files must use named exports only.
      'import-x/no-default-export': 'error',
      // Not needed because source files already disallow all default exports.
      'unicorn/no-anonymous-default-export': 'off',
      // Not needed because source files already disallow all default exports.
      'unicorn/no-named-default': 'off',
    },
  },
]);

const prettierConfig = defineConfig([{ name: 'prettier/config', rules: prettierConfigRules }]);

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  ...jsConfig,
  ...nodeConfig,
  ...typescriptConfig,
  unicorn.configs.all,
  perfectionist.configs['recommended-natural'],
  ...localConfig,
  ...prettierConfig,
]);
