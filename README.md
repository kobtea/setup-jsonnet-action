# Setup Jsonnet

This GitHub Action installs jsonnet binaries. 
Installed binaries are:

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
      - uses: actions/checkout@v2
      - uses: kobtea/setup-jsonnet-action@v1
      - run: |
          jb install
          find . -type f | xargs -IFILE bash -c "jsonnetfmt FILE | diff -u FILE -"
```

## Develop this action

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
