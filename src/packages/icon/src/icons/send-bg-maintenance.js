/**
 * Created by Wenbiao L.
 * Date: 2021-03-03 19:52
 */
export const sendBgMaintenance = {
  w: 50,
  h: 50,
  i: [
    {
      t: 'rect',
      a: {
        width: '50',
        height: '50',
        rx: '25',
      },
    },
    {
      t: 'path',
      a: {
        d:
          'M15.741,3.72,12.846,6.615l-2.532-.9-.9-2.532L12.3.283a5.454,5.454,0,0,0-6.94,6.8,2.565,2.565,0,0,0-.228.2l-10.2,10.46a2.548,2.548,0,0,0,0,3.6,2.548,2.548,0,0,0,3.6,0l10.2-10.46a2.573,2.573,0,0,0,.2-.228,5.454,5.454,0,0,0,6.8-6.94Z',
        transform: 'translate(20.654 6.13)',
        fill: '#fff',
      },
    },
    {
      t: 'text',
      a: {
        transform: 'translate(25 41)',
        fill: '#fff',
        fontSize: '10',
        fontFamily: 'NotoSansCJKjp-Bold, Noto Sans CJK JP',
        fontWeight: '700',
        fontStyle: 'normal',
      },
      c: [
        {
          t: 'tspan',
          a: {
            x: '-10',
            y: '0',
          },
          c: ['整備'],
        },
      ],
    },
  ],
}
