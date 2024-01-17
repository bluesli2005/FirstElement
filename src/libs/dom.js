/**
 * Created by Capricorncd.
 * Date: 2020-09-14 16:18
 */
import { isElement } from './check'
import { toHumpStr, toNumber } from './format'

export function getMaxZIndex() {
  const $els = document.getElementsByTagName('*')
  let $el, css, zIndex
  const arr = []
  for (let i = 0; i < $els.length; i++) {
    $el = $els[i]
    if ($el.nodeType !== 1) continue
    css = window.getComputedStyle($el, null)
    if (css.position !== 'static') {
      zIndex = css.zIndex >> 0
      if (zIndex > 0) arr.push(zIndex)
    }
  }
  return arr.length === 0 ? 100 : Math.max.apply(null, arr)
}

/**
 * get style value
 * @param el element
 * @param attr attribute
 * @param isInt return number
 * @returns {null}
 */
export function getStyleValue(el, attr, isInt) {
  if (!isElement(el)) return null
  const css = window.getComputedStyle(el, null)
  let result = null
  if (attr) {
    try {
      result = css[toHumpStr(attr)]
    } catch (e) {}
  } else {
    result = css
  }
  return isInt ? toNumber(result) : result
}

/**
 * reset element z-index
 * @param el
 */
export function resetZIndex(el) {
  if (!el) return
  const zIndex = toNumber(getStyleValue(el, 'z-index'))
  const maxZIndex = getMaxZIndex()
  if (zIndex < maxZIndex) {
    el.style.zIndex = maxZIndex + 1
  }
}

let scrollbarWidth

/**
 * get scroll bar width
 * @returns {number|*}
 */
export function getScrollBarWidth() {
  if (scrollbarWidth > 0) return scrollbarWidth
  const el = document.createElement('div')
  el.style.visibility = 'hidden'
  el.style.width = '100px'
  el.style.height = '100px'
  el.style.overflow = 'scroll'
  document.body.appendChild(el)
  el.innerHTML = '<div style="width: 100%;height: 100px;"></div>'
  scrollbarWidth = 100 - el.querySelector('div').offsetWidth
  el.parentNode.removeChild(el)
  return scrollbarWidth
}

/**
 * get all scroll parent
 * @param el
 * @returns {[]}
 */
export function getScrollParents(el) {
  const arr = []
  let parent = el.parentElement
  let val
  while (parent) {
    val = getStyleValue(parent, 'overflow')
    if (['auto', 'scroll'].includes(val)) {
      arr.push(parent)
    }
    parent = parent.parentElement
  }
  return arr
}
