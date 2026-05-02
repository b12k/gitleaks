# The missing npm wrapper for [Gitleaks](https://github.com/gitleaks/gitleaks)

[Gitleaks](https://github.com/gitleaks/gitleaks) - is a fast, lightweight secret scanner for git repositories.

This library is just a thin wrapper which automatically downloads the correct gitleaks binary for your platform on install and exposes it as a CLI command.

## Installation

Typically installed as a dev dependency:

**Local (project)**

```bash
npm install --save-dev @b12k/gitleaks
```

```bash
pnpm add -D @b12k/gitleaks
```

```bash
yarn add --dev @b12k/gitleaks
```

**Global**

```bash
npm install -g @b12k/gitleaks
```

```bash
pnpm add -g @b12k/gitleaks
```

```bash
yarn global add @b12k/gitleaks
```

The postinstall script downloads the gitleaks binary for your platform from the official GitHub release.

## Usage

See the [gitleaks documentation](https://github.com/gitleaks/gitleaks) for the full list of commands and flags.

**Local install**

```bash
npx gitleaks <command>
```

```bash
pnpm exec gitleaks <command>
```

```bash
yarn gitleaks <command>
```

**Global install**

```bash
gitleaks <command>
```

**`package.json` script**

```json
{ "scripts": { "secrets": "gitleaks <command>" } }
```

## Troubleshooting

If the binary fails to install, re-run with `--foreground-scripts` to see the postinstall output:

```bash
npm install --save-dev @b12k/gitleaks --foreground-scripts
```

```bash
pnpm add -D @b12k/gitleaks --foreground-scripts
```

```bash
yarn add --dev @b12k/gitleaks --foreground-scripts
```

## Supported platforms

- Linux — x64, arm64
- macOS — x64, arm64
- Windows — x64, arm64

## Version

The npm package version mirrors the gitleaks release version.
