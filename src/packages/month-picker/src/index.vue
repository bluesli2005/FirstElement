<template>
  <div class="fg-month-picker">
    <div class="fg-month-picker-wrapper">
      <button
        :class="isStartDate() ? '__disable' : ''"
        @click="changeMonth('prev')"
      >
        <fg-icon name="arrow-left"></fg-icon>
      </button>
      <span class="context" @click="handleToggle"
        >{{ current.year }}年{{ current.month }}月</span
      >
      <button
        :class="isEndDate() ? '__disable' : ''"
        @click="changeMonth('next')"
      >
        <fg-icon name="arrow-right"></fg-icon>
      </button>
    </div>
    <Popup
      ref="pop"
      v-model="popVisible"
      :wrapper="wrapper"
      :popup-class="popupClass"
      class="fg-calendar-pop-wrapper"
      auto-width
    ></Popup>
  </div>
</template>

<script>
import ZxCalendar from 'zx-calendar'
import Popup from '../../popup/index'
const DEF_TITLE_FORMATTERS = {
  date: 'yyyy年MM月',
  month: 'yyyy年',
  year: 'yyyy年-yyyy年',
}

const DEF_ITEM_SUFFIXES = {
  date: '',
  month: '月',
  year: '年',
}

export default {
  name: 'FgMonthPicker',
  components: {
    Popup,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'month',
    },
    range: {
      type: Number,
      default: 36,
    },
    popupClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      popVisible: false,
      current: {
        year: Number(this.value.slice(0, 4)),
        month: Number(this.value.slice(4, 6)),
      },
      dateRange: {},
    }
  },
  computed: {
    wrapper() {
      return this.$refs.wrapper
    },
  },
  watch: {
    current: {
      deep: true,
      handler(val) {
        this.calendar.setDate(this.fmtValBeforeSetDate(val))
        this.$emit('input', this.toStringCurrentMonth(val))
      },
    },
    // value(val) {
    //   if (this.current.year !== val.year || this.current.year !== val.month) {
    //     this.current = this.val
    //   }
    // },
  },
  mounted() {
    this.setDateRange(this.current, this.range)
    this.$nextTick(() => {
      const config = {
        el: this.$refs.pop.$el,
        lang: 'jp',
        defaultDate: this.fmtValBeforeSetDate(this.current),
        type: 'month',
        dateRange: this.fmtDateRange(this.dateRange),
        titleFormatter: this.titleFormatter || DEF_TITLE_FORMATTERS[this.type],
        itemSuffix: DEF_ITEM_SUFFIXES[this.type],
        mode: this.selectMode,
      }
      const calendar = new ZxCalendar(config)
      calendar.on('change', (list) => {
        this.current.year = list[0].value.toString().slice(0, 4)
        this.current.month = list[0].value.toString().slice(4, 6)
        this.popVisible = false
      })
      calendar.on('cancel', () => {
        this.popVisible = false
      })
      calendar.on('error', (err) => {
        this.$emit('error', err)
      })
      this.calendar = calendar
    })
  },
  methods: {
    handleToggle() {
      if (!this.popVisible) {
        let timer = setTimeout(() => {
          this.popVisible = true
          clearTimeout(timer)
          timer = null
        }, 0)
      }
    },
    changeMonth(type) {
      if (type === 'next') {
        if (this.isEndDate()) return
        if (Number(this.current.month) + 1 > 12) {
          this.current.year = (Number(this.current.year) + 1).toString()
          this.current.month = '01'
        } else {
          this.current.month =
            Number(this.current.month) + 1 >= 10
              ? (Number(this.current.month) + 1).toString()
              : `0${Number(this.current.month) + 1}`
        }
      } else if (type === 'prev') {
        if (this.isStartDate()) return
        if (Number(this.current.month) === 1) {
          this.current.year = (Number(this.current.year) - 1).toString()
          this.current.month = '12'
        } else {
          this.current.month =
            Number(this.current.month) - 1 >= 10
              ? (Number(this.current.month) - 1).toString()
              : `0${Number(this.current.month - 1)}`
        }
      }
      this.calendar.setDate(this.fmtValBeforeSetDate(this.current))
    },
    fmtValBeforeSetDate(val) {
      if (!val || !val.year || !val.month) return null
      return `${val.year}/${val.month}`
    },
    setDateRange(val, range) {
      if (!val) return val
      if (!range) return range
      const month = val.month
      const year = val.year
      const rangeYear = Number(parseInt(range / 12))
      const rangeMonth = Math.round(range % 12)
      let startMonth, startYear, endMonth, endYear
      if (month - rangeMonth <= 0) {
        startMonth = month + 12 - rangeMonth
        startYear = year - Math.max(0, rangeYear - 1)
      } else {
        startMonth = month - rangeMonth
        startYear = year - rangeYear
      }

      if (month + rangeMonth > 12) {
        endMonth = month + rangeMonth - 12
        endYear = year + rangeYear + 1
      } else {
        endMonth = month + rangeMonth
        endYear = year + rangeYear
      }
      this.dateRange = { startYear, startMonth, endYear, endMonth }
    },
    isEndDate() {
      return (
        Number(this.current.year) === this.dateRange.endYear &&
        Number(this.current.month) === this.dateRange.endMonth
      )
    },
    isStartDate() {
      return (
        Number(this.current.year) === this.dateRange.startYear &&
        Number(this.current.month) === this.dateRange.startMonth
      )
    },
    fmtDateRange(val) {
      if (!val) return
      const arr = new Array(2)
      if (val.startYear && val.startMonth) {
        arr[0] = `${val.startYear}/${val.startMonth}`
      }
      if (val.endYear && val.endMonth) {
        arr[1] = `${val.endYear}/${val.endMonth}`
      }
      return arr
    },
    fmtCurrentMonth(val) {
      if (!val) return
      const __obj = {}
      __obj.year = val.slice(0, 4)
      __obj.month = val.slice(4, 6)
      return __obj
    },
    toStringCurrentMonth(val) {
      if (!val) return
      return val.year.toString() + val.month.toString()
    },
  },
}
</script>

<style lang="scss">
.fg-month-picker {
  display: inline-flex;
  position: relative;

  &-wrapper {
    display: flex;
    align-items: center;
  }

  .fg-icon {
    cursor: pointer;
  }
  .context {
    margin: 0 30px;
  }

  button {
    width: 22px;
    height: 22px;
    cursor: pointer;
    border: none;
    background: none;
    outline: none;
    &.__disable {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
