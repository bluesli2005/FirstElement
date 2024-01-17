/**
 * Created by Capricorncd.
 * Date: 2020-08-05 09:39
 */
const os = require('os')
/**
 * object to javascript code
 * @param result
 * @returns {string}
 */
function objectToJavaScriptCode(result) {
  return (
    JSON.stringify(result, null, 2)
      // eslint and prettier
      .replace(/"/g, "'")
      .replace(/'(\w+)'/g, '$1')
      // last item
      // { {colorName: '#fff' } } to { {colorName: '#fff' }, }
      .replace(/.+(',?)/g, (match, $1) => {
        return $1 === "'" ? match + ',' : match
      }) + os.EOL
  )
}

const ACCEPT_THEMES = ['blue', 'red']

/**
 * get theme
 * @param arr
 * @returns {*}
 */
function getTheme(arr) {
  const index = arr.findIndex((item) => item === '--theme')
  const theme = arr[index + 1]
  return ACCEPT_THEMES.includes(theme) ? theme : 'blue'
}

module.exports = {
  getTheme,
  objectToJavaScriptCode,
}
