import { isObject, isString } from './typeChecker.js'
import { deepMerge } from './deepMerge.js'

export function validateTranslations(
  currentTranslations,
  newTranslations,
  parent = null
) {
  const validTranslations = Object.entries(newTranslations).reduce(
    (validTranslations, translationEntry) => {
      const [translationKey, translationValue] = translationEntry
      const translationFromCurrent = currentTranslations[translationKey]

      const parentArr = parent ? [...parent, translationKey] : [translationKey]
      const path = parentArr.join('.')

      if (!translationFromCurrent) {
        console.log('Bu key mevcut çevirilerde yer almıyor', path)
      } else if (
        isString(translationFromCurrent) &&
        isString(translationValue)
      ) {
        validTranslations[translationKey] = translationValue
      } else if (
        isObject(translationFromCurrent) &&
        isObject(translationValue)
      ) {
        validTranslations[translationKey] = validateTranslations(
          translationFromCurrent,
          translationValue,
          parentArr
        )
      } else {
        console.log(
          'Bu çeviri eski ve yeni dosyada yapısal olarak eşleşmiyor',
          path
        )
      }

      return validTranslations
    },
    {}
  )

  return deepMerge(currentTranslations, validTranslations)
}
