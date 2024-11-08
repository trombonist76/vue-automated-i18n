export function generateNestedObjFromStr(dottedString, value, baseObj) {
  /* 
		defined two Object variables
		"localObj" changes in every loop
		"baseObj" stores the nested properties that come from loops.
		if localObj changes then baseObj changes too.
		when iteration ends, the value is assigned to last node
	*/
  const splittedFieldNames = dottedString.split('.')
  let localObj = baseObj //holding same refference
  splittedFieldNames.forEach((field, index) => {
    localObj[field] = localObj[field] || {}
    if (splittedFieldNames.length - 1 === index) {
      localObj[field] = value
    }

    localObj = localObj[field]
  })

  return baseObj
}
