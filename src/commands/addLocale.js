#!/usr/bin/env node

import yargs from 'yargs'
import { input } from '@inquirer/prompts'
import { hideBin } from 'yargs/helpers'
import { updateComponents } from '../utils/component.js'
import { BUILDER } from '../builders/addLocale.js'
import { addLocaleByBaseLocale } from '../utils/addLocale.js'

yargs(hideBin(process.argv))
  .command({
    command: '*',
    describe: 'Add new locale to all components',
    handler: async (argv) => {
      const localeKey = await input(BUILDER.localeKey)
      const baseLocaleKey = await input(BUILDER.baseLocaleKey)
      const dir = await input(BUILDER.dir)

      const updatedContent = (content) =>
        addLocaleByBaseLocale(content, localeKey, baseLocaleKey)

      await updateComponents(updatedContent, '', dir)
    }
  })
  .help()
  .parse()
