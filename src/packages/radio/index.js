/**
 * Created by Capricorncd.
 * Date: 2020-07-30 17:57
 */
import FgRadio from './src/index'

FgRadio.install = function (Vue) {
  Vue.component(FgRadio.name, FgRadio)
}

export default FgRadio
