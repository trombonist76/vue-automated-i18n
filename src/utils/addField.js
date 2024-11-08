import { generateNestedObjFromStr } from './nestedField.js'

export function addFieldToLangs(localeTagContent, fieldName, fieldValue = '') {
  const updatingContent = { ...localeTagContent }
  const contentEntries = Object.entries(updatingContent)
  const isFieldNested = fieldName.includes('.')

  for (const [lang, fields] of contentEntries) {
    if (isFieldNested) {
      const nestedObj = generateNestedObjFromStr(
        fieldName,
        fieldValue,
        updatingContent[lang]
      )

      updatingContent[lang] = { ...fields, ...nestedObj }
      continue
    }
    updatingContent[lang] = { ...fields, [fieldName]: fieldValue }
  }
  return updatingContent
}
