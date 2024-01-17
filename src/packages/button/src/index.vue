<template>
  <button
    :class="[
      'fg-button',
      { __disabled: disabled },
      '__' + size,
      { __round: round },
      { __circle: circle },
      { __fillet: fillet },
      { __bold: bold },
      { __border: border },
      { __shadow: shadow },
      '__type-' + type,
      { '__white-transparent': whiteTransparent },
    ]"
    :style="buttonStyle"
    type="button"
    @click="handleClick"
  >
    <template v-if="icon">
      <fg-icon :name="icon" :color="iconArrowRightColor" />
    </template>
    <template v-else>
      <i v-if="hasIcon" class="__icon prefix-icon-wrapper">
        <fg-icon
          v-if="prefixIcon"
          :color="iconArrowRightColor"
          :name="prefixIcon"
        ></fg-icon>
      </i>
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
      <i v-if="hasIcon" class="__icon suffix-icon-wrapper">
        <fg-icon
          v-if="suffixIcon"
          :color="iconArrowRightColor"
          :name="suffixIcon"
        ></fg-icon>
      </i>
    </template>
  </button>
</template>

<script>
import { isNumberLike } from '../../../libs/index'

export default {
  name: 'FgButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
      default: true,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    fillet: {
      type: Boolean,
      default: false,
    },
    bold: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    // style
    textColor: {
      type: String,
      default: '',
    },
    background: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '',
    },
    fontSize: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
    // icon
    suffixIcon: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    justify: {
      type: String,
      default: '',
    },
    shadow: Boolean,
    whiteTransparent: Boolean,
  },
  data() {
    return {}
  },
  computed: {
    hasIcon() {
      return this.prefixIcon || this.suffixIcon
    },
    buttonStyle() {
      const ret = {}
      if (this.textColor) {
        ret.color = this.textColor
      }
      if (this.bgColor) {
        ret.background = this.bgColor
      }
      if (this.fontSize) {
        ret.fontSize = this.fontSize
      }
      if (this.width) {
        ret.width = this.width + (isNumberLike(this.width) ? 'px' : '')
        if (this.circle) {
          ret.height = ret.width
        }
      }
      if (this.justify) {
        ret.justifyContent = this.justify
      }
      // no prefix and suffix
      if (!this.hasIcon) {
        ret.justifyContent = 'center'
      }
      return ret
    },
    iconArrowRightColor() {
      if (this.type === 'primary') {
        if (!this.border) return this.$colors.white
      }
      if (this.whiteTransparent) {
        return this.$colors.white
      }
      return this.$colors.primaryActive
    },
  },
  methods: {
    handleClick(e) {
      // e.stopPropagation()
      if (this.disabled) {
        return
      }
      this.$emit('click', e)
    },
  },
}
</script>

<style lang="scss">
.fg-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  // width: 100%;
  height: $--height-regular;
  line-height: $--height-regular;
  font-size: $--font-size-14;
  outline: none;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 0;
  color: $--color-primary-active;
  background: $--color-white;
  cursor: pointer;
  vertical-align: middle;
  &[type='button'] {
    color: $--color-primary-active;
  }
  &.__border {
    border: 1px solid $--color-border;
  }
  &:hover {
    // color: $--color-primary-hover;
    opacity: 0.8;
  }
  &.__shadow {
    box-shadow: 0 5px 10px $--color-shadow-primary;
  }
  .__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: $--height-regular;
    &.prefix-icon-wrapper {
      margin-left: 18px;
      margin-right: 4px;
    }
    &.suffix-icon-wrapper {
      margin-right: 18px;
      margin-left: 4px;
    }
  }
  // bold
  &.__bold {
    font-weight: bold;
  }
  // round
  &.__round {
    border-radius: $--height-regular / 2;
  }
  // __fillet
  &.__fillet {
    border-radius: $--border-radius-4;
  }
  // circle
  &.__circle {
    padding: 0 !important;
    border-radius: 50%;
    width: $--height-regular;
    height: $--height-regular;
    justify-content: center;
  }
  // disabled
  &.__disabled {
    cursor: not-allowed;
    opacity: $--color-disabled-opacity;
    &:hover {
    }
  }
  // size
  &.__medium {
    height: $--height-medium;
    line-height: $--height-medium;
    &.__circle {
      width: $--height-medium;
    }
    &.__round {
      border-radius: $--height-medium / 2;
    }
    .__icon {
      height: $--height-medium;
    }
  }
  &.__small {
    height: $--height-small;
    line-height: $--height-small;
    font-size: $--font-size-12;
    &.__circle {
      width: $--height-small;
    }
    &.__round {
      border-radius: $--height-small / 2;
    }
    .__icon {
      height: $--height-small;
      &.prefix-icon-wrapper {
        margin-left: 10px;
      }
      &.suffix-icon-wrapper {
        margin-right: 10px;
      }
    }
  }
  &.__mini {
    height: $--height-mini;
    line-height: $--height-mini;
    font-size: $--font-size-12;
    &.__circle {
      width: $--height-mini;
    }
    &.__round {
      border-radius: $--height-mini / 2;
    }
    .__icon {
      height: $--height-mini;
      &.prefix-icon-wrapper {
        margin-left: 10px;
      }
      &.suffix-icon-wrapper {
        margin-right: 10px;
      }
    }
  }
  // type
  &.__type-primary {
    border-color: $--color-primary-active;
    color: $--color-white;
    background: $--color-primary-gradient;
    &:hover {
      // background: $--color-primary-hover;
    }
    &.__disabled {
      &:hover {
        background: $--color-primary-gradient;
      }
    }
  }

  &.__type-warning {
    border-color: $--color-warning-active;
    color: $--color-white;
    background: $--color-warning-active;
  }

  &.__border {
    &.__type-primary {
      color: $--color-primary-active;
      border: 1px solid $--color-primary-active;
      background: $--color-white;
      &:hover {
        color: $--color-primary-active;
        background: $--color-white;
        border-color: $--color-primary-active;
      }
      &.__disabled {
        &:hover {
          color: $--color-primary-active;
          border-color: $--color-primary-active;
        }
      }
    }
  }

  &.__line,
  &.__border {
    line-height: $--height-regular - 2;
    .__icon {
      height: $--height-regular - 2;
    }
    &.__medium {
      line-height: $--height-medium - 2;
      .__icon {
        height: $--height-medium - 2;
      }
    }
    &.__small {
      line-height: $--height-small - 2;
      .__icon {
        height: $--height-small - 2;
      }
    }
    &.__mini {
      line-height: $--height-mini - 2;
      .__icon {
        height: $--height-mini - 2;
      }
    }
  }

  &.__white-transparent {
    background: none;
    border: 1px solid $--color-white;
    color: $--color-white;
  }
}
</style>
