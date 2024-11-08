import { readFileContent } from './content.js'

export function replaceOldLocales(file, updatedLocales, tagType = 'i18n') {
  const pattern = /<i18n([^>]*)>(.*?)<\/i18n>/gs
  const content = readFileContent(file)
  const updatedContent = JSON.stringify(updatedLocales, null, 2)
  const newContent = content.replace(pattern, (_, attrs) => {
    return `<${tagType}${attrs}>\n${updatedContent}\n</${tagType}>`
  })
  return newContent
}
