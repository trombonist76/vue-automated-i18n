import yargs from 'yargs'
import { updateComponent, getTranslationsFromJson } from '../utils/index.js'

yargs.command({
  command: 'import',
  describe:
    'Import translations from given Json file and update components locales',
  builder: {
    importFilePath: {
      alias: 'p',
      describe: 'Json file path to import locales',
      demandOption: true
    },
    dir: {
      alias: 'd',
      describe: 'Components directory to add imported locales.'
    }
  },
  handler: async (argv) => {
    const { importFilePath, dir } = argv
    const jsonContent = getTranslationsFromJson(importFilePath)
    const executor = (_, file) => jsonContent[file]
    await updateComponent(executor, dir)
  }
})

yargs.help()
yargs.parse()
