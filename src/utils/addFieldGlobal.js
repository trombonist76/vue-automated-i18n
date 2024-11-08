import fs from 'fs'
import { Separator } from '@inquirer/prompts'
import { getAllFiles, getFileNamesInDir, joinNameWithDir } from './file.js'
import { getJSONFileContent } from './content.js'
import { generateNestedObjFromStr } from './nestedField.js'

export async function globalLocalesToChoices(dir) {
  const globalLocales = await getFileNamesInDir(dir, true, '.json')
  const choices = globalLocales.map((fileName) => ({
    name: fileName,
    value: joinNameWithDir(dir, fileName),
    checked: true
  }))

  choices.push(new Separator())
  return choices
}

export async function updateGlobalLocale(filePath, callback) {
  console.log(`The file '${filePath}' is reading now.`)

  const localeContent = await getJSONFileContent(filePath)
  if (!localeContent) {
    console.log(`It cannot found any translations in '${filePath} file' \n`)
    return
  }

  const updatedContent = callback(localeContent)
  const stringifiedContent = JSON.stringify(updatedContent, null, 2)
  fs.writeFileSync(filePath, stringifiedContent)
}

export async function updateGlobalLocales(callback, filePaths) {
  for await (const path of filePaths) {
    await updateGlobalLocale(path, callback)
  }
}

export function addFieldToGlobalLocale(
  localeContent,
  fieldName,
  fieldValue = ''
) {
  const isFieldNested = fieldName.includes('.')

  if (isFieldNested) {
    const nestedObj = generateNestedObjFromStr(
      fieldName,
      fieldValue,
      localeContent
    )

    return { ...localeContent, ...nestedObj }
  }

  return { ...localeContent, [fieldName]: fieldValue }
}
