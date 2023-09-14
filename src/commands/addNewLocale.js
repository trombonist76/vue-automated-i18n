#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { updateComponent } from '../utils/index.js'

function addNewLocale(tagContent, newKey, extendKey = '') {
  const updatedContent = { ...tagContent }
  updatedContent[newKey] = {}

  if (extendKey) {
    updatedContent[newKey] = updatedContent[extendKey]
  }

  return updatedContent
}

yargs(hideBin(process.argv))
  .command({
    command: 'add-locale',
    describe: 'Add new locale to all components',
    builder: {
      localeKey: {
        alias: 'l',
        describe: 'New locale key.',
        demandOption: true
      },
      extendKey: {
        alias: 'e',
        describe: 'Locale key to extend.'
      },
      dir: {
        alias: 'd',
        describe: 'Components directory to add new locale.'
      }
    },
    handler: async (argv) => {
      const { localeKey, extendKey, dir } = argv

      const updatedContent = (content) =>
        addNewLocale(content, localeKey, extendKey)
      await updateComponent(updatedContent, '', dir)
    }
  })
  .help()
  .parse()
