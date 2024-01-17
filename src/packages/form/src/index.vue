<template>
  <form
    class="fg-form"
    :class="[
      labelPosition ? 'fg-form--label-' + labelPosition : '',
      { 'fg-form--inline': inline },
    ]"
  >
    <slot></slot>
    <i
      v-if="splitVerticalLine"
      class="split-vertical-line"
      :style="svlStyle"
    ></i>
  </form>
</template>
<script>
import Broadcaster from '../../../assets/js/broadcaster'

export default {
  name: 'FgForm',
  mixins: [Broadcaster],
  provide() {
    return {
      FgForm: this,
    }
  },
  props: {
    labelPosition: {
      type: String,
      default: 'left',
    },
    labelWidth: {
      type: String,
      default: '',
    },
    labelSuffix: {
      type: String,
      default: '',
    },
    inline: Boolean,
    splitVerticalLine: Boolean,
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
  },
  data() {
    return {
      potentialLabelWidthArr: [],
    }
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0
      const max = Math.max(...this.potentialLabelWidthArr)
      return max ? `${max}px` : ''
    },
    svlStyle() {
      const ret = {}
      if (this.labelWidth && /(\d+)/.test(this.labelWidth)) {
        ret.left = RegExp.$1 - 30 + 'px'
      }
      return ret
    },
  },
  methods: {
    getLabelWidthIndex(width) {
      const index = this.potentialLabelWidthArr.indexOf(width)
      // it's impossible
      if (index === -1) {
        throw new Error('unexpected width ' + width)
      }
      return index
    },
    registerLabelWidth(val, oldVal) {
      if (val && oldVal) {
        const index = this.getLabelWidthIndex(oldVal)
        this.potentialLabelWidthArr.splice(index, 1, val)
      } else if (val) {
        this.potentialLabelWidthArr.push(val)
      }
    },
    deregisterLabelWidth(val) {
      const index = this.getLabelWidthIndex(val)
      this.potentialLabelWidthArr.splice(index, 1)
    },
  },
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin';
@import '../../../assets/scss/function';

.fg-form {
  position: relative;
  .split-vertical-line {
    position: absolute;
    z-index: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: $--color-border;
  }
  .fg-form-item__error {
    font-size: 10px;
  }
}

@include b(form) {
  @include m(label-left) {
    & .fg-form-item__label {
      text-align: left;
    }
  }
  @include m(label-top) {
    & .fg-form-item__label {
      float: none;
      display: inline-block;
      text-align: left;
      padding: 0 0 10px 0;
    }
  }
  @include m(inline) {
    & .fg-form-item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: top;
    }
    & .fg-form-item__label {
      float: none;
      display: inline-block;
    }
    & .fg-form-item__content {
      display: inline-block;
      vertical-align: top;
    }
    &.fg-form--label-top .fg-form-item__content {
      display: block;
    }
  }
}

@include b(form-item) {
  margin-bottom: 22px;
  @include utils-clearfix;

  & .fg-form-item {
    margin-bottom: 0;
  }

  & .fg-input__validateIcon {
    display: none;
  }

  @include m(medium) {
    .fg-form-item__label {
      line-height: $--height-medium;
    }
    .fg-form-item__content {
      line-height: $--height-medium;
    }
  }
  @include m(small) {
    .fg-form-item__label {
      line-height: $--height-small;
    }
    .fg-form-item__content {
      line-height: $--height-small;
    }
    &.fg-form-item {
      margin-bottom: 18px;
    }
    .fg-form-item__error {
      padding-top: 2px;
    }
  }
  @include m(mini) {
    .fg-form-item__label {
      line-height: $--height-mini;
    }
    .fg-form-item__content {
      line-height: $--height-mini;
    }
    &.fg-form-item {
      margin-bottom: 18px;
    }
    .fg-form-item__error {
      padding-top: 1px;
    }
  }

  @include e(label-wrap) {
    float: left;
    .fg-form-item__label {
      display: inline-block;
      float: none;
    }
  }

  @include e(label) {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: $--font-size-12;
    line-height: $--height-regular;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    font-weight: bold;
  }
  @include e(content) {
    line-height: $--height-regular;
    position: relative;
    font-size: 12px;
    @include utils-clearfix;

    .fg-input-group {
      vertical-align: top;
    }
  }
  @include e(error) {
    color: $--color-warning;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;

    @include m(inline) {
      position: relative;
      top: auto;
      left: auto;
      display: inline-block;
      margin-left: 10px;
    }
  }

  @include when(error) {
    & .fg-input__inner,
    & .fg-textarea__inner {
      &,
      &:focus {
        border-color: $--color-warning;
      }
    }
    & .fg-input-group__append,
    & .fg-input-group__prepend {
      & .fg-input__inner {
        border-color: transparent;
      }
    }
    .fg-input__validateIcon {
      color: $--color-warning;
    }
  }

  @include m(feedback) {
    .fg-input__validateIcon {
      display: inline-block;
    }
  }
}
</style>
