#!/usr/bin/env node
import fs from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { input } from '@inquirer/prompts'

import { getTranslationsFromComponents } from '../utils/export.js'
import { BUILDER } from '../builders/exportLocales.js'

yargs(hideBin(process.argv))
  .command({
    command: '*',
    describe: 'Export all components translations',
    handler: async (argv) => {
      const exportFilePath = await input(BUILDER.exportFilePath)
      const dir = await input(BUILDER.dir)
      const searchNested = await input(BUILDER.searchNested)

      const translations = await getTranslationsFromComponents(
        null,
        dir,
        searchNested
      )
      const preparedToWrite = JSON.stringify(translations, null, 2)
      fs.writeFileSync(exportFilePath, preparedToWrite, () => {})
    }
  })
  .help()
  .parse()
