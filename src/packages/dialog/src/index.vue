<template>
  <div ref="el" class="fg-dialog" :class="outerClass">
    <div class="fg-dialog__inner" :class="innerClass" :style="innerStyle">
      <slot name="header"></slot>
      <div v-if="!$slots.header || hideHeader" class="fg-dialog__header">
        <h2 class="__title">{{ title }}</h2>
        <slot name="title-suffix"></slot>
        <div class="fg-dialog__header-right">
          <slot name="header-right"></slot>
        </div>
        <fg-button
          class="__close"
          icon="plus"
          circle
          border
          size="small"
          @click="handleClose"
        ></fg-button>
      </div>
      <div class="fg-dialog__body" :style="bodyStyle">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    </div>
    <div
      class="fg-dialog__background"
      :style="maskStyle"
      @click="handleClose('bg')"
    ></div>
  </div>
</template>

<script>
import { resetZIndex, toNumber, isNumberLike } from '../../../libs/index'

export default {
  name: 'FgDialog',
  props: {
    value: Boolean,
    persistent: Boolean,
    title: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: String,
      default: '',
    },
    minWidth: {
      type: String,
      default: '',
    },
    hideHeader: Boolean,
    hideHeaderBorder: Boolean,
    maskColor: {
      type: String,
      default: '',
    },
    maskOpacity: {
      type: String,
      default: '',
    },
    boxShadow: {
      type: String,
      default: '',
    },
    headerHeight: {
      type: [String, Number],
      default: '60',
    },
    bodyHeight: {
      type: String,
      default: '',
    },
    autoXClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      domBody: null,
      visible: this.value,
      isPersistentClick: false,
      timer: null,
    }
  },
  computed: {
    el() {
      return this.$refs.el
    },
    outerClass() {
      return this.visible ? 'is-show' : ''
    },
    innerClass() {
      const arr = []
      if (this.isPersistentClick) {
        arr.push('fg-dialog__anime')
      }
      if (this.hideHeaderBorder) {
        arr.push('hide-header-border')
      }
      return arr
    },
    innerStyle() {
      const ret = {}
      if (this.maxWidth) {
        ret.maxWidth = this.maxWidth + (isNumberLike(this.maxWidth) ? 'px' : '')
      }

      if (this.minWidth) {
        ret.minWidth = this.minWidth + (isNumberLike(this.minWidth) ? 'px' : '')
      }
      return ret
    },
    bodyStyle() {
      const ret = {}
      if (window) {
        const offset = toNumber(this.headerHeight) + 60
        ret.maxHeight = window.innerHeight - offset + 'px'
      }

      if (this.bodyHeight) {
        ret.maxHeight =
          this.bodyHeight + (isNumberLike(this.bodyHeight) ? 'px' : '')
        ret.height =
          this.bodyHeight + (isNumberLike(this.bodyHeight) ? 'px' : '')
      }

      if (this.boxShadow) {
        ret.boxShadow = this.boxShadow
      }
      return ret
    },
    maskStyle() {
      const ret = {}
      if (this.maskColor) {
        ret.backgroundColor = this.maskColor
      }
      if (this.maskOpacity) {
        ret.opacity = this.maskOpacity
      }
      return ret
    },
  },
  watch: {
    value(val) {
      if (this.visible !== val) {
        this.visible = val
      }
      this.setBodyHide(val)
      if (val) {
        resetZIndex(this.el)
      }
    },
    visible(val) {
      this.$emit('input', val)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.domBody = document.querySelector('body')
      this.domBody.appendChild(this.el)
    })
  },
  beforeDestroy() {
    if (this.domBody) this.domBody.removeChild(this.$refs.el)
    if (this.timer) clearTimeout(this.timer)
  },
  methods: {
    handleClose(type) {
      if (type === 'bg' && this.persistent) {
        this.isPersistentClick = true
        this.timer = setTimeout(() => {
          this.isPersistentClick = false
        }, 50)
        return
      }
      if (this.autoXClose) {
        this.visible = false
      } else {
        this.$emit('xButtonClose')
      }
    },
    setBodyHide(flag) {
      if (!this.domBody) return
      if (flag) {
        this.$nextTick(() => {
          this.domBody.style.overflow = 'hidden'
        })
      } else {
        this.domBody.style.overflow = ''
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin';

.fg-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
  overflow: hidden;
  .fg-dialog__background {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $--color-primary-active;
    opacity: 0;
    transition: inherit;
    overflow: hidden;
  }
  .fg-dialog__inner {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 90%;
    max-height: 100%;
    background: $--color-white;
    border-radius: $--border-radius-4;
    box-shadow: 0 11px 15px -7px $--color-shadow-primary,
      0 24px 38px 3px $--color-shadow-primary,
      0 9px 46px 8px $--color-shadow-primary;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    overflow: hidden;
  }
  .fg-dialog__header {
    position: relative;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @include borderBottom(bottom);
    .__title {
      margin-left: 24px;
      font-size: 18px;
      font-weight: 600;
    }
    .__close {
      position: absolute;
      right: 24px;
      top: 50%;
      margin-top: -15px;
      transform: rotate(45deg);
    }
    .fg-dialog__header-right {
      position: absolute;
      right: 54px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .fg-dialog__inner.hide-header-border {
    .fg-dialog__header::after {
      display: none;
    }
  }
  .fg-dialog__body {
    overflow-y: auto;
    @include scrollbar();
  }
}
.fg-dialog.is-show {
  pointer-events: auto;
  .fg-dialog__inner {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    &.fg-dialog__anime {
      transform: translate(-50%, -50%) scale(1.05);
    }
  }
  .fg-dialog__background {
    opacity: 0.5;
  }
}
</style>
