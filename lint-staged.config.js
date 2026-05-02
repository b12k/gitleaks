const SCRIPTS = '*.[mc]?[jt]sx?';
const PACKAGE_JSON = 'package.json';
const OTHER = `!(${[SCRIPTS, PACKAGE_JSON].join('|')})`;

const tsc = () => 'pnpm check:types';
const eslint = 'pnpm eslint --fix';
const prettier = 'pnpm prettier -w --ignore-unknown';
const sortPackageJson = 'pnpm sort-package-json';

export default {
  [`${SCRIPTS}|SCRIPTS`]: eslint,
  [`${SCRIPTS}|TYPES`]: tsc,
  [OTHER]: prettier,
  [PACKAGE_JSON]: [sortPackageJson, prettier],
};
