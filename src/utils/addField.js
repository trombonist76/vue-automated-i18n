import { checkbox, confirm, input } from '@inquirer/prompts'
import { getComponentLocaleKeys } from './component.js'
import { joinNameWithDir } from './file.js'
import { generateNestedObjFromStr } from './nestedField.js'
import { BUILDER } from '../builders/addField.js'

/**
 * @description Yeni bir alanı locale içeriğine ekler.
 * @param {Object} localeContent - Dil içeriği.
 * @param {string} fieldName - Eklenen alanın adı.
 * @param {string} fieldValue - Alanın değeri.
 * @returns {Object} - Güncellenmiş dil içeriği.
 */
function updateLocaleContent(localeContent, fieldName, fieldValue) {
  const isFieldNested = fieldName.includes('.')
  const updatedContent = { ...localeContent }

  if (isFieldNested) {
    const nestedObj = generateNestedObjFromStr(
      fieldName,
      fieldValue,
      updatedContent
    )
    return { ...updatedContent, ...nestedObj }
  }

  updatedContent[fieldName] = fieldValue
  return updatedContent
}

/**
 * @description Spesifik dillere yeni bir alan ekler.
 * @param {Object} localeTagContent - Tüm dillerin içeriği.
 * @param {Array<string>} locales - Güncellenmesi istenen diller.
 * @param {string} fieldName - Eklenen alanın adı.
 * @param {string} [fieldValue] - Alanın varsayılan değeri.
 * @returns {Object} - Güncellenmiş dil içeriği.
 */
export function addFieldToSpecificLocales(
  localeTagContent,
  locales,
  fieldName,
  fieldValue = ''
) {
  return locales.reduce(
    (updatedContent, locale) => {
      updatedContent[locale] = updateLocaleContent(
        updatedContent[locale],
        fieldName,
        fieldValue
      )
      return updatedContent
    },
    { ...localeTagContent }
  )
}

/**
 * @description Tüm dillere yeni bir alan ekler.
 * @param {Object} localeTagContent - Tüm dillerin içeriği.
 * @param {string} fieldName - Eklenecek alan adı.
 * @param {string} [fieldValue=''] - Alanın varsayılan değeri.
 * @returns {Object} - Güncellenmiş tüm dillerin içeriği.
 */
export function addFieldToLangs(localeTagContent, fieldName, fieldValue = '') {
  const localeKeys = Object.keys(localeTagContent)
  return localeKeys.reduce(
    (updatedContent, locale) => {
      updatedContent[locale] = updateLocaleContent(
        localeTagContent[locale],
        fieldName,
        fieldValue
      )
      return updatedContent
    },
    { ...localeTagContent }
  )
}

/**
 * @description Bir component için locale anahtarlarından seçenekler oluşturur.
 * @param {string} dir - Dosya yolu.
 * @param {string} componentName - Component adı.
 * @returns {Promise<Array<Object>>} - Seçenekler dizisi.
 */
export async function generateOptionsFromLocaleKeys(dir, componentName) {
  const path = joinNameWithDir(dir, componentName, '.vue')
  const localeKeys = await getComponentLocaleKeys(path)

  return localeKeys.map((key) => ({
    name: key,
    value: key,
    checked: false
  }))
}

/**
 * @description Kullanıcıdan locale ve alan bilgilerini alır.
 * @param {Array<Object>} locales - Locale bilgileri.
 * @param {string} fieldName - Eklenen alan adı.
 * @returns {Promise<Object>} - Alan bilgileri.
 */
async function askFields(locales, fieldName) {
  const selectedLocales = await checkbox({
    ...BUILDER.selectedLocales,
    choices: locales
  })
  fieldName ??= await input(BUILDER.fieldName)
  const fieldValue = await input(BUILDER.fieldValue)

  const filteredLocales = locales.filter(
    (locale) => !selectedLocales.includes(locale.name)
  )
  const fields = { [fieldName]: [{ fieldValue, selectedLocales }] }

  if (filteredLocales.length) {
    const otherLocaleFields = await askFields(filteredLocales, fieldName)
    fields[fieldName].push(...otherLocaleFields[fieldName])
  }

  return fields
}

/**
 * @description Kullanıcıdan eklenmesi gereken tüm alanları alır.
 * @param {Array<Object>} locales - Locale bilgileri.
 * @returns {Promise<Object>} - Tüm alanlar.
 */
export async function getFields(locales) {
  const fields = await askFields(locales)

  const addAnotherField = await confirm({
    message: 'Add another field',
    default: false
  })

  if (!addAnotherField) return fields

  const otherFields = await getFields()
  return Object.assign({}, fields, otherFields)
}
