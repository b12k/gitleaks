import type { ReadableStream } from 'node:stream/web';

import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

import {
  architecture,
  archiveGithubUrl,
  archivePath,
  binaryPath,
  currentDirectory,
  libraryName,
  platform,
  supportedArchitectures,
  supportedPlatforms,
} from './config';
import { extractArchive } from './extract-archive';
import { log, logError } from './log';

if (!supportedPlatforms.includes(platform)) {
  logError('unsupportedPlatform');
}
if (!supportedArchitectures.includes(architecture)) {
  logError('unsupportedArchitecture');
}

try {
  log(archiveGithubUrl, {
    borderColor: 'green',
    title: `${libraryName}:download`,
  });
  const response = await fetch(archiveGithubUrl);
  if (!response.ok) throw new Error(String(response.status));

  log(archivePath, { borderColor: 'green', title: `${libraryName}:save` });
  await pipeline(
    Readable.fromWeb(response.body as unknown as ReadableStream),
    createWriteStream(archivePath),
  );

  log(currentDirectory, {
    borderColor: 'green',
    title: `${libraryName}:extract`,
  });
  await extractArchive(archivePath, currentDirectory);

  log(binaryPath, { borderColor: 'green', title: `${libraryName}:installed` });
} catch (error: unknown) {
  let message = 'Unknown error.';
  if (error instanceof Error) {
    message = error.message;
  }
  logError('instalationFailed', message);
}
