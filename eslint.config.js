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

const prettierConfig = defineConfig([
  { name: 'prettier/plugin/config', plugins: { prettier: prettierPlugin } },
  {
    name: 'prettier/config',
    rules: { ...prettierConfigRules, 'prettier/prettier': 'error' },
  },
]);

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  ...jsConfig,
  ...nodeConfig,
  ...typescriptConfig,
  unicorn.configs.all,
  perfectionist.configs['recommended-natural'],
  { name: 'local/import-order', rules: { 'import-x/order': 'off' } },
  {
    name: 'local/function-style',
    rules: {
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    },
  },
  { name: 'local/hashbang', rules: { 'n/hashbang': 'off' } },
  {
    ignores: ['src/**'],
    name: 'local/no-extraneous-deps',
    rules: { 'import-x/no-extraneous-dependencies': 'off' },
  },
  {
    name: 'local/explicit-module-boundary-types',
    rules: { '@typescript-eslint/explicit-module-boundary-types': 'off' },
  },
  {
    name: 'local/export-style',
    rules: { 'import-x/prefer-default-export': 'off' },
  },
  {
    files: ['src/**'],
    name: 'local/no-default-export',
    rules: { 'import-x/no-default-export': 'error' },
  },
  ...prettierConfig,
]);
