import yargs from 'yargs'
import { updateComponent } from '../utils/index.js'

function addNewLocale(tagContent, newKey, extendKey = '') {
  const updatedContent = { ...tagContent }
  updatedContent[newKey] = {}

  if (extendKey) {
    updatedContent[newKey] = updatedContent[extendKey]
  }

  return updatedContent
}

yargs.command({
  command: 'add-locale',
  describe: 'Add new locale to all components',
  builder: {
    localeKey: {
      alias: 'l',
      describe: 'New locale key.',
      demandOption: true
    },
    extendKey: {
      alias: 'e',
      describe: 'Locale key to extend.'
    },
    dir: {
      alias: 'd',
      describe: 'Components directory to add new locale.'
    }
  },
  handler: async (argv) => {
    const { localeKey, extendKey, dir } = argv

    const updatedContent = (content) =>
      addNewLocale(content, localeKey, extendKey)
    await updateComponent(updatedContent, dir)
  }
})

yargs.help()
yargs.parse()
