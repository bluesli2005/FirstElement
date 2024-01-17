/**
 * Created by Capricorncd.
 * Date: 2020-08-31 12:53
 */
/**
 * get parent component
 * @param fgParentName
 * @returns {Vue}
 */
export function getParentComponent(fgParentName) {
  let parent = this.$parent
  while (parent) {
    if (parent.$options.name !== fgParentName) {
      parent = parent.$parent
    } else {
      return parent
    }
  }
  return parent
}
