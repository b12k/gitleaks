import path from 'node:path';

import packageJson from '../package.json' with { type: 'json' };

const platform = process.platform === 'win32' ? 'windows' : process.platform;
const isWindows = platform === 'windows';
const { arch: architecture } = process;
const { name, version } = packageJson;
const [libraryVersion = ''] = version.split('-');

const currentDirectory = import.meta.dirname;

const libraryName = 'gitleaks';

const binaryExtension = isWindows ? '.exe' : '';
const binaryFileName = `${libraryName}${binaryExtension}`;
const binaryPath = path.join(currentDirectory, binaryFileName);

const archiveExtension = isWindows ? '.zip' : '.tar.gz';
const archiveFileName = `${libraryName}_${libraryVersion}_${platform}_${architecture}${archiveExtension}`;

const releasesGithubUrl =
  'https://api.github.com/repos/gitleaks/gitleaks/releases';
const latestReleaseUrl = `${releasesGithubUrl}/latest`;
const archiveGithubUrl = `${releasesGithubUrl}/download/v${libraryVersion}/${archiveFileName}`;
const archivePath = path.join(currentDirectory, archiveFileName);

export const supportedPlatforms = ['darwin', 'windows', 'linux'];
export const supportedArchitectures = ['x64', 'arm64'];

export {
  architecture,
  archiveGithubUrl,
  archivePath,
  binaryPath,
  currentDirectory,
  latestReleaseUrl,
  libraryName,
  libraryVersion,
  name,
  platform,
  version,
};
