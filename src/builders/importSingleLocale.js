export function getBuilder() {
  return {
    importFilePath: {
      message: 'Json file path to import locales',
      default: './translations.json'
    },
    newLocaleKey: {
      message: 'New locale key',
      required: true
    },
    fallbackLocaleKey: {
      message: 'Fallback locale key',
      required: false
    }
  }
}
