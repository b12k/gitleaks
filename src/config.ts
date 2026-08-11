import { readFile } from 'node:fs/promises';
import path from 'node:path';

import packageJson from '../package.json' with { type: 'json' };

const platform = process.platform === 'win32' ? 'windows' : process.platform;
const isWindows = platform === 'windows';
const { arch: architecture } = process;
const { name, version } = packageJson;
const [defaultVersion = ''] = version.split('-', 1);
const versionFileName = '.gitleaks-version';
const versionFilePath = path.join(process.env['INIT_CWD'] ?? process.cwd(), versionFileName);

let versionOverride: string;
try {
  const fileContents = await readFile(versionFilePath, 'utf8');
  versionOverride = fileContents.trim().replace(/^v/, '');
} catch (error: unknown) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
    const message = Error.isError(error) ? error.message : 'Unknown error.';
    throw new Error(`Failed to read ${versionFileName}: ${message}`, { cause: error });
  }

  versionOverride = '';
}

const libraryVersion = versionOverride || defaultVersion;

const currentDirectory = import.meta.dirname;

const libraryName = 'gitleaks';

const binaryExtension = isWindows ? '.exe' : '';
const binaryFileName = `${libraryName}${binaryExtension}`;
const binaryPath = path.join(currentDirectory, binaryFileName);

const archiveExtension = isWindows ? '.zip' : '.tar.gz';
const archiveFileName = `${libraryName}_${libraryVersion}_${platform}_${architecture}${archiveExtension}`;
const checksumsFileName = `${libraryName}_${libraryVersion}_checksums.txt`;
const gitLeaksGithubUrl = `https://github.com/gitleaks/gitleaks/releases/download/v${libraryVersion}`;
const archiveGithubUrl = `${gitLeaksGithubUrl}/${archiveFileName}`;
const checksumsGithubUrl = `${gitLeaksGithubUrl}/${checksumsFileName}`;
const archivePath = path.join(currentDirectory, archiveFileName);

export const supportedPlatforms = ['darwin', 'windows', 'linux'];
export const supportedArchitectures = ['x64', 'arm64'];

export {
  architecture,
  archiveFileName,
  archiveGithubUrl,
  archivePath,
  binaryPath,
  checksumsGithubUrl,
  currentDirectory,
  libraryName,
  libraryVersion,
  name,
  platform,
  version,
};
