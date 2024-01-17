/**
 * Created by Capricorncd.
 * Date: 2020-09-17 14:37
 */
import {
  BASIC_MASTER_CACHE_KEY,
  BASIC_PREFECTURE_CACHE_KEY,
} from '~/assets/constants'

/**
 * format query.sort object, to array
 * 「顧客IDと顧客名でsort」の場合は「sort=customerCode,lastName」であっています。
 * 昇順・降順の区分については、未指定の場合は昇順(ASC)、マイナスを付けると降順(DESC)となります。
 * 例：顧客IDの昇順、顧客名の降順＝「sort=customerCode,-lastName」
 * {keyword: 'asc', keyword2: 'desc', keyword3: ''}
 * return ['keyword', '-keyword2']
 * @param sortData
 * @returns {[]}
 */
export function fmtSort(sortData) {
  const arr = []
  Object.keys(sortData).forEach((key) => {
    const sort = sortData[key]
    if (sort) {
      arr.push((sort === 'desc' ? '-' : '') + key)
    }
  })
  return arr
}

/**
 * get basic data
 * @param key
 * @param isNeedObject return object {}
 * @returns {*|*[]}
 */
export function getBasicData(key, isNeedObject = false) {
  let result
  // prefecture
  if (key === 'prefectures') {
    result = this.getCache(BASIC_PREFECTURE_CACHE_KEY) || []
  } else {
    // master
    const cache = this.getCache(BASIC_MASTER_CACHE_KEY) || {}
    result = cache[key] || []
  }

  if (isNeedObject) {
    const obj = {}
    result.forEach(({ text, value }) => {
      obj[value] = text
    })
    return obj
  }
  return result
}

/**
 * clear local basic data
 */
export function clearBasicData() {
  this.removeCache([BASIC_MASTER_CACHE_KEY, BASIC_PREFECTURE_CACHE_KEY])
}
