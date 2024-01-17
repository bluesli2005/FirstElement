/**
 * Created by Capricorncd.
 * Date: 2020-08-14 14:50
 */
import { arrowLeft, children } from './arrow-left'

export const arrowTop = {
  w: arrowLeft.h,
  h: arrowLeft.w,
  i: [
    {
      t: 'g',
      a: {
        transform: 'translate(0 6.9) rotate(-90)',
      },
      c: children,
    },
  ],
}
