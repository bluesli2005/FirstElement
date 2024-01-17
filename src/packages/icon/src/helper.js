/**
 * Created by Capricorncd.
 * Date: 2020-08-14 12:40
 */
import { isString } from '../../../libs/index'

function createPathHtml(items) {
  let arr
  const result = items.reduce((prev, item) => {
    if (isString(item)) {
      prev.push(item)
      return prev
    }
    // t: tag
    arr = [`<${item.t}`]
    // a: attrs
    if (item.a) {
      Object.keys(item.a).forEach((key) => {
        arr.push(`${fmtCamelCase(key)}="${item.a[key]}"`)
      })
    }
    // color
    // if (/path|rect|text/.test(item.t) && isUndefined(item.fill)) {
    //   arr.push(`fill=${color}`)
    // } else if (item.t === 'line' && isUndefined(item.stroke)) {
    //   arr.push(`stroke=${color}`)
    // }
    // c: children
    if (item.c) {
      arr.push('>')
      arr.push(createPathHtml(item.c))
      arr.push(`</${item.t}>`)
    } else {
      arr.push('/>')
    }
    prev.push(arr.join(' '))
    return prev
  }, [])
  return result.join('')
}

function fmtCamelCase(str) {
  return str.replace(/[A-Z]/g, (match) => {
    return '-' + match.toLowerCase()
  })
}

export { createPathHtml }
