/**
 * Created by Capricorncd.
 * Date: 2020-09-24 12:22
 */
import { getParentComponent } from '../libs/index'

export const formEmitterMixin = {
  computed: {
    form() {
      return getParentComponent.call(this, 'FgForm')
    },
  },
  methods: {
    emitFormChange() {
      if (this.form) {
        this.$nextTick(() => {
          this.form.$emit('change')
        })
      }
    },
  },
}
