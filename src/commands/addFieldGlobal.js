#!/usr/bin/env node
import yargs from 'yargs'
import { checkbox, input } from '@inquirer/prompts'
import { hideBin } from 'yargs/helpers'
import { getBuilder } from '../builders/addFieldGlobal.js'
import { updateComponents } from '../utils/component.js'
import { addFieldToLangs } from '../utils/addField.js'
import { getAllFiles, getFileNamesInDir } from '../utils/file.js'
import {
  addFieldToGlobalLocale,
  globalLocalesToChoices,
  updateGlobalLocales
} from '../utils/addFieldGlobal.js'

yargs(hideBin(process.argv))
  .command({
    command: 'add-field-global',
    describe: 'Add field to global locales',
    handler: async (argv) => {
      const BUILDER = getBuilder()
      const dir = await input(BUILDER.dir)
      const localeChoices = await globalLocalesToChoices(dir)

      const fieldName = await input(BUILDER.fieldName)
      const fieldValue = await input(BUILDER.fieldValue)
      const choiceOpts = { ...BUILDER.selectedLocales, choices: localeChoices }
      const selectedLocales = await checkbox(choiceOpts)

      const updatedContent = (content) =>
        addFieldToGlobalLocale(content, fieldName, fieldValue)
      await updateGlobalLocales(updatedContent, selectedLocales)
    }
  })
  .help()
  .parse()
