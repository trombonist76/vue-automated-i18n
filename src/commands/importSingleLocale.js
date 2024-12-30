#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { input, select } from '@inquirer/prompts'

import { getTranslationsFromJson } from '../utils/import.js'
import { BUILDER } from '../builders/importSingleLocale.js'
import { updateComponent } from '../utils/component.js'
import {
  getFallbackLocaleKeys,
  getLocaleKeys
} from '../utils/importSingleLocale.js'
import { deepMerge } from '../utils/deepMerge.js'

yargs(hideBin(process.argv))
  .command({
    command: '*',
    describe:
      'Import translations from given Json file and update components locales',
    handler: async (argv) => {
      const importFilePath = await input(BUILDER.importFilePath)
      const jsonContent = await getTranslationsFromJson(importFilePath)

      const { currentLocaleKeys, newLocaleKeys } = await getLocaleKeys(
        jsonContent
      )

      const newLocaleKeyOpts = {
        ...BUILDER.newLocaleKey,
        choices: newLocaleKeys
      }
      const selectedLocaleKey = await select(newLocaleKeyOpts)

      const fallbackLocaleKeys = getFallbackLocaleKeys(
        selectedLocaleKey,
        currentLocaleKeys
      )
      const oldLocaleKeyOpts = {
        ...BUILDER.fallbackLocaleKey,
        choices: fallbackLocaleKeys
      }
      const fallbackLocaleKey = await select(oldLocaleKeyOpts)

      const executor = (i18nContent, file) => {
        const newContent = Object.assign({}, i18nContent)
        const newLocaleTranslations = jsonContent[file][selectedLocaleKey]
        const fallbackLocaleTranslations = newContent[fallbackLocaleKey]
        const mergedTranslations = deepMerge(
          {},
          fallbackLocaleTranslations,
          newLocaleTranslations
        )
        newContent[selectedLocaleKey] = mergedTranslations
        return newContent
      }

      Object.keys(jsonContent).forEach(async (filePath) => {
        await updateComponent(filePath, executor)
      })
    }
  })
  .help()
  .parse()
