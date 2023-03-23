import yargs from 'yargs'
import fs from 'fs'
import { getTranslationsFromComponents } from '../utils/index.js'

yargs.command({
  command: 'export',
  describe: 'Export all components translations',
  builder: {
    exportFilePath: {
      alias: 'p',
      describe: 'Json file path to export locales',
      default: 'translations.json'
    },
    dir: {
      alias: 'd',
      describe: 'Components directory to export their locales'
    },
    component: {
      alias: 'c',
      describe: 'Component name to export them locales without ".vue"'
    }
  },
  handler: async (argv) => {
    const { exportFilePath, dir, component } = argv
    const translations = await getTranslationsFromComponents(component, dir)
    const preparedToWrite = JSON.stringify(translations, null, 2)
    fs.writeFileSync(exportFilePath, preparedToWrite, () => {})
  }
})

yargs.help()
yargs.parse()
