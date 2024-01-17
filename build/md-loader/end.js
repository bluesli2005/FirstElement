/**
 * Created by Capricorncd
 * Date: 2020-09-01 17:00
 */
const { deDoublesBrackets } = require('./helper')

module.exports = function (source) {
  const arr = []
  source.split(/[\n\r]/).forEach((line) => {
    arr.push(deDoublesBrackets(line))
  })

  return arr.join('\n')
}
