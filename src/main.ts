import * as core from '@actions/core'
import * as fs from 'fs'
import * as os from 'os'
import * as tc from '@actions/tool-cache'

type Tool = {
  name: string
  version: string
  fileType: string
  amd64Url: string
  arm64Url: string
}

const tools: Tool[] = [
  {
    name: 'jsonnet',
    version: '0.17.0',
    fileType: 'tar.gz',
    amd64Url:
      'https://github.com/google/go-jsonnet/releases/download/v0.17.0/go-jsonnet_0.17.0_Linux_x86_64.tar.gz',
    arm64Url:
      'https://github.com/google/go-jsonnet/releases/download/v0.17.0/go-jsonnet_0.17.0_Linux_arm64.tar.gz'
  },
  {
    name: 'jb',
    version: '0.4.0',
    fileType: 'binary',
    amd64Url:
      'https://github.com/jsonnet-bundler/jsonnet-bundler/releases/download/v0.4.0/jb-linux-amd64',
    arm64Url:
      'https://github.com/jsonnet-bundler/jsonnet-bundler/releases/download/v0.4.0/jb-linux-arm64'
  }
]

async function run(): Promise<void> {
  try {
    const urlKey = os.arch().startsWith('arm') ? 'arm64Url' : 'amd64Url'
    for (const tool of tools) {
      const downloadPath = await tc.downloadTool(tool[urlKey])
      let cachePath = tc.find(tool.name, tool.version)
      if (cachePath === '') {
        switch (tool.fileType) {
          case 'tar.gz': {
            cachePath = await tc.cacheDir(
              await tc.extractTar(downloadPath),
              tool.name,
              tool.version
            )
            break
          }
          case 'binary': {
            fs.chmodSync(downloadPath, 0o755)
            cachePath = await tc.cacheFile(
              downloadPath,
              tool.name,
              tool.name,
              tool.version
            )
            break
          }
        }
      }
      core.addPath(cachePath)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
