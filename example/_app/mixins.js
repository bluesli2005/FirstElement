/**
 * Created by Capricorncd.
 * Date: 2020-09-02 10:11
 */
export const customMixin = {
  mounted() {
    this.$nextTick(() => {
      document.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightBlock(block)
      })
    })
  },
}
