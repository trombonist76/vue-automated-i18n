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

export async function getTranslationsFromComponents(
  componentName = '',
  dir = 'src/components'
) {
  const files = await getAllComponents(componentName, dir)
  const contentsByFile = {}

  for (const file of files) {
    const content = getLocaleTagContent(file)
    if (!content) {
      console.log(`It cannot found any locale tag in '${file} file'`)
    }
    contentsByFile[file] = content
  }

  return contentsByFile
}

export function generateNestedObjFromStr(dottedString, value, baseObj) {
  /* 
		defined two Object variables
		"localObj" changes in every loop
		"baseObj" stores the nested properties that come from loops.
		if localObj changes then baseObj changes too.
		when iteration ends, the value is assigned to last node
	*/
  const splittedFieldNames = dottedString.split('.')
  let localObj = baseObj //holding same refference
  console.log('baseObj,', baseObj)
  splittedFieldNames.forEach((field, index) => {
    console.log('field,', field)
    console.log('localObj[field]', localObj[field])
    localObj[field] = localObj[field] || {}
    if (splittedFieldNames.length - 1 === index) {
      localObj[field] = value
    }

    localObj = localObj[field]
  })

  return baseObj
}
