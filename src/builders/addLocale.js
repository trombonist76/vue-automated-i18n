export function getBuilder() {
  return {
    localeKey: {
      message: 'The locale key to be added to the components eg. tr',
      required: true
    },
    baseLocaleKey: {
      message:
        'The locale key that will serve as the basis for the new locale to be added',
      default: 'en'
    },
    dir: {
      message: 'Components directory',
      default: './src'
    }
  }
}
