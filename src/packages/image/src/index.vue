<template>
  <div
    class="fg-image"
    :style="elStyle"
    :class="[
      viewMode ? '__view-mode-' + viewMode : '',
      { 'is-error': isError },
      { 'is-flex': flex },
      { 'is-inline-flex': inlineFlex },
    ]"
    @click="handleClick"
  >
    <img :src="src" @load="_load" @error="isError = true" />
  </div>
</template>

<script>
import { isNumberLike, toNumber } from '../../../libs/index'

export default {
  name: 'FgImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: '',
    },
    height: {
      type: [String, Number],
      default: '',
    },
    viewMode: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '',
    },
    radius: {
      type: [String, Number],
      default: '',
    },
    flex: Boolean,
    inlineFlex: Boolean,
  },
  data() {
    return {
      isError: false,
    }
  },
  computed: {
    elStyle() {
      const ret = {}
      if (this.width) {
        ret.width = this.width + (isNumberLike(this.width) ? 'px' : '')
      }
      if (this.height) {
        ret.height = this.height + (isNumberLike(this.height) ? 'px' : '')
      }
      if (this.bgColor) {
        ret.background = this.bgColor
      }
      if (this.radius) {
        ret.borderRadius = this.radius + (isNumberLike(this.radius) ? 'px' : '')
      }
      return ret
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
    _load(e) {
      const el = e.target
      const width = el.naturalWidth
      const height = el.naturalHeight
      const parent = el.parentElement
      const parentWidth = toNumber(this.width) || parent.offsetWidth
      const parentHeight = toNumber(this.height) || parent.offsetHeight
      const radio = width / height
      const parentRadio = parentWidth / parentHeight

      switch (this.viewMode) {
        case 'fill':
          el.style.width = '100%'
          el.style.height = '100%'
          break
        case 'crop':
          if (radio > parentRadio) {
            el.style.width = 'auto'
            el.style.height = '100%'
          } else {
            el.style.width = '100%'
            el.style.height = 'auto'
          }
          this._setCenter(parent)
          break
        default:
          if (radio > parentRadio) {
            el.style.width = '100%'
            el.style.height = 'auto'
          } else {
            el.style.width = 'auto'
            el.style.height = '100%'
          }
          this._setCenter(parent)
      }
    },
    _setCenter(parent) {
      if (!this.flex && !this.inlineFlex) {
        parent.style.display = 'inline-flex'
      }
      parent.style.alignItems = 'center'
      parent.style.justifyContent = 'center'
    },
  },
}
</script>

<style lang="scss">
.fg-image {
  display: inline-block;
  overflow: hidden;
  font-size: 0;
  background: $--color-background;
  vertical-align: middle;
  &.__view-mode-fill {
    img {
      width: 100%;
      height: 100%;
    }
  }
  &.is-flex {
    display: flex;
  }
  &.is-inline-flex {
    display: inline-flex;
  }
}
</style>
