type ErrorByKey = Record<string, { instruction: string; message: string }>;
export const ERRORS = {
  binaryNotFound: {
    instruction: 'Try re-installing the library.',
    message: 'Binary not found.',
  },
  instalationFailed: {
    instruction: '',
    message: 'Failed to install the binary.',
  },
  unknownArmVersion: {
    instruction:
      'The ARM version could not be determined from the process configuration.',
    message: 'Unknown ARM version.',
  },
  unsupportedArchitecture: {
    instruction: 'Supported architetures are x64, arm64 and ia32.',
    message: 'Unsupported architecture.',
  },
  unsupportedPlatform: {
    instruction: 'Supported platforms are darwin, win32 and linux.',
    message: 'Unsupported platform.',
  },
} as const satisfies ErrorByKey;
