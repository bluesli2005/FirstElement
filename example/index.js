/**
 * Created by Capricorncd.
 * Date: 2020-07-31 10:12
 */
import Vue from 'vue'
import FirstGroupUI from '../src/index'
import router from './_app/router'
import App from './App'
import './_app/index.scss'

Vue.use(FirstGroupUI, {
  theme: 'blue',
})

window.$app = new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
})

export default FirstGroupUI
