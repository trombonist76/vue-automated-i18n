import { getAllComponents } from './component.js'
import { getLocaleTagContent } from './content.js'

export async function getTranslationsFromComponents(
  componentName = '',
  dir = 'src/components',
  nested = true
) {
  const files = await getAllComponents(componentName, dir, nested)
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
