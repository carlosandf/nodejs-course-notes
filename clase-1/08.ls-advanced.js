const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`No se ha podido leer el directorio ${folder}`))
    process.exit(1)
  }

  const maxLengthString = files.reduce((prev, current) => {
    return current.length > prev ? current.length : prev
  }, 0)

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)

    let stats
    try {
      stats = await fs.stat(filePath) // status - información del archivo
    } catch {
      console.error(pc.red(`No se pudo leer el archivo ${filePath}`))
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleDateString()

    const fileName = isDirectory
      ? pc.bold(pc.blue(file.padEnd(maxLengthString + 5)))
      : pc.magenta(file.padEnd(maxLengthString + 5))

    return `${fileName} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => {
    console.log(fileInfo)
  })
}

ls(folder)