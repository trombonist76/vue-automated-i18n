#!/usr/bin/env node
import yargs from 'yargs'
import { input } from '@inquirer/prompts'
import { hideBin } from 'yargs/helpers'

import { BUILDER } from '../builders/addField.js'
import { updateComponents } from '../utils/component.js'
import {
  addFieldToSpecificLocales,
  generateOptionsFromLocaleKeys,
  getFields
} from '../utils/addField.js'

yargs(hideBin(process.argv))
  .command({
    command: '*',
    describe: 'Add field to component locales',
    handler: async (argv) => {
      const dir = await input(BUILDER.dir)
      const componentName = await input(BUILDER.componentName)
      const locales = await generateOptionsFromLocaleKeys(dir, componentName)
      const fields = await getFields(locales)

      const updatedContent = (content) => {
        Object.entries(fields).forEach(([fieldName, fieldValues]) => {
          fieldValues.forEach(({ fieldValue, selectedLocales }) => {
            content = addFieldToSpecificLocales(
              content,
              selectedLocales,
              fieldName,
              fieldValue
            )
          })
        })

        return content
      }
      updateComponents(updatedContent, componentName, dir)
    }
  })
  .help()
  .parse()
