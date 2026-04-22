import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const sourceDir = path.join(projectRoot, 'imagens')
const targetDir = path.join(projectRoot, 'public', 'images')
const manifestFile = path.join(projectRoot, 'components', 'logoManifest.ts')

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function copyImages() {
  await ensureDir(targetDir)

  let files = []
  try {
    files = await fs.readdir(sourceDir, { withFileTypes: true })
  } catch {
    return
  }

  const imageFiles = files.filter((item) => item.isFile())

  const firstLogo = imageFiles[0]?.name ?? null

  await fs.writeFile(
    manifestFile,
    `export const logoFilename = ${firstLogo ? `'${firstLogo.replace(/'/g, "\\'")}'` : 'null'} as const\n`,
    'utf8',
  )

  await Promise.all(
    imageFiles.map(async (entry) => {
      const from = path.join(sourceDir, entry.name)
      const to = path.join(targetDir, entry.name)
      await fs.copyFile(from, to)
    }),
  )
}

copyImages().catch((error) => {
  console.error('[sync-images] failed:', error)
  process.exitCode = 1
})
