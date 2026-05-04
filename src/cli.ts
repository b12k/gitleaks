#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import updateNotifier from 'update-notifier';

import { binaryPath, name, version } from './config';
import { logError } from './log';

updateNotifier({
  pkg: { name, version },
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

childProcess.on('exit', (code, signal): void => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exitCode = code ?? 1;
});
