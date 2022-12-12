# MDHB Release Process

### Schedule

MDHB releases are automatically triggered at 0900 every Tuesday
as long as the `develop` branch is ahead of the `master` branch.
If a security update is applied to the `develop` branch, a 
release will be triggered immediately.

### Process

1. `VERSION.md` on the `develop` branch is the controlling version
   for the next release.  This file is updated by the release
   manager and is the only file that should be updated in the
   release process.
2. The release manager creates a new branch from `develop` named
   `release-<version>`.  This branch is used to create the release
   artifacts.
3. The release manager verifies that the version number in `VERSION.md` is
   applied to all the appropriate files in the release branch.
    - `package.json`
    - `package-lock.json`
    - `README.md`
    - `CHANGELOG.md`
4. The release manager updates the `CHANGELOG.md` file to reflect
   the changes in the release.
5. The release manager creates a pull request from the release branch
   to the `master` branch.
6. The release manager merges the pull request once all checks pass.
7. The release manager creates a new release on GitHub using the
   release branch as the source.
8. The release manager merges the release branch back into the
   `develop` branch.
9. The release manager updates the `develop` branch to reflect the
   new version number.
    - `VERSION.md`
    - `package.json`
    - `package-lock.json`
    - `README.md`
    - `CHANGELOG.md`

### Versioning

MDHB uses [Semantic Versioning](https://semver.org/) for versioning.

### Infrastructure

The release process is automated using GitHub Actions.  The
`release.yml` workflow is triggered by GitHub at 0900 UTC 
every Tuesday or when a Dependabot security update is applied.
The workflow is defined in the `.github/workflows` directory.
