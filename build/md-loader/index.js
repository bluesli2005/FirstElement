/**
 * Created by Capricorncd.
 * Date: 2020-09-01 17:00
 */
const md = require('markdown-it')().use(require('markdown-it-multimd-table'))
const { escapeTag, esDoublesBrackets } = require('./helper')

module.exports = function (source) {
  const lines = []
  // vue code
  const codes = []
  // other code
  const tempCodes = []
  const tables = []
  // let hasCode = false
  let isCode = false
  let isHtml = false
  let codeType = ''
  source.split(/[\n\r]/).forEach((line) => {
    // keep blank lines in the code
    if (!isCode && !line) return
    // check code
    if (/^```(\w*)/.test(line.trim())) {
      // hasCode = true
      isCode = line.trim().length > 3
      if (isCode) {
        codeType = RegExp.$1
      }
      // Multiple HTML code blocks cannot appear
      if (isCode && codeType === 'html') {
        isHtml = true
      }
      if (!isCode) {
        if (!isHtml && tempCodes.length) {
          lines.push(`<pre><code class="${codeType}">`)
          lines.push(...tempCodes)
          lines.push(`</code></pre>`)
          tempCodes.length = 0
        }
      }
      return
    }
    if (isCode) {
      if (isHtml) {
        codes.push(line)
      } else {
        tempCodes.push(escapeTag(line))
      }
    } else {
      // check table
      if (/\s*\|.*\|/.test(line)) {
        tables.push(line)
      } else {
        if (tables.length) {
          lines.push(md.render(tables.join('\n')))
          tables.length = 0
        }
        lines.push(md.render(line))
      }
    }
  })

  // last table check
  if (tables.length) {
    lines.push(md.render(tables.join('\n')))
    tables.length = 0
  }

  const arr = ['<template><div class="demo-wrapper">']
  lines.forEach((line) => {
    arr.push(line)
  })

  if (codes.length) {
    // create pre
    let isTemplate = true
    const pres = ['<pre><code class="html hljs">', escapeTag('<template>')]
    pres.push(escapeTag('  <div>'))
    codes.forEach((line) => {
      if (/^<script/.test(line)) {
        pres.push(escapeTag('  </div>'))
        pres.push(escapeTag('</template>'))
        pres.push('')
        isTemplate = false
      }
      pres.push((isTemplate ? '    ' : '') + escapeTag(esDoublesBrackets(line)))
    })
    pres.push('</code></pre>')

    // codes
    codes.forEach((line) => {
      if (/^<script/.test(line)) {
        arr.push(pres.join('\n'))
        arr.push('</div></template>')
      }
      arr.push(line)
    })
  } else {
    arr.push('</div></template>')
  }
  // if (!hasCode) {
  //   arr.push('</div></template>')
  // }

  // console.log(arr.join('\n'))
  return arr.join('\n')
}
