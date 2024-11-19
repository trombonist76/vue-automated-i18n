#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { input } from '@inquirer/prompts'

import { getBuilder } from '../builders/importLocales.js'
import { getTranslationsFromJson } from '../utils/import.js'
import { updateComponent } from '../utils/component.js'
import { validateTranslations } from '../utils/compare.js'

yargs(hideBin(process.argv))
  .command({
    command: 'import-locales',
    describe:
      'Import translations from given Json file and update components locales',
    handler: async (argv) => {
      const BUILDER = getBuilder()

      const importFilePath = await input(BUILDER.importFilePath)
      const jsonContent = await getTranslationsFromJson(importFilePath)

      const executor = (currentTranslations, file) =>
        validateTranslations(currentTranslations, jsonContent[file])

      Object.keys(jsonContent).forEach(async (filePath) => {
        await updateComponent(filePath, executor)
      })
    }
  })
  .help()
  .parse()
