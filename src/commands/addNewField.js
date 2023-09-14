#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { updateComponent, generateNestedObjFromStr } from '../utils/index.js'

function addNewFieldToLangs(tagContent, fieldName, value = '') {
  const updatingContent = { ...tagContent }
  const contentEntries = Object.entries(updatingContent)
  const isFieldNested = fieldName.includes('.')

  for (const [lang, fields] of contentEntries) {
    if (isFieldNested) {
      const nestedObj = generateNestedObjFromStr(
        fieldName,
        value,
        updatingContent[lang]
      )
      updatingContent[lang] = { ...fields, ...nestedObj }
      continue
    }
    updatingContent[lang] = { ...fields, [fieldName]: value }
  }

  return updatingContent
}

yargs(hideBin(process.argv))
  .command({
    command: 'add-field',
    describe: 'Add field to component locales',
    builder: {
      component: {
        alias: 'c',
        describe: 'Component name.',
        demandOption: true
      },
      fieldName: {
        alias: 'f',
        describe: 'Field name which added to each locale.',
        demandOption: true
      },
      fieldValue: {
        alias: 'v',
        describe: 'Field value.',
        demandOption: true
      },
      dir: {
        alias: 'd',
        describe: 'Component directory'
      }
    },
    handler: (argv) => {
      const { fieldName, fieldValue, component, dir } = argv

      const updatedContent = (content) =>
        addNewFieldToLangs(content, fieldName, fieldValue)
      updateComponent(updatedContent, component, dir)
    }
  })
  .help()
  .parse()

yargs(hideBin(process.argv))
  .command({
    command: 'add-field-all',
    describe: 'Add field to all component locales',
    builder: {
      fieldName: {
        alias: 'f',
        describe: 'Field name which added to each locale.',
        demandOption: true
      },
      fieldValue: {
        alias: 'v',
        describe: 'Field value.',
        demandOption: true
      },
      dir: {
        alias: 'd',
        describe: 'Components directory to add new field their locales'
      }
    },
    handler: async (argv) => {
      const { fieldName, fieldValue, dir } = argv
      const updatedContent = (content) =>
        addNewFieldToLangs(content, fieldName, fieldValue)
      await updateComponent(updatedContent, '', dir)
    }
  })
  .help()
  .parse()
