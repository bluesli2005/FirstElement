/**
 * Created by Capricorncd.
 * Date: 2020-09-15 12:39
 */
import ZxCalendar from 'zx-calendar'
import { isBoolean, isArray, isString, isUndefined } from './check'

/**
 * to number
 * @param a
 * @returns {*}
 */
export function toNumber(a) {
  const n = parseFloat(a)
  return isNaN(n) ? 0 : n
}

/**
 * to hump string
 * @param attr
 * @param spacer
 * @returns {string}
 */
export function toHumpStr(attr, spacer = '-') {
  if (!attr) return ''
  if (typeof attr !== 'string') {
    attr = attr.toString()
  }
  if ('.?*^$'.includes(spacer)) {
    spacer = '\\' + spacer
  }
  const reg = new RegExp(`${spacer}(.)`, 'g')
  return attr
    .toLowerCase()
    .replace(reg, (match, group1) => group1.toUpperCase())
}

/**
 * to two digits
 * @param s
 * @returns {string}
 */
export function toTwoDigits(s) {
  s = s + ''
  return s[1] ? s : '0' + s
}

export function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {}
    for (const prop in source) {
      const value = source[prop]
      if (value !== undefined) {
        target[prop] = value
      }
    }
  }

  return target
}

/**
 * create random string
 * @param prefix
 * @returns {string}
 */
export function createRandomStr(prefix) {
  return prefix + '_' + Math.random().toString().substr(2)
}

/**
 * to comma number type
 * @param value
 * @param keepDecimalPlaces
 * @returns {string|*}
 */
export function toCommaNumber(value, keepDecimalPlaces = false) {
  if (!value) return value
  const arr = value.toString().split('.')
  const integerPartArray = arr[0].split('').reverse()
  const result = []
  for (let i = 0; i < integerPartArray.length; i++) {
    if (i && i % 3 === 0) {
      result.push(',')
    }
    result.push(integerPartArray[i])
  }
  arr[0] = result.reverse().join('')
  return keepDecimalPlaces ? arr.join('.') : arr[0]
}

/**
 * boolean to number
 * @param o
 * @param props
 * @returns {number}
 */
export function booleanToNumber(o, props) {
  if (isBoolean(o)) return +o
  if (!isArray(props)) {
    props = [props]
  }
  Object.keys(o).forEach((key) => {
    if (props.includes(key) && isBoolean(o[key])) {
      o[key] = +o[key]
    }
  })
}

/**
 * all type to null
 * @param o
 * @param props
 * @returns null
 */
export function allTypeToNull(o, props) {
  if (isUndefined(o) || o === '' || o === '0' || o === 0) return null
  if (!isArray(props)) {
    props = [props]
  }
  Object.keys(o).forEach((key) => {
    if (
      props.includes(key) &&
      (o[key] === '' || o[key] === '0' || o[key] === 0 || isUndefined(o[key]))
    ) {
      o[key] = null
    }
  })
}

export function formatDate(str, fmt) {
  return ZxCalendar.prototype.formatDate(str, fmt, {
    weeks: ['日', '月', '火', '水', '木', '金', '土'],
  })
}

export function toDate(str) {
  try {
    return ZxCalendar.prototype.toDate(str)
  } catch (e) {
    return null
  }
}

const MIME_TYPES = {
  pdf: 'application',
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  pneg: 'image',
}

/**
 * get file type
 * @param url
 * @param isMimeType
 * @returns {string}
 */
export function getFileType(url, isMimeType) {
  let result = ''
  if (isString(url)) {
    result = url.toLowerCase().split('?')[0].split('.').pop()
    if (isMimeType) {
      result = MIME_TYPES[result] + '/' + result
    }
  }
  return result
}
