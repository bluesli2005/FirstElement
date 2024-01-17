/**
 * Created by Capricorncd.
 * Date: 2020-09-15 15:01
 */
export function logStr(...args) {
  if (this && !this.isDev) return
  args.forEach((o) => {
    console.log(JSON.stringify(o, null, 2))
  })
}

export function log() {
  if (this && !this.isDev) return
  console.log.apply(null, arguments)
}

export function error() {
  if (this && !this.isDev) return
  console.error.apply(null, arguments)
}

export function warn() {
  if (this && !this.isDev) return
  console.warn.apply(null, arguments)
}
