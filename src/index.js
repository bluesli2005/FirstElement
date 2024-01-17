/**
 * Created by Capricorncd.
 * Date: 2020-07-30 17:26
 */
import FgAvatar from './packages/avatar/index'
import FgBreadcrumbs from './packages/breadcrumbs/index'
import FgBreadcrumbsItem from './packages/breadcrumbs-item/index'
import FgButton from './packages/button/index'
import FgCalendar from './packages/calendar/index'
import FgCheckbox from './packages/checkbox/index'
import FgCodeInput from './packages/code-input/index'
import FgCustomerRank from './packages/customer-rank/index'
import FgCol from './packages/row/col'
import FgDatePicker from './packages/date-picker/index'
import FgDialog from './packages/dialog/index'
import FgForm from './packages/form/index'
import FgFormItem from './packages/form-item/index'
import FgIcon from './packages/icon/index'
import FgImage from './packages/image/index'
import FgImageProcessor from './packages/image-processor/index'
import FgInput from './packages/input/index'
import FgLoading from './packages/loading/index'
import FgMessage from './packages/message/index'
import FgMessageBox from './packages/message-box/index'
import FgMonthPicker from './packages/month-picker/index'
import FgMultiSelect from './packages/multi-select/index'
import FgPagination from './packages/pagination/index'
import FgProgress from './packages/progress/index'
import FgRadio from './packages/radio/index'
import FgRadioGroup from './packages/radio-group/index'
import FgRow from './packages/row/index'
import FgSelect from './packages/select/index'
import FgSwitch from './packages/switch/index'
import FgTable from './packages/table/index'
import FgTableColumn from './packages/table-column/index'
import FgTableExperiment from './packages/table-experiment/index'
import FgTabs from './packages/tabs/index'
import FgTabsItem from './packages/tabs-item/index'
import FgTag from './packages/tag/index'
import FgText from './packages/text/index'
import FgCheckboxReverse from './packages/checkbox-reverse/index'

import themeBlue from './plugins/theme-blue'
import themeRed from './plugins/theme-red'
import * as libs from './libs/index'

import './assets/scss/common.scss'

const components = [
  FgAvatar,
  FgBreadcrumbs,
  FgBreadcrumbsItem,
  FgButton,
  FgCalendar,
  FgCheckbox,
  FgCodeInput,
  FgCustomerRank,
  FgCol,
  FgDatePicker,
  FgDialog,
  FgForm,
  FgFormItem,
  FgIcon,
  FgImage,
  FgImageProcessor,
  FgInput,
  FgLoading,
  FgMessage,
  // FgMessageBox,
  FgMonthPicker,
  FgMultiSelect,
  FgPagination,
  FgProgress,
  FgRadio,
  FgRadioGroup,
  FgRow,
  FgSelect,
  FgSwitch,
  FgTable,
  FgTableColumn,
  FgTableExperiment,
  FgTabs,
  FgTabsItem,
  FgTag,
  FgText,
  FgCheckboxReverse,
]

const colors = {
  blue: themeBlue,
  red: themeRed,
}

function install(Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })

  const $ui = {
    project: 'fg',
    ...libs,
    ...opts,
  }

  Vue.prototype.$ui = $ui
  Vue.prototype.$firstGroupUI = $ui

  Vue.prototype.$colors = colors[opts.theme] || themeBlue
  Vue.prototype.$alert = FgMessageBox.alert
  Vue.prototype.$confirm = FgMessageBox.confirm

  Vue.prototype.$success = FgMessageBox.success
  Vue.prototype.$error = FgMessageBox.error
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const exportItems = {
  version: '__VERSION__',
  install,
  FgMessageBox,
}

components.forEach((component) => {
  exportItems[component.name] = component
})

export default exportItems
