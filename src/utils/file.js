import { glob } from 'glob'

export async function getAllFiles(
  fileName,
  directory,
  nested = true,
  fileExtension = '.vue'
) {
  const path = nested
    ? `${directory}/**/${fileName || '*'}${fileExtension}`
    : `${directory}/${fileName || '*'}${fileExtension}`

  return await glob(path)
}

export function getFileName(file) {
  const splittedName = file.split('/')
  return splittedName.at(-1)
}

export function getFileNames(files) {
  return files.map(getFileName)
}

export async function getFileNamesInDir(
  dir,
  nested = true,
  fileExtension = 'vue'
) {
  const files = await getAllFiles(null, dir, nested, fileExtension)
  return getFileNames(files)
}

export function joinNameWithDir(dir, fileName) {
  return [dir, fileName].join('/')
}
