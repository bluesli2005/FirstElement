/**
 * Created by Capricorncd.
 * Date: 2020-08-31 12:43
 */
import { throttle } from 'throttle-debounce'

/**
 * trigger window event
 * @type {wrapper}
 */
export const windowDispatcher = throttle(500, (eventName) => {
  window.dispatchEvent(new Event(eventName))
})
