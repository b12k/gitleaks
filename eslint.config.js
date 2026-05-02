import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import path from 'node:path';

const gitignorePath = path.resolve('.', '.gitignore');

const jsConfig = defineConfig([
  // ESLint recommended config
  { name: 'js/config', ...js.configs.all },
  // Stylistic plugin
  plugins.stylistic,
  // Import X plugin
  plugins.importX,
  // Airbnb base recommended config
  ...configs.base.recommended,
  // Strict import rules
  rules.base.importsStrict,
]);

const nodeConfig = defineConfig([
  // Node plugin
  plugins.node,
  // Airbnb Node recommended config
  ...configs.node.recommended,
]);

const typescriptConfig = defineConfig([
  // TypeScript ESLint plugin
  plugins.typescriptEslint,
  // Airbnb base TypeScript config
  ...configs.base.typescript,
  // Strict TypeScript rules
  rules.typescript.typescriptEslintStrict,
]);

const prettierConfig = defineConfig([
  // Prettier plugin
  { name: 'prettier/plugin/config', plugins: { prettier: prettierPlugin } },
  // Prettier config
  {
    name: 'prettier/config',
    rules: { ...prettierConfigRules, 'prettier/prettier': 'error' },
  },
]);

export default defineConfig([
  // Ignore files and folders listed in .gitignore
  includeIgnoreFile(gitignorePath),
  // JavaScript config
  ...jsConfig,
  // Node config
  ...nodeConfig,
  // TypeScript config
  ...typescriptConfig,
  // Prettier config
  ...prettierConfig,
  // Unicorn — all rules (strictest)
  unicorn.configs.all,
  // Perfectionist — natural sort order
  perfectionist.configs['recommended-natural'],
  // Allow any TS file not explicitly in tsconfig to use a default project
  {
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ['*.js', 'scripts/*.js'] },
      },
    },
    name: 'local/ts-project-service',
  },
  // Disable import-x/order — perfectionist handles import sorting
  { name: 'local/import-order', rules: { 'import-x/order': 'off' } },
  // Restrict extraneous dependency checks to src only
  {
    ignores: ['src/**'],
    name: 'local/no-extraneous-deps',
    rules: { 'import-x/no-extraneous-dependencies': 'off' },
  },
  // Disable explicit return type requirement on exported functions
  {
    name: 'local/explicit-module-boundary-types',
    rules: { '@typescript-eslint/explicit-module-boundary-types': 'off' },
  },
  // Disable prefer-default-export globally, enforce named exports in src
  {
    name: 'local/export-style',
    rules: { 'import-x/prefer-default-export': 'off' },
  },
  {
    files: ['src/**'],
    name: 'local/no-default-export',
    rules: { 'import-x/no-default-export': 'error' },
  },
]);
