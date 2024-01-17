/**
 * Created by Capricorncd.
 * Date: 2020-08-04 12:01
 */
const os = require('os')
const { resolve } = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const { objectToJavaScriptCode } = require('./helper')
const { THEMES } = require('./constants')

/**
 * color name to camel case
 * @param colorName
 * @returns {*}
 */
function fmtColorName(colorName) {
  return colorName.replace(/\-(\w)/g, (match, $1) => {
    return $1 ? $1.toUpperCase() : ''
  })
}

/**
 * get color name and value
 * @param line
 * @returns {(*|string)[]}
 */
function getColor(line) {
  const arr = line.split(':')
  const colorName = arr[0].trim()
  return [
    fmtColorName(colorName),
    arr[1].trim().replace(/;/g, ''),
    '$--color-' + colorName,
  ]
}

/**
 * create color js file
 */
function createColorJSFile(theme) {
  // resource scss file
  const COLOR_SASS_FILE = resolve(
    __dirname,
    `../src/assets/scss/theme-${theme}.scss`
  )
  // export target js file
  const TARGET_JS_FILE = resolve(__dirname, `../src/plugins/theme-${theme}.js`)
  console.log(chalk.green('== handle color: Start ========='))
  console.log('Read file: ' + COLOR_SASS_FILE)
  try {
    // read color.scss
    const sassData = fs.readFileSync(COLOR_SASS_FILE)
    // temp colors
    const tempColors = {}
    // handle file line data
    let tempArr
    const colorsArray = sassData
      .toString()
      .split(new RegExp(os.EOL))
      .reduce((prev, line) => {
        line = line.trim()
        if (/\$-+color-(.+)/.test(line)) {
          tempArr = getColor(RegExp.$1)
          tempColors[tempArr[2]] = tempArr[1]
          prev.push(tempArr)
        }
        return prev
      }, [])

    // array to object
    const reg = /(\$[\w\d-]+)/g
    const result = colorsArray.reduce((prev, color) => {
      prev[color[0]] = color[1].replace(reg, (match, $1) => {
        return tempColors[$1] || $1
      })
      return prev
    }, {})
    // export color.js file
    const jsString = objectToJavaScriptCode(result)
    console.log('Write file: ', TARGET_JS_FILE)
    fs.writeFileSync(TARGET_JS_FILE, 'export default ' + jsString)
    console.log(chalk.green('Success!'))
  } catch (e) {
    console.error(e)
    console.log(chalk.red('Failed!'))
  }
  console.log(chalk.green('== handle color: End =========\n'))
}

function handleThemeColors() {
  THEMES.forEach((theme) => {
    createColorJSFile(theme)
  })
}

module.exports = {
  handleThemeColors,
}
