<template>
  <i class="fg-icon" @click="handleClick">
    <svg
      ref="svg"
      xmlns="http://www.w3.org/2000/svg"
      :width="svgWidth"
      :height="svgHeight"
      :viewBox="viewBox"
      :style="svgStyle"
    ></svg>
  </i>
</template>

<script>
import { toNumber } from '../../../libs/index'
import icons from './icons/index'
import { createPathHtml } from './helper'

export default {
  name: 'FgIcon',
  props: {
    color: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: undefined,
    },
  },
  computed: {
    svg() {
      return this.$refs.svg
    },
    item() {
      const item = icons[this.name]
      if (!item) {
        throw new Error(`Icon[${this.name}] dose not exist.`)
      }
      return item
    },
    svgWidth() {
      return toNumber(this.size) || this.item.w
    },
    svgHeight() {
      const { w, h } = this.item
      return this.svgWidth !== w ? (this.svgWidth / w) * h : h
    },
    viewBox() {
      const { w, h } = this.item
      return `0 0 ${w} ${h}`
    },
    html() {
      return createPathHtml(this.item.i)
    },
    svgStyle() {
      const ret = {
        color: this.color || this.$colors.primary,
      }
      return ret
    },
  },
  watch: {
    html(val) {
      this.svg.innerHTML = val
    },
  },
  created() {
    this.$nextTick(() => {
      this.svg.innerHTML = this.html
    })
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style lang="scss">
.fg-icon {
  display: inline-flex;
  font-size: 0;
  line-height: 0;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  svg {
    fill: currentColor;
    color: $--color-primary;
  }
}
</style>
