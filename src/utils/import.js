import { parseContent, readFileContent } from './content.js'

export function getTranslationsFromJson(filePath) {
  const content = readFileContent(filePath)
  const parsedContent = parseContent(content, filePath)
  return parsedContent
}
