<template>
  <transition :name="transitionName">
    <div v-show="popVisible" ref="pop" :class="classes" :style="popStyle">
      <slot></slot>
      <i v-if="!hideArrow" class="fg-popup__arrow" :style="arrowStyle"></i>
    </div>
  </transition>
</template>

<script>
import {
  getScrollParents,
  resetZIndex,
  toNumber,
  isUndefined,
} from '../../../libs/index'

export default {
  name: 'FgPopup',
  props: {
    value: Boolean,
    position: {
      type: String,
      default: '',
    },
    autoWidth: Boolean,
    hideArrow: Boolean,
    offset: {
      type: [String, Number],
      default: undefined,
    },
    docAutoClosed: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      popVisible: this.value,
      // DOM body
      domBody: null,
      isTopIn: true,
      popStyle: {},
      arrowStyle: {},
      scrollParents: [],
    }
  },
  computed: {
    pop() {
      return this.$refs.pop
    },
    transitionName() {
      if (this.isSidePosition) {
        if (this.isLeftSide) {
          return this.isTopIn
            ? 'fg-zoom-in-right-top'
            : 'fg-zoom-in-right-bottom'
        } else {
          return this.isTopIn ? 'fg-zoom-in-left-top' : 'fg-zoom-in-left-bottom'
        }
      }
      return this.isTopIn ? 'fg-zoom-in-top' : 'fg-zoom-in-bottom'
    },
    isSidePosition() {
      return ['left', 'right'].includes(this.position)
    },
    isLeftSide() {
      return this.position === 'left'
    },
    popWidth() {
      return this.pop ? this.pop.offsetWidth : 100
    },
    popHeight() {
      return this.pop ? this.pop.offsetHeight || 300 : 300
    },
    marginOffset() {
      return isUndefined(this.offset) ? 10 : toNumber(this.offset)
    },
    classes() {
      return ['fg-popup', `is-${this.transitionName}`]
    },
  },
  watch: {
    value(val) {
      if (this.popVisible !== val) {
        this.popVisible = val
      }
      if (val) {
        resetZIndex(this.pop)
      }
    },
    popVisible(val) {
      this.$emit('input', val)
      if (val) {
        this.resetIsTopIn()
        this.resetPopPosition()
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollParents = getScrollParents(this.$parent.$el)
      this.scrollParents.forEach((el) => {
        el.addEventListener('scroll', this.handleWinScroll, false)
      })
      this.domBody = document.querySelector('body')
      this.domBody.append(this.pop)
    })
    window.addEventListener('scroll', this.handleWinScroll, false)
    document.addEventListener('click', this.handleDocClick, false)
  },
  beforeDestroy() {
    this.scrollParents.forEach((el) => {
      el.removeEventListener('scroll', this.handleWinScroll, false)
    })
    window.removeEventListener('scroll', this.handleWinScroll, false)
    document.removeEventListener('click', this.handleDocClick, false)
    // remove popup of DOM body
    this.domBody.removeChild(this.pop)
  },
  methods: {
    resetIsTopIn() {
      const $el = this.$parent.$el
      if (!$el) return
      const { bottom } = $el.getBoundingClientRect()
      this.isTopIn = window.innerHeight - bottom > this.popHeight
    },
    resetPopPosition() {
      const marginOffset = this.marginOffset
      const popStyle = {}
      const arrowStyle = {}
      this.$nextTick(() => {
        const {
          top,
          left,
          right,
          width,
          height,
          bottom,
        } = this.$parent.$el.getBoundingClientRect()
        const isSidePosition = this.isSidePosition
        if (!this.autoWidth && !isSidePosition) {
          popStyle.minWidth = width + 'px'
        }
        /** check bottom offset */
        const winHeight = window.innerHeight
        if (winHeight - bottom < this.popHeight) {
          // arrow
          if (isSidePosition) {
            this.setArrowPosition('bottom', height, arrowStyle)
          } else {
            arrowStyle.left = 15 + 'px'
            arrowStyle.bottom = -5 + 'px'
            arrowStyle.transform = `rotate(180deg)`
          }
          // pop body
          popStyle.bottom =
            (isSidePosition
              ? winHeight - top - height
              : winHeight - top + marginOffset) + 'px'
        } else {
          // arrow
          if (isSidePosition) {
            this.setArrowPosition('top', height, arrowStyle)
          } else {
            arrowStyle.left = 15 + 'px'
            arrowStyle.top = -5 + 'px'
          }
          // pop body
          popStyle.top =
            (isSidePosition ? bottom - height : bottom + marginOffset) + 'px'
        }
        /** check right offset */
        const winWidth = window.innerWidth
        const popWidth = this.popWidth
        let l
        if (isSidePosition) {
          if (this.isLeftSide) {
            l = left - popWidth - marginOffset
            if (l < 0) {
              this.printError('left')
            }
          } else {
            l = right + marginOffset
            if (l + popWidth > winWidth) {
              this.printError('right')
            }
          }
        } else if (left + popWidth > winWidth) {
          // arrow
          arrowStyle.left = popWidth - width + 15 + 'px'
          // pop body
          l = right - popWidth
        } else {
          l = left
        }
        popStyle.left = l + 'px'
        this.arrowStyle = arrowStyle
        this.popStyle = popStyle
      })
    },
    setArrowPosition(attr, height, arrowStyle) {
      arrowStyle[attr] = height / 2 - 2 + 'px'
      if (this.isLeftSide) {
        arrowStyle.right = -7 + 'px'
        arrowStyle.transform = `rotate(90deg)`
      } else {
        arrowStyle.left = -7 + 'px'
        arrowStyle.transform = `rotate(-90deg)`
      }
    },
    printError(position) {
      console.error(
        `[Error] Invalid position parameter[${position}], The ${position} side is not wide enough to display the pop-up window`
      )
    },
    handleWinScroll() {
      if (this.popVisible) {
        this.popVisible = false
      }
    },
    handleDocClick() {
      if (this.popVisible && this.docAutoClosed) {
        this.popVisible = false
      }
    },
  },
}
</script>

<style lang="scss">
.fg-popup {
  position: fixed;
  margin: 0;
  padding: 0;
  box-shadow: 0 2px 10px 1px $--color-shadow-primary;
  border-radius: $--border-radius-4;
  background: $--color-white;
  .fg-popup__arrow {
    display: block;
    position: absolute;
    z-index: 0;
    border-bottom: 5px solid $--color-white;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
}
</style>
