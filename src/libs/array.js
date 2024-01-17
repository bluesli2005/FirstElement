/**
 * Created by Capricorncd.
 * Date: 2020-09-14 16:18
 */
export function slice(o, index = 0) {
  return Array.prototype.slice.call(o, index)
}
