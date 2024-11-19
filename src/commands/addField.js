#!/usr/bin/env node
import yargs from 'yargs'
import { confirm, input } from '@inquirer/prompts'
import { hideBin } from 'yargs/helpers'
import { getBuilder } from '../builders/addField.js'
import { updateComponents } from '../utils/component.js'
import { addFieldsToLangs } from '../utils/addField.js'

yargs(hideBin(process.argv))
  .command({
    command: 'add-field',
    describe: 'Add field to component locales',
    handler: async (argv) => {
      const BUILDER = getBuilder()

      const dir = await input(BUILDER.dir)
      const componentName = await input(BUILDER.componentName)

      async function getFields() {
        const fieldName = await input(BUILDER.fieldName)
        const fieldValue = await input(BUILDER.fieldValue)
        const addAnotherField = await confirm({
          message: 'Add another field',
          default: false
        })

        const fields = { [fieldName]: fieldValue }
        if (!addAnotherField) return fields
        const otherFields = await getFields()
        return Object.assign({}, fields, otherFields)
      }

      const fields = await getFields()
      const updatedContent = (content) => addFieldsToLangs(content, fields)
      updateComponents(updatedContent, componentName, dir)
    }
  })
  .help()
  .parse()
