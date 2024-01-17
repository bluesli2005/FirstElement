/**
 * Created by Capricorncd.
 * Date: 2020-09-07 11:13
 */
import { slice } from '../../../../libs/index'

export function handleTouches(e, startTouches) {
  return calculateScale(startTouches, targetTouches(e.touches))
}

export function getTouches(event, $container) {
  const position = $container.getBoundingClientRect()
  return slice(event.touches).map((touch) => {
    return {
      x: touch.pageX - position.left,
      y: touch.pageY - position.top,
    }
  })
}

function calculateScale(startTouches, endTouches) {
  const startDistance = getDistance(startTouches[0], startTouches[1])
  const endDistance = getDistance(endTouches[0], endTouches[1])
  return endDistance / startDistance
}

function getDistance(a, b) {
  const x = a.x - b.x
  const y = a.y - b.y
  return Math.sqrt(x * x + y * y)
}

function targetTouches(touches) {
  return slice(touches).map((touch) => {
    return {
      x: touch.pageX,
      y: touch.pageY,
    }
  })
}
