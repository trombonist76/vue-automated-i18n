import { select } from '@inquirer/prompts'

export const BUILDER = {
  componentName: {
    message: 'Component adı. Customers.vue | Customers',
    required: true
  },
  fieldName: {
    message: "Çevirilere eklenecek field key'i.",
    required: true
  },
  fieldValue: {
    message: 'Çevirilere eklenecek field açıklaması.',
    required: true
  },
  dir: {
    message: "Component'in bulunduğu dizin.",
    default: 'src/components'
  },
  selectedLocales: {
    message: 'Şimdi yazacağınız çeviri hangi dillere eklenecek?',
    required: true,
    loop: false,
    theme: {
      prefix: '(Her dil için ayrı ayrı çeviri girebilirsiniz)'
    }
  }
}
