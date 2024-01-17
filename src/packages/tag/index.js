/**
 * Created by Capricorncd.
 * Date: 2020-07-30 17:57
 */
import Tag from './src/index'

Tag.install = function (Vue) {
  Vue.component(Tag.name, Tag)
}

export default Tag
