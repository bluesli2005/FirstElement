/**
 * Created by Capricorncd.
 * Date: 2020-09-03 13:06
 */
const MILLI_SECOND = 800
export default {
  methods: {
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
  },
  watch: {
    isLeaved(val) {
      if (this.popVisible) {
        if (val) {
          this.timer = setTimeout(() => {
            this.popVisible = false
          }, MILLI_SECOND)
        } else {
          this.clearTimer()
        }
      }
    },
  },
  beforeDestroy() {
    this.clearTimer()
  },
}
