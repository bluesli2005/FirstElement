/**
 * Created by Capricorncd.
 * Date: 2020-09-07 12:34
 */
export const SCALE_BAR_BTN_HALF_WIDTH = 7.5

export function initImagePosition($img, $cropBox) {
  const box = $cropBox.getBoundingClientRect()
  let imgMaxWidth = $img.naturalWidth
  let imgMaxHeight = $img.naturalHeight
  // img min width, height
  let imgMinWidth = Math.floor((box.height * imgMaxWidth) / imgMaxHeight)
  if (imgMinWidth < box.width) {
    imgMinWidth = Math.floor(box.width)
  }
  const imgMinHeight = Math.ceil((imgMinWidth * imgMaxHeight) / imgMaxWidth)
  // img size < box size
  if (imgMaxWidth <= imgMinWidth) {
    imgMaxWidth = imgMinWidth * 2
    imgMaxHeight = Math.floor((imgMaxWidth * imgMinHeight) / imgMinWidth)
  }
  // current size
  const currentWidth = imgMinWidth + (imgMaxWidth - imgMinWidth) / 2
  const currentHeight = (currentWidth * imgMaxHeight) / imgMaxWidth
  setElStyles($img, {
    width: currentWidth,
    height: currentHeight,
    left: -(currentWidth - box.width) / 2,
    top: -(currentHeight - box.height) / 2,
  })
  $img.style.opacity = 1
  return {
    minWidth: imgMinWidth,
    minHeight: imgMinHeight,
    maxWidth: imgMaxWidth,
    maxHeight: imgMaxHeight,
  }
}

export function initScaleBarPosition($scaleBar, $barCtrlBtn) {
  const { width: parentWidth } = $scaleBar.parentElement.getBoundingClientRect()
  setElStyles($scaleBar, {
    width: parentWidth / 2,
  })
  setElStyles($barCtrlBtn, {
    left: parentWidth / 2 - SCALE_BAR_BTN_HALF_WIDTH,
  })
}

export function setElStyles(el, styles) {
  Object.keys(styles).forEach((key) => {
    el.style[key] = styles[key] + 'px'
  })
}

export function handleMove(
  e,
  moveBeforePosition,
  isTouchEvent,
  $cropBox,
  $img
) {
  const pageX = isTouchEvent ? e.targetTouches[0].pageX : e.pageX || e.clientX
  const pageY = isTouchEvent ? e.targetTouches[0].pageY : e.pageY || e.clientY
  const moveX = pageX - moveBeforePosition.x
  const moveY = pageY - moveBeforePosition.y
  // img position
  let currentLeft = moveBeforePosition.left + moveX
  let currentTop = moveBeforePosition.top + moveY
  // check image position
  const { width, height } = $img.getBoundingClientRect()
  const box = $cropBox.getBoundingClientRect()
  if (currentLeft > 0) {
    currentLeft = 0
  }
  if (currentTop > 0) {
    currentTop = 0
  }

  if (currentLeft < box.width - width) {
    currentLeft = box.width - width
  }
  if (currentTop < box.height - height) {
    currentTop = box.height - height
  }

  setElStyles($img, {
    left: currentLeft,
    top: currentTop,
  })
}

export function resetImageAttrs(img) {
  img.src = ''
  img.setAttribute('style', '')
  img.style.opacity = 0
}

export function handleScale(isEnlarge, radio) {}
