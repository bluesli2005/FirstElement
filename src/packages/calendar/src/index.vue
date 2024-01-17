<template>
  <div ref="wrapper" class="fg-calendar" :style="elStyle">
    <Input
      :value="inputValue"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :readonly="!writable"
      :size="size"
      :width="width"
      :offset-right="clearable ? 0 : 23"
      :calendar-icon="isTimePicker ? 'clock' : 'calendar'"
      :is-error="isError"
      :error-message-nowrap="errorMessageNowrap"
      :error-message="errorMessage"
      @click="handleToggle"
      @change="inputChange"
      @clear="$emit('clear')"
    />
    <fg-icon
      v-if="showBeforeDash"
      name="dash"
      :color="dashColor"
      class="__dash __before"
      :style="dashStyle"
    ></fg-icon>
    <fg-icon
      v-if="showAfterDash"
      name="dash"
      :color="dashColor"
      class="__dash __after"
      :style="dashStyle"
    ></fg-icon>
    <Popup
      ref="popup"
      v-model="popVisible"
      :wrapper="wrapper"
      :class="[
        'fg-calendar-pop-wrapper',
        popupClass,
        {
          'is-time-picker': isTimePicker,
        },
      ]"
      :position="popupPosition"
      auto-width
    >
      <div ref="pop" class="fg-calendar__date-wrapper">
        <ZxVueCalendar
          lang="jp"
          :value="currentDate"
          :date-range="dateRange"
          :mode="selectMode"
          :type="type"
          :format="formatter"
          :title-formatter="titleFormatter"
          :item-suffix="itemSuffix"
          @cancel="popVisible = false"
          @error="calendarError"
          @change="calendarChange"
          @instance="getCalendar"
        />
      </div>
      <slot name="time-picker"></slot>
    </Popup>
    <transition name="fg-slide-in-top">
      <div v-if="isError" class="error-message">{{ errorMessage }}</div>
    </transition>
  </div>
</template>

<script>
import { ZxVueCalendar } from 'zx-calendar/lib/vue-calendar'
import Input from '../../input/index'
import Popup from '../../popup/index'
import { isFunction, isNumberLike } from '../../../libs/index'
import { formEmitterMixin } from '../../../mixins/form-emitter'
import {
  DEF_ITEM_SUFFIXES,
  DEF_TITLE_FORMATTERS,
  DEF_VALUE_FORMATTERS,
} from './constants'

export default {
  name: 'FgCalendar',
  components: {
    Input,
    Popup,
    ZxVueCalendar,
  },
  mixins: [formEmitterMixin],
  props: {
    value: {
      type: [String, Array, Number, Date],
      default: '',
    },
    placeholder: {
      type: String,
      default: '選択',
    },
    size: {
      type: String,
      default: 'regular',
    },
    clearable: Boolean,
    writable: Boolean,
    disabled: Boolean,
    inline: Boolean,
    type: {
      type: String,
      default: 'date',
    },
    showBeforeDash: Boolean,
    showAfterDash: Boolean,
    dashOffset: {
      type: Number,
      default: undefined,
    },
    width: {
      type: [String, Number],
      default: '',
    },
    popupClass: {
      type: String,
      default: '',
    },
    popupPosition: {
      type: String,
      default: '',
    },
    dateRange: {
      type: Array,
      default() {
        return []
      },
    },
    format: {
      type: String,
      default: '',
    },
    selectMode: {
      type: String,
      default: 'single',
    },
    isTimePicker: Boolean,
    valueFormatter: {
      type: Function,
      default: undefined,
    },
    valueFormat: {
      type: String,
      default: '',
    },
    isError: Boolean,
    errorMessageNowrap: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    defaultView: {
      type: [String, Number, Date],
      default: '',
    },
  },
  data() {
    return {
      popVisible: false,
      currentDate: this.valueFormat ? null : this.value,
      calendar: null,
      dashColor: this.$colors.primary,
    }
  },
  computed: {
    wrapper() {
      return this.$refs.wrapper
    },
    formatter() {
      return this.format || DEF_VALUE_FORMATTERS[this.type]
    },
    titleFormatter() {
      return DEF_TITLE_FORMATTERS[this.type]
    },
    itemSuffix() {
      return DEF_ITEM_SUFFIXES[this.type]
    },
    inputValue() {
      let currentDate = this.currentDate
      let date
      if (isFunction(this.valueFormatter)) {
        currentDate = this.valueFormatter(currentDate)
      } else if (Array.isArray(currentDate)) {
        currentDate = currentDate
          .map((item) => {
            date = this.toDate(item)
            return date ? this.formatDate(date, this.formatter) : ''
          })
          .join(' ~ ')
      } else {
        date = this.toDate(currentDate)
        currentDate = date ? this.formatDate(date, this.formatter) : ''
      }

      return currentDate
    },
    elStyle() {
      const ret = {}
      if (this.width) {
        ret.width = this.width + (isNumberLike(this.width) ? 'px' : '')
      }
      if (this.inline) {
        ret.display = 'inline-flex'
      }
      return ret
    },
    dashStyle() {
      const ret = {}
      if (typeof this.dashOffset !== 'undefined') {
        ret.right =
          this.dashOffset + (isNumberLike(this.dashOffset) ? 'px' : '')
      }
      return ret
    },
  },
  watch: {
    currentDate(val) {
      const format = this.valueFormat || this.formatter
      let res, date
      if (Array.isArray(val)) {
        res = []
        val.forEach((item) => {
          date = this.toDate(item)
          if (date) {
            res.push(this.formatDate(date, format))
          }
        })
      } else {
        date = this.toDate(val)
        res = date ? this.formatDate(date, format) : ''
      }
      // フォマット後の値をチェックする
      if (
        res === this.value ||
        JSON.stringify(res) === JSON.stringify(this.value)
      )
        return

      this.$emit('input', res)
      this.$emit('change', res)
      this.emitFormChange()
    },
    value(val) {
      if (
        this.currentDate !== val &&
        JSON.stringify(this.currentDate) !== JSON.stringify(val)
      ) {
        this.currentDate = val
        this.calendar.setDate(val)
      }
    },
    dateRange(val) {
      if (Array.isArray(val)) {
        this.calendar.setRange(val[0], val[1])
      } else {
        this.calendar.setRange()
      }
    },
  },
  mounted() {
    if (this.valueFormat) {
      this.currentDate = this.formatDate(this.value, this.valueFormat)
    }
  },
  methods: {
    getCalendar(calendar) {
      this.calendar = calendar
      // initial defaultView
      if (!this.value && this.defaultView) {
        calendar.setCurrentDate(this.defaultView)
      }
      this.$emit('calendar', this)
    },
    formatDate(str, fmt) {
      if (!this.calendar) return str
      return this.calendar.formatDate(str, fmt)
    },
    toDate(str) {
      if (!this.calendar) return null
      return this.calendar.toDate(str)
    },
    setDate(str) {
      if (!this.calendar) return null
      return this.calendar.setDate(str)
    },
    handleToggle() {
      if (this.disabled) return
      if (!this.popVisible) {
        let timer = setTimeout(() => {
          this.popVisible = true
          clearTimeout(timer)
          timer = null
        }, 0)
      } else {
        this.popVisible = false
      }
    },
    formatValue(list) {
      const arr = []
      switch (this.selectMode) {
        case 'multiple':
        case 'range':
          /* eslint-disable no-case-declarations */
          let date
          list.forEach((item) => {
            date = this.fmtDate(item)
            if (date) {
              arr.push(date)
            }
          })
          break
        default:
          return list[0] ? this.fmtDate(list[0]) : null
      }
      return arr
    },
    fmtDate(item) {
      if (!item) return null
      return this.calendar.formatDate(item.date, this.formatter)
    },
    inputChange(val) {
      const date = this.calendar.toDate(val)
      this.currentDate = date
        ? this.calendar.formatDate(date, this.formatter)
        : ''
      this.calendar.setDate(date)
    },
    hidePop() {
      this.popVisible = false
    },
    calendarError(err) {
      this.$emit('error', err)
    },
    calendarChange(res, original) {
      this.currentDate = this.formatValue(original)
      if (!this.isTimePicker) {
        // hide popup
        this.popVisible = false
      }
    },
  },
}
</script>

<style lang="scss">
.fg-calendar {
  position: relative;
  .__dash {
    display: block;
    position: absolute;
    z-index: 1;
    top: 50%;
    margin-top: -5px;
    width: 10px;
    height: 10px;
    &.__before {
      left: -5px;
      transform: translateX(-100%);
    }
    &.__after {
      right: -5px;
      transform: translateX(100%);
    }
  }
}

.fg-calendar-pop-wrapper {
  color: $--color-primary;
  // overflow: hidden;
  .zx-calendar {
    width: 320px;
    .zx-calendar-header-wrapper {
      .__title-wrapper {
        font-weight: 600;
      }
      .__l,
      .__r {
        button {
          &:hover {
            i {
              border-color: $--color-primary-active;
            }
          }
          &:active {
            i {
              border-color: $--color-primary-hover;
            }
          }
        }
      }
    }
    .zx-calendar-body-wrapper {
      .__item {
        .__text {
          font-size: $--font-size-12;
          .__suffix {
            font-size: $--font-size-12;
          }
        }
        &.is-selected {
          .__inner {
            .__text {
              background: $--color-primary-active;
            }
          }
        }
      }
    }
    &.mode-is-range {
      .zx-calendar-body-wrapper {
        .__item {
          &.is-selected {
            .__inner {
              .__text {
                background: none;
              }
            }
          }
          &.is-range-first,
          &.is-range-last,
          &.is-range-first-last,
          &.is-range-temp {
            .__inner {
              .__text {
                background: $--color-primary-active;
              }
            }
          }
        }
      }
    }
    .zx-calendar-header-wrapper {
      button {
        &:hover,
        &:active {
          &:before,
          &:after {
            border-color: $--color-primary-active !important;
          }
        }
      }
    }
    .zx-calender-footer-wrapper {
      button {
        font-size: $--font-size-10 !important;
        &.__confirm-button {
          background: $--color-primary-active;
        }
      }
    }
  }
}
</style>
