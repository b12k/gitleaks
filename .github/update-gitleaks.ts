import { writeFile } from 'node:fs/promises';
import { rsort } from 'semver';

const GITLEAKS_LATEST_RELEASE_URL = 'https://api.github.com/repos/gitleaks/gitleaks/releases/latest';
const PACKAGE_JSON_URL = new URL('../package.json', import.meta.url);

const { default: packageJson } = await import(PACKAGE_JSON_URL.href, { with: { type: 'json' } });
const response = await fetch(GITLEAKS_LATEST_RELEASE_URL);
const { tag_name: latestGitleaksTag } = (await response.json()) as { tag_name: string };

const { version } = packageJson;
const latestGitleaksVersion = latestGitleaksTag.replace('v', '');
const [libraryGitleaksVersion = ''] = version.split('-');
const [updateToVersion = ''] = rsort([latestGitleaksVersion, libraryGitleaksVersion]);

if (latestGitleaksTag.includes('-') || updateToVersion === libraryGitleaksVersion) {
  // eslint-disable-next-line n/no-process-exit
  process.exit(0);
}

await writeFile(
  PACKAGE_JSON_URL,
  `${JSON.stringify({ ...packageJson, version: `${updateToVersion}-v.0` }, undefined, 2)}\n`,
  'utf8',
);
