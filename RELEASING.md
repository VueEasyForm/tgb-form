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

- npm trusted publishing: https://docs.npmjs.com/trusted-publishers/
- npm provenance: https://docs.npmjs.com/generating-provenance-statements/
- GitHub OIDC: https://docs.github.com/en/actions/concepts/security/openid-connect
- Changesets action behavior: https://github.com/changesets/action

## Normal release flow

1. Add a changeset in the pull request that changes package behavior.
2. Merge to `main`.
3. The `Release` workflow will either:
   - open or update a version PR when there are unreleased changesets, or
   - publish the already-versioned packages when the version PR has been merged.

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
- The repository-level `release` script builds only releasable packages before `changeset publish`.
