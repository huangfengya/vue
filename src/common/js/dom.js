let domStyle = document.createElement('div').style

var vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (domStyle[transformNames[key]] !== undefined) {
      return transformNames[key]
    }
  }

  return false
})()

export function prefixStyle() {
  if (vendor === false) {
    return false
  }

  return vendor
}
