import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import updateNotifier from 'update-notifier';

import { binaryPath, libraryName, packageJson } from './config';
import { logError } from './log';

updateNotifier({
  pkg: packageJson,
  shouldNotifyInNpmScript: true,
  updateCheckInterval: 1,
}).notify({ defer: false });

await access(binaryPath).catch(() => logError('binaryNotFound'));

const childProcess = spawn(binaryPath, process.argv.slice(2), {
  stdio: 'inherit',
  windowsHide: false,
});

childProcess.on('error', (error) => {
  throw error;
});

childProcess.on('exit', (code, signal) => {
  if (signal) return process.kill(process.pid, signal);
  const message = code ? `Error ${code}` : 'Unknown error';
  throw new Error(`[${libraryName}] ${message}`);
});
