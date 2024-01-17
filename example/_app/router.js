/**
 * Created by Capricorncd.
 * Date: 2020-07-31 10:52
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Avatar from '../avatar/index'
import Breadcrumbs from '../breadcrumbs/index'
import Button from '../button/index'
import Calendar from '../calendar/index'
import Checkbox from '../checkbox/index'
import CodeInput from '../code-input/index'
import DatePicker from '../date-picker/index'
import Dialog from '../dialog/index'
import Form from '../form/index'
import Icon from '../icon/index'
import Image from '../image/index'
import ImageProcessor from '../image-processor/index'
import Index from '../index/index.vue'
import Input from '../input/index'
import Message from '../message/index'
import MessageBox from '../message-box/index'
import MonthPicker from '../month-picker/index'
import MultiSelect from '../multi-select/index'
import Pagination from '../pagination/index'
import Progress from '../progress/index'
import Radio from '../radio/index'
import Row from '../row/index'
import Select from '../select/index'
import Switch from '../switch/index'
import Table from '../table/index'
import TableExperiment from '../table-experiment/index'
import Tabs from '../tabs/index'
import Tag from '../tag/index'
import Text from '../text/index'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: '/avatar', component: Avatar },
    { path: '/breadcrumbs', component: Breadcrumbs },
    { path: '/button', component: Button },
    { path: '/calendar', component: Calendar },
    { path: '/checkbox', component: Checkbox },
    { path: '/code-input', component: CodeInput },
    { path: '/date-picker', component: DatePicker },
    { path: '/dialog', component: Dialog },
    { path: '/form', component: Form },
    { path: '/icon', component: Icon },
    { path: '/image', component: Image },
    { path: '/image-processor', component: ImageProcessor },
    { path: '/input', component: Input },
    { path: '/message', component: Message },
    { path: '/message-box', component: MessageBox },
    { path: '/month-picker', component: MonthPicker },
    { path: '/multi-select', component: MultiSelect },
    { path: '/pagination', component: Pagination },
    { path: '/progress', component: Progress },
    { path: '/radio', component: Radio },
    { path: '/row', component: Row },
    { path: '/select', component: Select },
    { path: '/switch', component: Switch },
    { path: '/table', component: Table },
    { path: '/table-experiment', component: TableExperiment },
    { path: '/tabs', component: Tabs },
    { path: '/tag', component: Tag },
    { path: '/text', component: Text },
  ],
})
