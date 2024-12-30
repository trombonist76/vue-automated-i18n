#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { input } from '@inquirer/prompts'

import { BUILDER } from '../builders/compare.js'
import { getTranslationsFromJson } from '../utils/import.js'
import { getLocaleTagContent } from '../utils/content.js'
import { validateTranslations } from '../utils/compare.js'

yargs(hideBin(process.argv))
  .command({
    command: '*',
    describe: 'Compare translations with given Json file',
    handler: async (argv) => {
      const importFilePath = await input(BUILDER.importFilePath)
      const jsonContent = await getTranslationsFromJson(importFilePath)

      Object.keys(jsonContent).forEach(async (filePath) => {
        const localeTagContent = getLocaleTagContent(filePath)
        if (!localeTagContent) return
        validateTranslations(localeTagContent, jsonContent[filePath])
      })
    }
  })
  .help()
  .parse()
