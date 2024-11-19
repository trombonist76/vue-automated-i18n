export function getBuilder() {
  return {
    importFilePath: {
      message: 'Json file path to import locales',
      default: './translations.json'
    }
  }
}
