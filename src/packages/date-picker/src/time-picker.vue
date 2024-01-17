<template>
  <div class="fg-time-picker">
    <fg-row gutter="10">
      <fg-col span="12">
        <fg-select
          v-model="hour"
          size="small"
          placeholder="時"
          :items="hours"
          unit=":"
          clearable
          @click="clickSelect"
        ></fg-select>
      </fg-col>
      <fg-col span="12">
        <fg-select
          v-model="minute"
          size="small"
          placeholder="分"
          :items="minutes"
          clearable
          @click="clickSelect"
        ></fg-select>
      </fg-col>
      <!--      <fg-col span="8">-->
      <!--        <fg-select-->
      <!--          v-model="second"-->
      <!--          size="small"-->
      <!--          placeholder="秒"-->
      <!--          :items="seconds"-->
      <!--          filterable-->
      <!--          clearable-->
      <!--          @click="clickSelect"-->
      <!--        ></fg-select>-->
      <!--      </fg-col>-->
    </fg-row>
  </div>
</template>

<script>
import { toTwoDigits } from '../../../libs/index'
export default {
  name: 'FgTimePicker',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    const arr = this.value.split(':')
    return {
      hour: arr[0],
      minute: arr[1],
      second: arr[2],
      hours: createArr(24),
      minutes: createArr(60),
      seconds: createArr(60),
    }
  },
  computed: {
    selectValue() {
      return [this.hour || '00', this.minute || '00', this.second || '00']
    },
  },
  watch: {
    selectValue(val) {
      if (this.value !== val.join(':')) {
        this.$emit('change', val)
      }
    },
    value(val) {
      this.fmtValue(val)
    },
  },
  methods: {
    fmtValue(val) {
      const arr = val.split(':')
      this.hour = arr[0] || '00'
      this.minute = arr[1] || '00'
      this.second = arr[2] || '00'
    },
    clickSelect(e) {
      e.stopPropagation()
    },
  },
}

function createArr(len) {
  const arr = []
  let val
  for (let i = 0; i < len; i++) {
    val = toTwoDigits(i)
    arr.push({
      text: val,
      value: val,
    })
  }
  return arr
}
</script>

<style lang="scss">
.fg-time-picker {
  width: 145px;
  .fg-input {
    .suffix-outside-wrapper {
      right: -4px;
    }
  }
}
</style>
