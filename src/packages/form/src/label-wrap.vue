<script>
export default {
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean,
  },

  inject: ['FgForm', 'FgFormItem'],

  data() {
    return {
      computedWidth: 0,
    }
  },

  watch: {
    computedWidth(val, oldVal) {
      if (this.updateAll) {
        this.FgForm.registerLabelWidth(val, oldVal)
        this.FgFormItem.updateComputedLabelWidth(val)
      }
    },
  },

  mounted() {
    this.updateLabelWidth('update')
  },

  updated() {
    this.updateLabelWidth('update')
  },

  beforeDestroy() {
    this.updateLabelWidth('remove')
  },

  methods: {
    getLabelWidth() {
      if (this.$el && this.$el.firstElementChild) {
        const computedWidth = window.getComputedStyle(
          this.$el.firstElementChild
        ).width
        return Math.ceil(parseFloat(computedWidth))
      } else {
        return 0
      }
    },
    updateLabelWidth(action = 'update') {
      if (
        this.$slots.default &&
        this.isAutoWidth &&
        this.$el.firstElementChild
      ) {
        if (action === 'update') {
          this.computedWidth = this.getLabelWidth()
        } else if (action === 'remove') {
          this.FgForm.deregisterLabelWidth(this.computedWidth)
        }
      }
    },
  },
  render(h) {
    const slots = this.$slots.default
    if (!slots) return null
    if (this.isAutoWidth) {
      const autoLabelWidth = this.FgForm.autoLabelWidth
      const style = {}
      if (autoLabelWidth && autoLabelWidth !== 'auto') {
        const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth
        if (marginLeft) {
          style.marginLeft = marginLeft + 'px'
        }
      }
      return h('div', {
        class: 'fg-form-item__label-wrap',
        style,
      })
    } else {
      return slots[0]
    }
  },
}
</script>
