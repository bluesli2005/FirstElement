/**
 * Created by Capricorncd.
 * Date: 2020-09-07 10:28
 */
import { TOUCH_EVENTS } from 'image-process'
import { getStyleValue } from '../../../../libs/index'
import { getTouches, handleTouches } from './touch'
import {
  handleMove,
  handleScale,
  initImagePosition,
  initScaleBarPosition,
  resetImageAttrs,
  SCALE_BAR_BTN_HALF_WIDTH,
  setElStyles,
} from './helper'

const isAndroid = navigator.userAgent.toLowerCase().includes('android')

export default {
  mounted() {
    this.$nextTick(() => {
      handleScaleBarEvents.call(this)
      handleCropEvents.call(this)
    })
  },
  beforeDestroy() {
    // ctrl bar
    this.$refs.barCtrlBtn.addEventListener(
      TOUCH_EVENTS.start,
      this.barTouchStartHandler
    )
    document.addEventListener(TOUCH_EVENTS.move, this.barTouchMoveHandler)
    document.addEventListener(TOUCH_EVENTS.end, this.barTouchEndHandler)
    // crop
    this.$refs.cropBox.removeEventListener(
      TOUCH_EVENTS.start,
      this.touchStartHandler
    )
    document.removeEventListener(TOUCH_EVENTS.move, this.touchMoveHandler)
    document.removeEventListener(TOUCH_EVENTS.end, this.touchEndHandler)
  },
}

function handleCropEvents() {
  // move before position info
  let moveBeforePosition = {}

  // crop box
  const $cropBox = this.$refs.cropBox
  const $img = this.$refs.img

  resetImageAttrs($img)

  $img.addEventListener('load', (e) => {
    // set img position center middle
    setTimeout(() => {
      this.imageInfo = initImagePosition($img, $cropBox)
      initScaleBarPosition(this.$refs.scaleBar, this.$refs.barCtrlBtn)
    }, 600)
  })

  // mouse down on crop box
  let isMousedownOnCropBox = false
  // isTouchEvent
  let isTouchEvent = false

  // finger count
  let fingers = 0
  let startTouches = []

  this.touchStartHandler = (e) => {
    isMousedownOnCropBox = true
    isTouchEvent = e.type === 'touchstart'
    if (isTouchEvent) {
      fingers = e.touches.length
    }

    if (fingers > 1) {
      startTouches = getTouches(e, $img)
    }

    // mouse key check
    if (!isTouchEvent && 'which' in e && e.which === 3) {
      isMousedownOnCropBox = false
      return
    }

    $cropBox.parentElement.className = 'picture-wrapper'

    if (!isTouchEvent || e.targetTouches.length === 1) {
      if (!isTouchEvent && !isAndroid) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }

      const pageX = isTouchEvent
        ? e.targetTouches[0].pageX
        : e.pageX || e.clientX
      const pageY = isTouchEvent
        ? e.targetTouches[0].pageY
        : e.pageY || e.clientY
      moveBeforePosition = {
        x: pageX,
        y: pageY,
        left: getStyleValue($img, 'left', true),
        top: getStyleValue($img, 'top', true),
      }
    }
  }

  this.touchMoveHandler = (e) => {
    // crop box
    if (isMousedownOnCropBox) {
      if (!isTouchEvent && !isAndroid) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }

      if (fingers > 1) {
        const scale = handleTouches(e, startTouches)
        handleScale(scale > 1, 0.02)
      } else {
        handleMove(e, moveBeforePosition, isTouchEvent, $cropBox, $img)
      }
    }
  }

  this.touchEndHandler = (e) => {
    $cropBox.parentElement.className = 'picture-wrapper has-animation'
    isMousedownOnCropBox = false
    if (isTouchEvent) {
      fingers = e.touches.length
    }
  }

  $cropBox.addEventListener(TOUCH_EVENTS.start, this.touchStartHandler)
  document.addEventListener(TOUCH_EVENTS.move, this.touchMoveHandler)
  document.addEventListener(TOUCH_EVENTS.end, this.touchEndHandler)
}

function handleScaleBarEvents() {
  const $scaleBar = this.$refs.scaleBar
  const $barCtrlBtn = this.$refs.barCtrlBtn
  const $img = this.$refs.img
  const $cropBox = this.$refs.cropBox
  // move before position info
  let moveBeforePosition = {}

  // mouse down on bar
  let isMousedownOnBarBtn = false
  // isTouchEvent
  let isTouchEvent = false

  // finger count
  let fingers = 0

  this.barTouchStartHandler = (e) => {
    isMousedownOnBarBtn = true
    isTouchEvent = e.type === 'touchstart'
    if (isTouchEvent) {
      fingers = e.touches.length
    }

    if (fingers > 1 || (!isTouchEvent && 'which' in e && e.which === 3)) {
      isMousedownOnBarBtn = false
      return
    }

    $scaleBar.parentElement.className = 'scale-bar'
    $cropBox.parentElement.className = 'picture-wrapper'

    if (!isTouchEvent || e.targetTouches.length === 1) {
      if (!isTouchEvent && !isAndroid) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }

      const pageX = isTouchEvent
        ? e.targetTouches[0].pageX
        : e.pageX || e.clientX
      moveBeforePosition = {
        x: pageX,
        width: getStyleValue($scaleBar, 'width', true),
        maxWidth: getStyleValue($scaleBar.parentElement, 'width', true),
        left: getStyleValue($barCtrlBtn, 'left', true),
      }

      this.imageInfo.width = getStyleValue($img, 'width', true)
      this.imageInfo.height = getStyleValue($img, 'height', true)
      this.imageInfo.left = getStyleValue($img, 'left', true)
      this.imageInfo.top = getStyleValue($img, 'top', true)
    }
  }

  this.barTouchMoveHandler = (e) => {
    if (!isMousedownOnBarBtn) return

    if (!isTouchEvent && !isAndroid) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    }

    const pageX = isTouchEvent ? e.targetTouches[0].pageX : e.pageX || e.clientX
    const moveX = pageX - moveBeforePosition.x
    /** bar width */
    let currentWidth = moveBeforePosition.width + moveX

    if (currentWidth < 0) {
      currentWidth = 0
    }

    if (currentWidth > moveBeforePosition.maxWidth) {
      currentWidth = moveBeforePosition.maxWidth
    }

    setElStyles($scaleBar, {
      width: currentWidth,
    })
    /** Update zoom percentage */
    resetCropImagePosition(
      $img,
      $cropBox,
      this.imageInfo,
      currentWidth / moveBeforePosition.maxWidth
    )

    /** bar btn left */
    let currentLeft = moveBeforePosition.left + moveX

    if (currentLeft < -SCALE_BAR_BTN_HALF_WIDTH) {
      currentLeft = -SCALE_BAR_BTN_HALF_WIDTH
    }

    if (currentLeft > moveBeforePosition.maxWidth - SCALE_BAR_BTN_HALF_WIDTH) {
      currentLeft = moveBeforePosition.maxWidth - SCALE_BAR_BTN_HALF_WIDTH
    }

    setElStyles($barCtrlBtn, {
      left: currentLeft,
    })
  }

  this.barTouchEndHandler = () => {
    $scaleBar.parentElement.className = 'scale-bar has-animation'
    $cropBox.parentElement.className = 'picture-wrapper has-animation'
    isMousedownOnBarBtn = false
  }

  $barCtrlBtn.addEventListener(TOUCH_EVENTS.start, this.barTouchStartHandler)
  document.addEventListener(TOUCH_EVENTS.move, this.barTouchMoveHandler)
  document.addEventListener(TOUCH_EVENTS.end, this.barTouchEndHandler)
}

export function resetCropImagePosition($img, $cropBox, imageInfo, radio) {
  const currentWidth =
    imageInfo.minWidth + (imageInfo.maxWidth - imageInfo.minWidth) * radio
  const currentHeight =
    (currentWidth * imageInfo.maxHeight) / imageInfo.maxWidth
  // boundary check
  const box = $cropBox.getBoundingClientRect()
  const left = box.width - currentWidth
  const top = box.height - currentHeight

  let currentLeft = Math.min(
    imageInfo.left - (currentWidth - imageInfo.width) / 2,
    0
  )
  if (currentLeft < left) {
    currentLeft = left
  }

  let currentTop = Math.min(
    imageInfo.top - (currentHeight - imageInfo.height) / 2,
    0
  )
  if (currentTop < top) {
    currentTop = top
  }

  setElStyles($img, {
    width: currentWidth,
    height: currentHeight,
    left: currentLeft,
    top: currentTop,
  })
}
