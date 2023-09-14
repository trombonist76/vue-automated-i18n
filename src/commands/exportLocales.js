#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from 'fs'
import { getTranslationsFromComponents } from '../utils/index.js'

yargs(hideBin(process.argv))
  .command({
    command: 'export-locales',
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
      },
      nested: {
        alias: 'n',
        describe: 'Search components in nested folder structure.'
      }
    },
    handler: async (argv) => {
      const { exportFilePath, dir, component, nested } = argv
      const translations = await getTranslationsFromComponents(
        component,
        dir,
        nested
      )
      const preparedToWrite = JSON.stringify(translations, null, 2)
      fs.writeFileSync(exportFilePath, preparedToWrite, () => {})
    }
  })
  .help()
  .parse()
