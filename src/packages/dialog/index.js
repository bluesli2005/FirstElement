/**
 * Created by Capricorncd.
 * Date: 2020-07-30 17:57
 */
import FgDialog from './src/index'

FgDialog.install = function (Vue) {
  Vue.component(FgDialog.name, FgDialog)
}

export default FgDialog
