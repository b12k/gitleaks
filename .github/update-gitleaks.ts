import { writeFile } from 'node:fs/promises';
import { rsort } from 'semver';

import packageJson from '../package.json' with { type: 'json' };

const GITLEAKS_LATEST_RELEASE_URL = 'https://api.github.com/repos/gitleaks/gitleaks/releases/latest';
const PACKAGE_JSON_URL = new URL('../package.json', import.meta.url);

const response: Omit<Response, 'json'> & { json: () => Promise<{ tag_name: string }> } =
  await fetch(GITLEAKS_LATEST_RELEASE_URL);
const { tag_name: latestGitleaksTag } = await response.json();

const { version } = packageJson;
const latestGitleaksVersion = latestGitleaksTag.replace('v', '');
const [libraryGitleaksVersion = ''] = version.split('-', 1);
const [updateToVersion = ''] = rsort([latestGitleaksVersion, libraryGitleaksVersion]);

if (updateToVersion === libraryGitleaksVersion || latestGitleaksTag.includes('-')) {
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(0);
}

await writeFile(
  PACKAGE_JSON_URL,
  `${JSON.stringify({ ...packageJson, version: `${updateToVersion}-v.0` }, undefined, 2)}\n`,
  'utf8',
);
