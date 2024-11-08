export function getBuilder() {
  return {
    componentName: {
      message: 'Component name eg. Customers.vue | Customers',
      required: true
    },
    fieldName: {
      message: 'Field key which added to each locale.',
      required: true
    },
    fieldValue: {
      message: 'Field description for given field key',
      required: true
    },
    dir: {
      message: 'Component directory',
      default: 'src/components'
    }
  }
}
