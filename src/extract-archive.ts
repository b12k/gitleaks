import extractZip from 'extract-zip';
import { extract as extractTar } from 'tar';

import { logError } from './log';

export async function extractArchive(archivePath: string, targetDirectoryPath: string) {
  if (archivePath.endsWith('.zip')) {
    await extractZip(archivePath, { dir: targetDirectoryPath });
    return;
  }
  if (archivePath.endsWith('.tar.gz')) {
    await extractTar({ cwd: targetDirectoryPath, file: archivePath });
    return;
  }
  logError('unsupportedArchiveFormat', archivePath);
}
