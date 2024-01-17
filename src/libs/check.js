/**
 * Created by Capricorncd.
 * Date: 2020-09-14 16:18
 */
export function hasOwn(o, attr) {
  return Object.prototype.hasOwnProperty.call(o, attr)
}

/**
 * is number
 * @param str
 * @returns {boolean}
 */
export function isNumber(str) {
  return typeof str === 'number'
}

/**
 * is number like
 * @param str
 * @returns {boolean}
 */
export function isNumberLike(str) {
  return /^[-+]?\d+\.?\d*$/.test(str)
}

export function isUndefined(o) {
  return typeof o === 'undefined'
}

export function isString(s) {
  return typeof s === 'string'
}

export function isFunction(fn) {
  return typeof fn === 'function'
}

export function isElement(obj) {
  return !!(obj && obj.nodeType === 1)
}

export function isArray(arr) {
  return Array.isArray(arr)
}

export function isBoolean(b) {
  return typeof b === 'boolean'
}

export function isObject(o) {
  return o && typeof o === 'object' && !isArray(o)
}
