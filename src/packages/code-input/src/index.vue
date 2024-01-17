<template>
  <div class="fg-code-input" :style="style" @click="handleClick">
    <input
      :id="inputId"
      ref="input"
      v-model="text"
      type="text"
      class="__input"
      :disabled="isDisabled"
      :maxlength="length"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
    <div class="__show">
      <label
        v-for="(item, i) in length"
        :key="i"
        :for="inputId"
        :class="{ active: isFocus === true && i === currentIndex }"
        :style="labelStyle"
        v-text="list[i]"
      >
      </label>
    </div>
  </div>
</template>

<script>
import { isNumberLike } from '../../../libs/index'

export default {
  name: 'FgCodeInput',
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    length: {
      type: Number,
      default: 6,
    },
    width: {
      type: [Number, String],
      default: 0,
    },
    itemWidth: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      inputId: `code_${+new Date()}`,
      text: this.value,
      isDisabled: false,
      isFocus: false,
    }
  },
  computed: {
    currentIndex() {
      return this.text.length
    },
    list() {
      const arr = new Array(this.length)
      if (this.text) {
        this.text.split('').forEach((s, i) => {
          if (i < this.length) {
            arr[i] = s
          }
        })
      }
      return arr
    },
    style() {
      const ret = {}
      if (this.width) {
        ret.width = this.width + (isNumberLike(this.width) ? 'px' : '')
      }
      return ret
    },
    labelStyle() {
      const ret = {}
      if (this.itemWidth) {
        ret.width = this.itemWidth + (isNumberLike(this.itemWidth) ? 'px' : '')
      }
      return ret
    },
  },
  watch: {
    text(val) {
      this.$emit('input', val)
      this.$emit('change', this.text)
    },
    value(val) {
      if (this.text !== val) {
        this.text = val
      }
    },
  },
  methods: {
    handleChange(e) {
      let value = e.target.value
      if (value && value.length >= this.length) {
        this.isDisabled = true
        value = value.substr(0, this.length)
      }
      this.text = value
    },
    handleClick() {
      this.isDisabled = false
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss">
$height: 60px;
$boxWidth: 40px;
.fg-code-input {
  position: relative;
  overflow: hidden;
  input {
    outline: none;
  }
  .__input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    background: transparent;
    opacity: 0;
    margin-left: -100%;
    -webkit-tap-highlight-color: transparent;
  }
  .__show {
    display: flex;
    align-items: center;
    justify-content: space-between;
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $height;
      width: $boxWidth;
      background: $--color-background;
      overflow: hidden;
      text-align: center;
      border: 0;
      border-bottom: 2px solid $--color-primary-active;
      font-size: 24px;
      color: $--color-primary-active;
    }
  }
  .active:after {
    content: '';
    display: inline-block;
    height: 40%;
    width: 2px;
    background: $--color-primary-active;
    animation: 0.8s animate infinite;
  }
  @keyframes animate {
    0% {
      opacity: 0;
    }
    49% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
