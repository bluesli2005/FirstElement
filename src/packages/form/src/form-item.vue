<template>
  <div
    class="fg-form-item"
    :class="[{ 'is-inline': inline }]"
    :style="itemStyle"
  >
    <LabelWrap
      :is-auto-width="labelStyle && labelStyle.width === 'auto'"
      :update-all="form.labelWidth === 'auto'"
    >
      <label
        v-if="label || $slots.label"
        class="fg-form-item__label"
        :style="labelStyle"
      >
        <slot name="label">{{ label + form.labelSuffix }}</slot>
        <span v-if="required" class="is-required-icon">
          <fg-icon name="hook" color="#fff"></fg-icon>
        </span>
      </label>
    </LabelWrap>
    <div class="fg-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="fg-zoom-in-top">
        <div v-if="errorMessage" class="fg-form-item__error">
          {{ errorMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Broadcaster from '../../../assets/js/broadcaster'
import { isNumberLike } from '../../../libs/index'
import LabelWrap from './label-wrap'

export default {
  name: 'FgFormItem',
  components: {
    LabelWrap,
  },
  mixins: [Broadcaster],
  provide() {
    return {
      FgFormItem: this,
    }
  },
  inject: ['FgForm'],
  props: {
    label: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: String,
      default: '',
    },
    labelFontSize: {
      type: String,
      default: '',
    },
    labelFontWeight: {
      type: String,
      default: '',
    },
    itemSpacing: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    inline: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      computedLabelWidth: '',
    }
  },
  computed: {
    itemStyle() {
      const ret = {}
      const itemSpacing = this.itemSpacing || this.form.itemSpacing
      if (itemSpacing || typeof itemSpacing === 'number') {
        ret.marginBottom = itemSpacing + (isNumberLike(itemSpacing) ? 'px' : '')
      }
      return ret
    },
    labelStyle() {
      const ret = {}
      const labelFontSize = this.labelFontSize || this.form.labelFontSize
      if (labelFontSize) {
        ret.fontSize = labelFontSize + (isNumberLike(labelFontSize) ? 'px' : '')
      }
      const labelFontWeight = this.labelFontWeight || this.form.labelFontWeight
      if (labelFontWeight) {
        ret.fontWeight =
          labelFontWeight + (isNumberLike(labelFontWeight) ? 'px' : '')
      }
      if (this.form.labelPosition === 'top') return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.width = labelWidth + (isNumberLike(labelWidth) ? 'px' : '')
      }
      return ret
    },
    contentStyle() {
      const ret = {}
      const label = this.label
      if (this.form.labelPosition === 'top' || this.form.inline) return ret
      if (!label && !this.labelWidth && this.isNested) return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth === 'auto') {
        if (this.labelWidth === 'auto') {
          ret.marginLeft = this.computedLabelWidth
        } else if (this.form.labelWidth === 'auto') {
          ret.marginLeft = this.FgForm.autoLabelWidth
        }
      } else {
        ret.marginLeft = labelWidth
      }
      return ret
    },
    isNested() {
      let parent = this.$parent
      let parentName = parent.$options.name
      while (parentName !== 'FgForm') {
        if (parentName === 'FgFormItem') {
          return true
        }
        parent = parent.$parent
        parentName = parent.$options.name
      }
      return false
    },
    form() {
      let parent = this.$parent
      let parentName = parent.$options.name
      while (parentName !== 'FgForm') {
        parent = parent.$parent
        parentName = parent.$options.name
      }
      return parent
    },
  },
  methods: {
    updateComputedLabelWidth(width) {
      this.computedLabelWidth = width ? `${width}px` : ''
    },
  },
}
</script>

<style lang="scss">
.fg-form-item {
  &.is-inline {
    display: inline-block;
    .fg-form-item__label {
      float: none;
    }
    .fg-form-item__content {
      display: inherit;
    }
  }
  .fg-form-item__label {
    .is-required-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 4px;
      width: 14px;
      height: 14px;
      background: $--color-warning;
      border-radius: 50%;
      .fg-icon {
        margin-top: 1px;
      }
    }
  }
}
</style>
