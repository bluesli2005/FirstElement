/**
 * Created by Capricorncd.
 * Date: 2020-08-14 15:16
 */
import { children, arrowLeft } from './arrow-left'

export const arrowDown = {
  w: arrowLeft.h,
  h: arrowLeft.w,
  i: [
    {
      t: 'g',
      a: {
        transform: 'translate(11.19) rotate(90)',
      },
      c: children,
    },
  ],
}
