# Releasing TGB Form

This repository publishes `@tgb-form/core`, `@tgb-form/react`, and `@tgb-form/vue` to npm from GitHub Actions.

## One-time setup

1. Create the npm packages if they do not already exist:
   - `@tgb-form/core`
   - `@tgb-form/react`
   - `@tgb-form/vue`
2. Enable 2FA on every npm maintainer account.
3. Configure npm trusted publishing for each package and point it at this repository's `Release` workflow on `main`.
4. Protect `main`:
   - require pull requests
   - require the `CI / Packages` job
   - require the `CI / Docs` job
   - restrict who can push directly
5. Enable GitHub secret scanning and Dependabot alerts for the repository.

Trusted publishing setup is documented by npm and avoids storing a long-lived `NPM_TOKEN` in GitHub Actions.

Useful references:

- pnpm release management: https://pnpm.io/versioning
- pnpm change command: https://pnpm.io/cli/change
- npm trusted publishing: https://docs.npmjs.com/trusted-publishers/
- npm provenance: https://docs.npmjs.com/generating-provenance-statements/
- GitHub OIDC: https://github.com/en/actions/concepts/security/openid-connect

## Normal release flow

Releases are managed natively by pnpm (`pnpm change` / `pnpm version -r` reading
`.changeset/*.md` intents, configured via the `versioning` key in
`pnpm-workspace.yaml`). No Changesets CLI is used.

1. Add a change intent in the pull request that changes package behavior
   (`pnpm change`).
2. Merge to `main`.
3. The `Release` workflow applies pending intents with `pnpm version -r`,
   commits the version bumps, and publishes with `pnpm release`
   (`pnpm publish -r`).

## Local verification

Run the package-only checks before merging release-sensitive changes:

```sh
pnpm release:check
pnpm --filter @tgb-form/core pack --dry-run
pnpm --filter @tgb-form/react pack --dry-run
pnpm --filter @tgb-form/vue pack --dry-run
```

## Notes

- Package publishing is intentionally scoped to `packages/*`. Docs failures should not block npm releases.
- Provenance is enabled in CI through npm trusted publishing and `NPM_CONFIG_PROVENANCE=true`.
- The repository-level `release` script builds only releasable packages before `pnpm publish -r`.
