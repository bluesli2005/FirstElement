/**
 * Created by Capricorncd.
 * Date: 2020-09-14 16:17
 */
import { getCache, setCache, removeCache, clearCache } from './storage'
import { logStr, log, warn, error } from './console'
import {
  getMaxZIndex,
  getStyleValue,
  getScrollBarWidth,
  resetZIndex,
  getScrollParents,
} from './dom'
import {
  hasOwn,
  isArray,
  isBoolean,
  isElement,
  isFunction,
  isObject,
  isUndefined,
  isString,
  isNumber,
  isNumberLike,
} from './check'
import { createUrlQuery } from './url'
import { slice } from './array'
import { getParentComponent } from './component'
import { windowDispatcher } from './events'
import {
  allTypeToNull,
  booleanToNumber,
  formatDate,
  toDate,
  toNumber,
  toTwoDigits,
  toHumpStr,
  toCommaNumber,
  createRandomStr,
  merge,
  getFileType,
} from './format'
import { fmtSort, clearBasicData, getBasicData } from './extends/index'
import { formSyncValidator } from './extends/validate'

/**
 * init app
 * @param project
 */
function init(project = 'fg') {
  this.project = project
}

export {
  allTypeToNull,
  booleanToNumber,
  clearBasicData,
  clearCache,
  createRandomStr,
  createUrlQuery,
  error,
  formatDate,
  formSyncValidator,
  fmtSort,
  getBasicData,
  getCache,
  getFileType,
  getMaxZIndex,
  getParentComponent,
  getStyleValue,
  getScrollBarWidth,
  getScrollParents,
  hasOwn,
  init,
  log,
  logStr,
  merge,
  isArray,
  isBoolean,
  isElement,
  isFunction,
  isNumber,
  isNumberLike,
  isObject,
  isString,
  isUndefined,
  removeCache,
  resetZIndex,
  setCache,
  slice,
  toCommaNumber,
  toDate,
  toNumber,
  toTwoDigits,
  toHumpStr,
  warn,
  windowDispatcher,
}
