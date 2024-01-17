/**
 * Created by Capricorncd.
 * Date: 2020-07-30 17:57
 */
import Button from './src/index'

Button.install = function (Vue) {
  Vue.component(Button.name, Button)
}

export default Button
