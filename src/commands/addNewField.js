import yargs from "yargs"
import { updateComponent } from "../utils/index.js"

function addNewFieldToLangs (tagContent, fieldName, value = '') {
  const updatedContent = { ...tagContent }
  Object.entries(updatedContent).map(([lang, fields]) => {
    updatedContent[lang] = { ...fields, [fieldName]: value }
  })

  return updatedContent
}

yargs.command({
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
      demandOption: true,
    }
  },
  handler: (argv) => {
    const { fieldName, fieldValue, component } = argv

    const updatedContent = content => addNewFieldToLangs(content, fieldName, fieldValue)
    updateComponent(updatedContent, component)
  }
})

yargs.command({
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
      describe: 'Components directory to add new field their locales',
    },
  },
  handler: async (argv) => {
    const { fieldName, fieldValue, dir } = argv
    const updatedContent = content => addNewFieldToLangs(content, fieldName, fieldValue)
    await updateComponent(updatedContent, dir)
  }
})

yargs.help()
yargs.parse()