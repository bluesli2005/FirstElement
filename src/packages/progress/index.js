/**
 * Created by Capricorncd.
 * Date: 2020-07-30 17:57
 */
import FgProgress from './src/index'

FgProgress.install = function (Vue) {
  Vue.component(FgProgress.name, FgProgress)
}

export default FgProgress
