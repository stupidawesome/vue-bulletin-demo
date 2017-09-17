const paramsRexp = new RegExp('\\:[^\\/\\?\\&\\#]+', 'g')
const entityRexp = new RegExp('([^\\/]*[^\\/]*.)(?=\\/[^\\/]*\\:)', 'g')

export class Endpoint {
  constructor (rawValue) {
    this.rawValue = rawValue
    this.entity = entityRexp.exec(rawValue)
    this.params = rawValue.match(paramsRexp)
  }

  parse (payload) {
    return this.params.reduce((rawValue, param) => {
      return rawValue.replace(param, payload[param])
    }, this.rawValue)
  }
}
