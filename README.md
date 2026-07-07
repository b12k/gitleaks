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
pnpm add -D --allow-build=@b12k/gitleaks @b12k/gitleaks
```

pnpm 11 requires the `--allow-build` flag so this package's postinstall script can download the gitleaks binary.

```bash
yarn add --dev @b12k/gitleaks
```

**Global**

```bash
npm install -g @b12k/gitleaks
```

```bash
pnpm add -g --allow-build=@b12k/gitleaks @b12k/gitleaks
```

pnpm 11 requires the `--allow-build` flag during global install as well.

```bash
yarn global add @b12k/gitleaks
```

The postinstall script downloads the gitleaks binary for your platform from the official GitHub release.

If you already installed with pnpm 11 and the build was blocked, approve and rebuild it:

```bash
pnpm approve-builds @b12k/gitleaks
pnpm rebuild @b12k/gitleaks
```

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
pnpm add -D --allow-build=@b12k/gitleaks @b12k/gitleaks --foreground-scripts
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

To install a different gitleaks release, define it in `.gitleaks-version` as `v1.2.3` or `1.2.3` before installing the package.
