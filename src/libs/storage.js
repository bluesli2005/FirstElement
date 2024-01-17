/**
 * Created by Capricorncd.
 * Date: 2020-07-20 11:54
 */
import { isArray } from './check'

export function setCache(key, value) {
  localStorage.setItem(
    this.project + '_' + key,
    typeof value === 'string' ? value : JSON.stringify(value)
  )
}

export function getCache(key) {
  let result = localStorage.getItem(this.project + '_' + key)
  try {
    result = JSON.parse(result)
  } catch (e) {}
  return result
}

export function removeCache(keys) {
  if (!keys) return
  if (!isArray(keys)) {
    keys = [keys]
  }
  keys.forEach((key) => {
    localStorage.removeItem(this.project + '_' + key)
  })
}

export function clearCache() {
  localStorage.clear()
}
