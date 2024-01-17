/**
 * Created by Capricorncd.
 * Date: 2020-08-20 15:14
 */
import Text from './src/index'

Text.install = function (Vue) {
  Vue.component(Text.name, Text)
}

export default Text
