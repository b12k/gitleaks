import type { Options } from 'boxen';

import boxen from 'boxen';

import { ERRORS } from './errors';

export function log(message: string, options: Options) {
  // eslint-disable-next-line no-console
  console.log(boxen(message, options));
}

const errorPrefix = '[gitleaks]';
export function logError(errorName: keyof typeof ERRORS, metaInfo?: string) {
  const error = ERRORS[errorName];
  let logMessage = error.message;
  if (error.instruction) {
    logMessage += `\n\n${error.instruction}`;
  }
  if (metaInfo) {
    logMessage += `\n\n${metaInfo}`;
  }
  log(logMessage, { borderColor: 'red', title: errorPrefix });

  throw new Error(`${errorPrefix} ${error.message}`);
}
