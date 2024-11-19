import fs from 'fs'
import { getLocaleTagContent } from './content.js'
import { replaceOldLocales } from './replace.js'
import { getAllFiles } from './file.js'

export async function getAllComponents(
  fileName,
  directory = 'src/components',
  nested = true
) {
  return await getAllFiles(fileName, directory, nested, '.vue')
}

export function updateComponent(filePath, callback) {
  console.log(`The file '${filePath}' is reading now.`)

  const localeTagContent = getLocaleTagContent(filePath)
  if (!localeTagContent) return

  const updatedContent = callback(localeTagContent, filePath)
  const updatedComponent = replaceOldLocales(filePath, updatedContent)
  fs.writeFileSync(filePath, updatedComponent)
}

export async function updateComponents(
  callback,
  fileName = '',
  directory = 'src/components'
) {
  const componentPaths = await getAllComponents(fileName, directory)

  if (!componentPaths?.length) {
    return console.log('No file found matching the specified criteria.')
  }

  console.log('files', componentPaths)
  componentPaths.forEach((path) => updateComponent(path, callback))
}

export async function getComponentLocaleKeys(filePath) {
  const fileContent = getLocaleTagContent(filePath)
  return Object.keys(fileContent)
}
