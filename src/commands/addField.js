#!/usr/bin/env node
import yargs from 'yargs'
import { input } from '@inquirer/prompts'
import { hideBin } from 'yargs/helpers'
import { getBuilder } from '../builders/addField.js'
import { updateComponents } from '../utils/component.js'
import { addFieldToLangs } from '../utils/addField.js'

yargs(hideBin(process.argv))
  .command({
    command: 'add-field',
    describe: 'Add field to component locales',
    handler: async (argv) => {
      const BUILDER = getBuilder()

      const componentName = await input(BUILDER.componentName)
      const fieldName = await input(BUILDER.fieldName)
      const fieldValue = await input(BUILDER.fieldValue)
      const dir = await input(BUILDER.dir)

      const updatedContent = (content) =>
        addFieldToLangs(content, fieldName, fieldValue)
      updateComponents(updatedContent, componentName, dir)
    }
  })
  .help()
  .parse()
