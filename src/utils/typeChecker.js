export function isString(value) {
  return typeof value === 'string'
}

export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}
