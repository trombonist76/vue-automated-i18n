export function getBuilder() {
  return {
    exportFilePath: {
      message: 'Json file path to export locales',
      default: 'translations.json'
    },
    dir: {
      message: 'Components directory to export their locales',
      default: './src'
    },
    searchNested: {
      message: 'Search components in nested folder structure.',
      default: true
    }
  }
}
