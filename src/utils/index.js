import { parse } from '@vue/compiler-sfc'
import glob from 'glob'
import fs from 'fs'

function getFileContent(file) {
  return fs.readFileSync(file).toString()
}

function parseContent(content, file = '') {
  try {
    return JSON.parse(content)
  } catch (err) {
    throw Error(`An error occured when the ${file} parsing locale tag content`)
  }
}

function getLocaleTagContent(file, fileContent = '', tagType = 'i18n') {
  if (file && !fileContent) {
    fileContent = getFileContent(file)
  }
  const component = parse(fileContent)
  const customBlocks = component.descriptor.customBlocks
  const localeTag = customBlocks.find((blocks) => blocks.type === tagType)

  if (!localeTag) return false

  return parseContent(localeTag.content, file)
}

function replaceOldLocales(file, updatedLocales, tagType = 'i18n') {
  const pattern = /<i18n>(.*?)<\/i18n>/gs
  const content = getFileContent(file)
  const updatedContent = JSON.stringify(updatedLocales, null, 2)
  const newContent = content.replace(
    pattern,
    `<${tagType}>\n${updatedContent}\n</${tagType}>`
  )

  return newContent
}

async function getAllComponents(fileName, directory = 'src/components') {
  const path = `${directory}/${fileName || '*'}.vue`
  const components = await glob(path)
  return components
}

export async function updateComponent(callback, fileName = '') {
  const files = await getAllComponents(fileName)
  files.forEach((file) => {
    console.log(`The file '${file}' is reading now.`)

    const localeTagContent = getLocaleTagContent(file)
    if (!localeTagContent) {
      console.log(`It cannot found any locale tag in '${file} file'`)
      return
    }

    const updatedContent = callback(localeTagContent, file)
    const updatedComponent = replaceOldLocales(file, updatedContent)
    fs.writeFileSync(file, updatedComponent)
  })
}

export function getTranslationsFromJson(filePath) {
  const content = getFileContent(filePath)
  const parsedContent = parseContent(content, filePath)
  return parsedContent
}
