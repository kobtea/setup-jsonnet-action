# Setup Jsonnet

This GitHub Action installs jsonnet binaries. Installed binaries are:

- jsonnet
- jsonnetfmt
- jb

Source files are:

- https://github.com/google/go-jsonnet/releases
- https://github.com/jsonnet-bundler/jsonnet-bundler/releases

Refer to each repository to check licenses of binaries to install.

## Usage

### Example workflow

```yaml
name: Jsonnet
on:
  pull_request:
  push:

jobs:
  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: kobtea/setup-jsonnet-action@v3
      - run: |
          jb install
          find . -type f | xargs -IFILE bash -c "jsonnetfmt FILE | diff -u FILE -"
```

## Develop this action

Install the dependencies

```bash
$ npm install
```

Format, test, and build the action

```bash
$ npm run all
```

Package for distribution

```bash
$ npm run bundle
```

## Publish a new release

Commit the rebuilt `dist/` directory and push a new tag:

```bash
$ git add dist
$ git commit -m "chore: rebuild dist for vX"
$ git tag vX
$ git push origin vX
```

See the
[versioning documentation](https://github.com/actions/toolkit/blob/main/docs/action-versioning.md)
