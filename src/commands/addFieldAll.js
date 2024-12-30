#!/usr/bin/env node
import yargs from 'yargs'
import { input } from '@inquirer/prompts'
import { hideBin } from 'yargs/helpers'

import { BUILDER } from '../builders/addField.js'
import { updateComponents } from '../utils/component.js'
import { addFieldToLangs } from '../utils/addField.js'

yargs(hideBin(process.argv))
  .command({
    command: '*',
    describe: 'Add field to all component locales',
    handler: async (argv) => {
      const fieldName = await input(BUILDER.fieldName)
      const fieldValue = await input(BUILDER.fieldValue)
      const dir = await input(BUILDER.dir)

      const updatedContent = (content) =>
        addFieldToLangs(content, fieldName, fieldValue)
      await updateComponents(updatedContent, '', dir)
    }
  })
  .help()
  .parse()
