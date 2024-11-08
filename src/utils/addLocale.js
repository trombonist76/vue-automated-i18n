export function addLocaleByBaseLocale(tagContent, newKey, extendKey = '') {
  const updatedContent = { ...tagContent }
  updatedContent[newKey] = {}

  if (extendKey) {
    updatedContent[newKey] = updatedContent[extendKey]
  }

  return updatedContent
}
