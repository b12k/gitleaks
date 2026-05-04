type ErrorByKey = Record<string, { instruction: string; message: string }>;
export const ERRORS = {
  binaryNotFound: {
    instruction: 'Try re-installing the library.',
    message: 'Binary not found.',
  },
  installationFailed: {
    instruction: '',
    message: 'Failed to install the binary.',
  },
  unsupportedArchitecture: {
    instruction: 'Supported architectures are x64 and arm64.',
    message: 'Unsupported architecture.',
  },
  unsupportedArchiveFormat: {
    instruction: 'Supported archive formats are .zip and .tar.gz.',
    message: 'Unsupported archive format.',
  },
  unsupportedPlatform: {
    instruction: 'Supported platforms are darwin, windows and linux.',
    message: 'Unsupported platform.',
  },
} as const satisfies ErrorByKey;
