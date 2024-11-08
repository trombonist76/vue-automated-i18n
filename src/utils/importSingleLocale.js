import { getComponentLocaleKeys } from './component.js'

export function getFileLocaleKeys(fileContent) {
  const entries = Object.entries(fileContent)
  if (!entries.length) throw new Error('There is no translations in this file')

  const [filePath, translations] = entries.at(0)
  return {
    filePath,
    localeKeys: Object.keys(translations)
  }
}

// JSON dosyasında yeni eklenen keyleri bulmak içindi
// Fakat mevcuttaki çevirileri de güncellemek isteyebilir
// export function findNewLocaleKeys(localeKeysFromNewFile, currentLocaleKeys) {
// 	return localeKeysFromNewFile.filter(key => !currentLocaleKeys.includes(key))
// }

export async function getLocaleKeys(newTranslations) {
  const { filePath, localeKeys } = getFileLocaleKeys(newTranslations)
  const currentLocaleKeys = await getComponentLocaleKeys(filePath)

  return { currentLocaleKeys, newLocaleKeys: localeKeys }
}

export function getFallbackLocaleKeys(selectedLocaleKey, currentLocaleKeys) {
  return currentLocaleKeys.filter((key) => key !== selectedLocaleKey)
}
