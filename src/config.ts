import path from 'node:path';

import packageJson from '../package.json' with { type: 'json' };

const platform = process.platform === 'win32' ? 'windows' : process.platform;
const isWindows = platform === 'windows';
const { arch: architecture } = process;
const { name, version } = packageJson;

const currentDirectory = import.meta.dirname;

const libraryName = 'gitleaks';

const binaryExtension = isWindows ? '.exe' : '';
const binaryFileName = `${libraryName}${binaryExtension}`;
const binaryPath = path.join(currentDirectory, binaryFileName);

const archiveExtension = isWindows ? '.zip' : '.tar.gz';
const archiveFileName = `${libraryName}_${version}_${platform}_${architecture}${archiveExtension}`;
const archiveGithubUrl = `https://github.com/gitleaks/gitleaks/releases/download/v${version}/${archiveFileName}`;
const archivePath = path.join(currentDirectory, archiveFileName);

export const supportedPlatforms = ['darwin', 'windows', 'linux'];
export const supportedArchitectures = ['x64', 'arm64'];

export {
  architecture,
  archiveGithubUrl,
  archivePath,
  binaryPath,
  currentDirectory,
  libraryName,
  name,
  platform,
  version,
};
