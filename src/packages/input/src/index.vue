<template>
  <div
    class="fg-input"
    :class="[
      clearable ? '__clearable' : '',
      disabled ? '' : 'cur',
      !!calendarIcon ? 'is-calendar' : '',
      isNonEmpty ? 'is-non-empty' : '',
      size ? '__' + size : '',
      round ? '__round' : '',
      { 'is-focus': isFocus },
      { 'is-error': isError || _isError },
      { 'is-inline': inline },
    ]"
    :style="elStyle"
    @click="handleClick"
  >
    <textarea
      v-if="type === 'textarea'"
      ref="textarea"
      :rows="rows"
      :placeholder="placeholder"
      :value="viewText"
      :readonly="readonly"
      :disabled="disabled"
      :style="inputStyle"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <input
      v-else
      ref="input"
      :type="type"
      :placeholder="placeholder"
      :value="viewText"
      :readonly="readonly"
      :disabled="disabled"
      :style="inputStyle"
      :maxlength="max"
      :autocomplete="autocomplete"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div ref="l" class="__l">
      <fg-icon
        v-if="prefixIcon"
        :name="prefixIcon"
        :color="prefixIconColor"
        @click="$emit('click:prefix-icon', $event)"
      ></fg-icon>
      <slot name="prefix"></slot>
    </div>
    <div ref="r" class="__r">
      <slot name="suffix"></slot>
      <div v-if="length" class="__length">{{ lengthText }}</div>
      <i class="__clear" @click="handleClear($event)">
        <fg-icon name="plus" :color="clearIconColor"></fg-icon>
      </i>
      <fg-icon
        v-if="suffixIcon"
        :name="suffixIcon"
        :color="suffixIconColor"
        @click="$emit('click:suffix-icon', $event)"
      ></fg-icon>
      <fg-icon
        v-if="!!calendarIcon"
        class="__calendar"
        :name="calendarIcon"
        :color="$colors.primary"
      ></fg-icon>
    </div>
    <div
      v-if="unit || suffixTextOutside"
      class="suffix-outside-wrapper"
      @click="unitClick"
    >
      {{ unit || suffixTextOutside }}
    </div>
    <transition name="fg-zoom-in-top">
      <div
        v-if="errorMessage"
        class="error-message"
        :class="{ __nowrap: errorMessageNowrap }"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import Broadcaster from '../../../assets/js/broadcaster'
import { isFunction, isNumberLike } from '../../../libs/index'
import { formEmitterMixin } from '../../../mixins/form-emitter'
import {
  DEF_PADDING,
  DEF_SIDE_PADDING,
  DEF_CLEAR_ICON_OFFSET,
} from './constants'

export default {
  name: 'FgInput',
  mixins: [Broadcaster, formEmitterMixin],
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: [Number, String],
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 99999999,
    },
    placeholder: {
      type: String,
      default: '入力ください',
    },
    type: {
      type: String,
      default: 'text',
    },
    clearable: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    inline: Boolean,
    calendarIcon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'regular',
    },
    round: Boolean,
    // textarea
    rows: {
      type: [Number, String],
      default: 5,
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    suffixIcon: {
      type: String,
      default: '',
    },
    prefixIconColor: {
      type: String,
      default: '',
    },
    suffixIconColor: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: '',
    },
    suffixTextOutside: {
      type: String,
      default: '',
    },
    unit: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: '',
    },
    cssProperty: {
      type: Object,
      default: () => ({}),
    },
    customFormatter: {
      type: Function,
      default: undefined,
    },
    resizable: Boolean,
    length: {
      type: Number,
      default: 0,
    },
    offsetLeft: {
      type: Number,
      default: 0,
    },
    offsetRight: {
      type: Number,
      default: 0,
    },
    isError: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    errorMessageNowrap: Boolean,
  },
  data() {
    const clearOffset = DEF_CLEAR_ICON_OFFSET[this.size]
    return {
      text: this.value,
      viewText: this.value,
      clearableOffset: this.clearable ? clearOffset : 0,
      isFocus: false,
    }
  },
  computed: {
    input() {
      return this.type === 'textarea' ? this.$refs.textarea : this.$refs.input
    },
    isNonEmpty() {
      return !!this.text
    },
    elStyle() {
      const ret = {}
      if (this.width) {
        ret.width = this.width + (isNumberLike(this.width) ? 'px' : '')
      }
      return ret
    },
    inputStyle() {
      const defaultPadding = DEF_SIDE_PADDING[this.size] || DEF_PADDING
      const lenWidth = this.length > 0 ? this.length.toString().length * 20 : 0
      const ret = {
        paddingLeft: this.offsetLeft + defaultPadding + 'px',
        paddingRight:
          this.offsetRight +
          (this.clearableOffset || defaultPadding) +
          lenWidth +
          'px',
      }
      for (const key in this.cssProperty) {
        const value = this.cssProperty[key]
        ret[key] = value
      }

      if (this.type === 'textarea' && !this.resizable) {
        ret.resize = 'none'
      }
      return ret
    },
    clearIconColor() {
      return this.iconColor || this.$colors.primary
    },
    _isError() {
      let flag = false
      if (this.length) {
        flag = this.text.length > this.length
      }
      // has error message
      if (this.errorMessage) {
        flag = true
      }
      return flag
    },
    lengthText() {
      const len = this.text.length
      return len > 0 ? `${len}/${this.length}` : ''
    },
  },
  watch: {
    text(val) {
      this.viewText = val
      this.$emit('inputId', this.id)
      this.$emit('input', val)
    },
    value(val) {
      if (this.text !== val) {
        this.text = val
        this.dispatch('FgFormItem', 'fg.form.change', [val])
        setTimeout(() => {
          this.viewText = isFunction(this.customFormatter)
            ? this.customFormatter(this.text, this)
            : this.text
        }, 200)
      }
    },
    isFocus(val) {
      this.fmtViewText(val)
    },
  },
  created() {
    this.fmtViewText()
  },
  methods: {
    convertStyle(value) {
      return value + (isNumberLike(value) ? 'px' : '')
    },
    fmtViewText(isFocus) {
      if (isFocus) {
        this.viewText = this.text || ''
      } else {
        this.viewText = isFunction(this.customFormatter)
          ? this.customFormatter(this.text, this)
          : this.text
      }
    },
    handleClear(e) {
      e.stopPropagation()
      this.input.value = ''
      this.text = ''
      this.$nextTick(() => {
        this.input.focus()
      })
      this.$emit('clear', e)
      this.$emit('change', '')
      this.emitFormChange()
    },
    handleClick(e) {
      this.$emit('click', e)
    },
    handleInput() {
      this.text = this.input.value
      if (!this.clearVisible) {
        this.clearVisible = true
      }
    },
    handleChange(e) {
      this.text = e.target.value
      this.$emit('change', this.text)
      this.emitFormChange()
    },
    focus() {
      if (this.readonly || this.disabled) return
      this.$nextTick(() => {
        this.input.focus()
      })
    },
    unitClick(e) {
      e.stopPropagation()
    },
    handleFocus() {
      this.isFocus = true
    },
    handleBlur() {
      this.isFocus = false
    },
  },
}
</script>

<style lang="scss">
@mixin inputSizeMixin($height, $fontSize, $offset) {
  &.__round {
    input {
      border-radius: $height / 2;
    }
  }
  input {
    padding: 0 10px;
    height: $height;
    font-size: $fontSize;
  }
  .suffix-outside-wrapper,
  .__l,
  .__r {
    height: $height;
  }
  .__l {
    left: $offset;
  }
  .__r {
    right: $offset;
  }
  .__length {
    line-height: $height;
    height: $height;
    font-size: $fontSize;
  }
}

.fg-input {
  position: relative;
  font-size: 0;
  display: flex;
  align-items: center;
  &.is-inline {
    display: inline-flex;
  }
  .error-message {
    position: absolute;
    left: 0;
    top: 100%;
    line-height: 1;
    font-size: 10px;
    padding-top: 3px;
    color: $--color-warning;
    &.__nowrap {
      white-space: nowrap;
    }
  }
  input {
    text-overflow: ellipsis;
    overflow: hidden;
    height: $--height-regular;
    line-height: $--font-size-12;
    font-size: $--font-size-12;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  textarea {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    line-height: 1.5;
    font-size: $--font-size-12;
  }
  input,
  textarea {
    display: block;
    margin: 0;
    width: 100%;
    max-width: 100%;
    color: $--color-primary;
    outline: none;
    border: 1px solid $--color-border;
    border-radius: $--border-radius-4;
    padding: 0 16px;
    transition: all 0.2s ease-in-out;
    &::placeholder {
      color: $--color-primary-placeholder;
    }
    &[disabled] {
      color: $--color-primary-placeholder;
    }
  }

  &.is-focus {
    input,
    textarea {
      border-color: $--color-primary-active;
    }
  }

  &.is-error {
    input,
    textarea {
      border-color: $--color-warning;
      color: $--color-warning;
    }
    .__length {
      color: $--color-warning;
    }
  }

  .__l,
  .__r {
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
  }

  .__l {
    left: 10px;
  }

  .__length {
    display: inline-flex;
    align-items: center;
    padding-right: 5px;
    color: $--color-primary-placeholder;
  }

  .suffix-outside-wrapper {
    position: absolute;
    top: 0;
    right: -10px;
    transform: translateX(100%);
    font-size: 12px;
    height: $--height-regular;
    display: flex;
    align-items: center;
    cursor: default;
  }

  .__clear {
    display: none;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    transition: all 0.2s ease-in-out;
    font-size: 0;
    cursor: pointer;
    .fg-icon {
      transform: rotate(45deg);
    }
  }

  .__calendar {
    display: none;
  }

  // is-calendar
  &.is-calendar {
    .__calendar {
      display: block;
    }
  }

  // clearable
  &.__clearable.is-non-empty {
    &:hover {
      .__clear {
        display: flex;
      }
      // fg-select filterable
      .__arrow {
        display: none;
      }
      &.is-calendar {
        .__calendar {
          display: none;
        }
      }
    }
  }

  // size
  &.__regular {
    @include inputSizeMixin($--height-regular, $--font-size-12, 15px);
  }
  &.__medium {
    @include inputSizeMixin($--height-medium, $--font-size-12, 12px);
    .suffix-outside-wrapper {
      right: -8px;
    }
  }
  &.__small {
    @include inputSizeMixin($--height-small, $--font-size-10, 10px);
    .suffix-outside-wrapper {
      right: -6px;
    }
  }
  &.__mini {
    @include inputSizeMixin($--height-mini, $--font-size-10, 8px);
    .suffix-outside-wrapper {
      right: -4px;
    }
  }
}
</style>
