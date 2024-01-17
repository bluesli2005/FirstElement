<template>
  <fg-calendar
    :value="inputValue"
    :placeholder="placeholder"
    :size="size"
    :popup-class="popupClass"
    :popup-position="popupPosition"
    :show-before-dash="showBeforeDash"
    :show-after-dash="showAfterDash"
    :dash-offset="dashOffset"
    :disabled="disabled"
    :inline="inline"
    :writable="writable"
    :clearable="clearable"
    :width="width"
    class="fg-date-picker"
    is-time-picker
    :value-format="valueFormat"
    :value-formatter="calendarValueFormat"
    :is-error="isError"
    :error-message="errorMessage"
    :error-message-nowrap="errorMessageNowrap"
    :default-view="defaultView"
    @calendar="(that) => (calendar = that)"
    @error="$emit('error')"
    @clear="handleClear"
  >
    <template v-slot:time-picker>
      <div class="fg-calendar__time-wrapper" @click="clickTimeWrapper">
        <TimePicker :value="time" @change="timePickerChange" />
        <div class="btn-group">
          <fg-button size="mini" border width="80px" @click="cancel"
            >キャンセル</fg-button
          >
          <fg-button
            size="mini"
            type="primary"
            width="52px"
            :disabled="!ymd || !time"
            @click="confirm"
            >選択</fg-button
          >
        </div>
      </div>
    </template>
  </fg-calendar>
</template>

<script>
import { formEmitterMixin } from '../../../mixins/form-emitter'
import TimePicker from './time-picker'

export default {
  name: 'FgDatePicker',
  components: {
    TimePicker,
  },
  mixins: [formEmitterMixin],
  props: {
    value: {
      type: [String, Number, Date],
      default: '',
    },
    placeholder: {
      type: String,
      default: '選択してください',
    },
    size: {
      type: String,
      default: 'regular',
    },
    clearable: Boolean,
    writable: Boolean,
    disabled: Boolean,
    inline: Boolean,
    showBeforeDash: Boolean,
    showAfterDash: Boolean,
    popupClass: {
      type: String,
      default: '',
    },
    popupPosition: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'yyyy/MM/dd hh:mm:ss',
    },
    valueFormat: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: '',
    },
    isError: Boolean,
    errorMessageNowrap: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    defaultView: {
      type: String,
      default: '',
    },
    dashOffset: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      popVisible: false,
      calendar: null,
      date: null,
      ymd: '',
      time: '',
    }
  },
  computed: {
    inputValue() {
      return this.date ? this.calendar.formatDate(this.date, this.format) : ''
    },
  },
  watch: {
    date(val) {
      const format = this.valueFormat || this.format
      const res = val ? this.calendar.formatDate(val, format) : ''
      this.$emit('input', res)
      this.$emit('change', res, val)
      this.emitFormChange()
    },
    value(val) {
      this.resetDateTime(val)
    },
    calendar() {
      this.resetDateTime(this.value)
    },
  },
  created() {
    this.resetDateTime(this.value)
  },
  methods: {
    resetDateTime(val) {
      if (!this.calendar) return
      const { toDate, formatDate } = this.calendar
      const date = toDate(val)
      if ((!date && !this.date) || this.date === date) return
      if (!date) {
        this.date = null
        this.ymd = ''
        this.time = '00:00:00'
      } else {
        this.date = date
        this.ymd = formatDate(date, 'yyyy/MM/dd')
        this.time = formatDate(date, 'hh:mm:ss')
      }
      this.calendar.setDate(this.ymd)
    },
    clickTimeWrapper(e) {
      e.stopPropagation()
    },
    timePickerChange(val) {
      this.time = val.join(':')
    },
    cancel() {
      this.calendar.hidePop()
    },
    confirm() {
      this.date = this.calendar.formatDate(
        [this.ymd, this.time].join(' '),
        this.format
      )
      this.calendar.hidePop()
    },
    calendarValueFormat(val) {
      this.ymd = val ? this.calendar.formatDate(val, 'yyyy/MM/dd') : ''
      return this.inputValue
    },
    handleClear() {
      this.date = null
      this.ymd = ''
      this.time = '00:00:00'
    },
  },
}
</script>

<style lang="scss">
.fg-date-picker {
}

.is-time-picker.fg-calendar-pop-wrapper {
  display: flex;
  .fg-calendar__date-wrapper {
    flex: 0 0 320px;
  }
  .fg-calendar__time-wrapper {
    padding: 20px;
    position: relative;
    &:before {
      position: absolute;
      top: 5%;
      left: 0;
      height: 90%;
      width: 1px;
      background: $--color-border;
      content: '';
    }
  }
  .btn-group {
    position: absolute;
    right: 20px;
    bottom: 0;
    display: flex;
    align-items: center;
    height: 50px;
    .fg-button {
      margin-left: 10px;
    }
  }
}
</style>
