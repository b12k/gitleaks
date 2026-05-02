import extractZip from 'extract-zip';
import { extract as extractTar } from 'tar';

export async function extractArchive(
  archivePath: string,
  targetDirectoryPath: string,
) {
  if (archivePath.endsWith('.zip')) {
    await extractZip(archivePath, { dir: targetDirectoryPath });
  }
  if (archivePath.endsWith('.tar.gz')) {
    await extractTar({ cwd: targetDirectoryPath, file: archivePath });
  }
}
