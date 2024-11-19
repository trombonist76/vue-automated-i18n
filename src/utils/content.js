import fs from 'fs'
import { parse } from '@vue/compiler-sfc'

export function readFileContent(file) {
  return fs.readFileSync(file).toString()
}

export async function getJSONFileContent(filePath) {
  const fileContent = readFileContent(filePath)
  return parseContent(fileContent)
}

export function parseContent(content, file = '') {
  try {
    return JSON.parse(content)
  } catch (err) {
    throw Error(`An error occured while parsing content in the ${file} file`)
  }
}

export function getLocaleTagContent(file, fileContent = '', tagType = 'i18n') {
  if (file && !fileContent) {
    fileContent = readFileContent(file)
  }
  const component = parse(fileContent)
  const customBlocks = component.descriptor.customBlocks
  const localeTag = customBlocks.find((blocks) => blocks.type === tagType)

  if (!localeTag) {
    console.log(`It cannot found any locale tag in '${filePath} file' \n`)
    return false
  }

  return parseContent(localeTag.content, file)
}
