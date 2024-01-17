<template>
  <div
    :class="[
      'fg-tag',
      '__' + size,
      { __bold: bold },
      { __round: round },
      { __selected: checked },
      { __selectable: selectable },
      { '__no-border': noBorder },
    ]"
    :style="style"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FgTag',
  props: {
    value: Boolean,
    size: {
      type: String,
      default: 'medium',
    },
    width: {
      type: String,
      default: '',
    },
    bold: Boolean,
    round: Boolean,
    selected: Boolean,
    selectable: Boolean,
    bgColor: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    border: {
      type: String,
      default: '',
    },
    borderColor: {
      type: String,
      default: '',
    },
    noBorder: Boolean,
  },
  data() {
    return {
      checked: this.value || this.selected,
    }
  },
  computed: {
    style() {
      const ret = {}
      if (this.width) {
        ret.width = this.width
      }
      if (this.bgColor) {
        ret.background = this.bgColor
        if (this.noBorder) {
          ret.borderColor = this.bgColor
        }
      }
      if (this.color) {
        ret.color = this.color
      }
      if (this.borderColor) {
        ret.borderColor = this.borderColor
      }
      if (this.border) {
        ret.border = this.border
      }

      return ret
    },
  },
  watch: {
    selected(val) {
      if (this.checked !== val) {
        this.checked = val
      }
    },
    checked(val) {
      this.$emit('input', val)
    },
  },
  methods: {
    handleClick() {
      if (this.selectable) {
        this.checked = !this.checked
      }
    },
  },
}
</script>

<style lang="scss">
$regular: 30px;
$medium: 25px;
$small: 20px;
$mini: 18px;

@mixin tagSize($size, $fontSize, $padding) {
  padding: 0 $padding;
  height: $size;
  line-height: $size - 2;
  font-size: $fontSize;
  &.__round {
    border-radius: $size / 2;
  }
}

.fg-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  border-radius: 4px;
  color: $--color-primary-placeholder;
  line-height: 1;
  border: 1px solid $--color-border;
  background: $--color-white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  user-select: none;
  &:last-child {
    margin-right: 0;
  }
  &.__no-border {
    border-color: $--color-white;
  }
  &.__selected {
    border-color: $--color-primary;
    background: $--color-primary;
    color: $--color-white;
    &.__no-border {
      border-color: $--color-primary;
    }
  }
  &.__selectable {
    cursor: pointer;
  }
  // bold
  &.__bold {
    font-weight: bold;
  }
  // size
  &.__regular {
    @include tagSize($regular, $--font-size-12, 12px);
  }
  &.__medium {
    @include tagSize($medium, $--font-size-12, 10px);
  }
  &.__small {
    @include tagSize($small, $--font-size-10, 10px);
  }
  &.__mini {
    @include tagSize($mini, $--font-size-10, 8px);
  }
}
</style>
