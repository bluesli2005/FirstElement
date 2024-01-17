/**
 * Created by Capricorncd.
 * Date: 2020-09-14 18:23
 */
import { hasOwn } from './check'
/**
 * create url query
 * @param params
 * @param fields
 * @returns {string}
 */
export function createUrlQuery(params, fields) {
  if (!Array.isArray(fields)) {
    fields = Object.keys(params)
  }
  const str = fields.reduce((prev, key) => {
    if (hasOwn(params, key)) {
      prev += `${key}=${params[key]}&`
    }
    return prev
  }, '?')
  return str.substr(0, str.length - 1)
}
