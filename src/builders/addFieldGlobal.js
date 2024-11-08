export function getBuilder(allGlobalLocales) {
  return {
    dir: {
      message:
        'The directory containing the global locale files where the field will be added',
      default: 'src/locales/translations'
    },
    fieldName: {
      message: 'Field key',
      required: true
    },
    fieldValue: {
      message: 'Field description',
      required: true
    },
    selectedLocales: {
      message: 'The global locale files where the field will be added',
      required: true
    }
  }
}
