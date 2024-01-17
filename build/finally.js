/**
 * Created by Capricorncd.
 * Date: 2020-08-05 09:37
 */
const { resolve } = require('path')
const replace = require('replace-in-file')
const pkg = require('../package.json')

/**
 * replace version
 */
function replaceVersion() {
  const options = {
    files: resolve(__dirname, '../dist/*.js'),
    from: /__VERSION__/g,
    to: pkg.version,
  }
  try {
    const results = replace.sync(options)
    console.log('Replacement results:', results)
  } catch (err) {
    console.error('Error occurred:', err)
  }
}

replaceVersion()
