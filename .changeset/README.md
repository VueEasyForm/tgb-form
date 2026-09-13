# Change intents

This folder holds pnpm-native release intents (changesets format).

- Record one with `pnpm change` (or `pnpm change --bump patch --summary "..." <pkg>`)
- Preview the release plan with `pnpm change status`
- Apply it with `pnpm release:version` (`pnpm version -r`)

Release behavior is configured under the `versioning` key in `pnpm-workspace.yaml`.
See https://pnpm.io/versioning for the full documentation.
