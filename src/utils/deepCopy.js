export function deepCopy (obj) {
  // if (!isArray(list)) { throw new Error('[ERROR] >> DeepCopy >> input is not array !') }
  // let newList = []
  // list.forEach(data => {
  //   newList.push(data)
  // })
  // return newList
  return JSON.parse(JSON.stringify(obj))
  // return Object.assign({}, obj)
}

export function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}
