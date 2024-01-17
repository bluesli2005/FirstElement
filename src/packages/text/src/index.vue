<template>
  <div
    class="fg-text"
    :class="rows === 1 ? 'is-single-line' : 'is-multi-line'"
    :style="style"
  >
    <div class="__inner" :style="innerStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FgText',
  props: {
    rows: {
      type: Number,
      default: 1,
    },
    lineHeight: {
      type: Number,
      default: 18,
    },
    fontSize: {
      type: String,
      default: '12px',
    },
    unit: {
      type: String,
      default: 'px',
    },
  },
  computed: {
    style() {
      return {
        height: this.rows * this.lineHeight + this.unit,
      }
    },
    innerStyle() {
      const ret = {
        height: this.rows * this.lineHeight + this.unit,
        fontSize: this.fontSize,
        lineHeight: this.lineHeight + this.unit,
      }
      if (this.rows > 1) {
        ret['-webkit-line-clamp'] = this.rows
      }
      return ret
    },
  },
}
</script>

<style lang="scss">
.fg-text {
  position: relative;
  // font-size: 0;
  .__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  &.is-single-line {
    .__inner {
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  &.is-multi-line {
    .__inner {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }
  }
}
</style>
