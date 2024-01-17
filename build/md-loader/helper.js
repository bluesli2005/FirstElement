/**
 * Created by Capricorncd.
 * Date: 2020-09-01 17:25
 */
/**
 * HTML escape characters
 * @param str
 * @returns {string}
 */
exports.escapeTag = function escapeTag(str) {
  return str.replace(/<(\/?\w+)/g, '&lt;$1').replace(/(\w+)>/g, '$1&gt;')
}

exports.esDoublesBrackets = function esDoublesBrackets(str) {
  return !str
    ? ''
    : str.replace(/\{\{(.+)\}\}/g, (match, $1) => {
        return `__DOUBLE_BRACKET_L__${$1}__DOUBLE_BRACKET_R__`
      })
}
exports.deDoublesBrackets = function deDoublesBrackets(str) {
  return !str
    ? ''
    : str.replace(/__DOUBLE_BRACKET_([LR])__/g, (match, $1) => {
        console.log(match, $1)
        return $1 === 'L' ? '{ {' : '} }'
      })
}
