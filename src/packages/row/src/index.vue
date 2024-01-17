<script>
export default {
  name: 'FgRow',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    /* eslint-disable vue/require-default-prop */
    gutter: [String, Number],
    type: String,
    justify: {
      type: String,
      default: 'start',
    },
    align: {
      type: String,
      default: 'top',
    },
    overflowHide: Boolean,
  },

  computed: {
    style() {
      const ret = {}
      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }
      return ret
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        class: [
          'fg-row',
          this.justify !== 'start' ? `is-justify-${this.justify}` : '',
          this.align !== 'top' ? `is-align-${this.align}` : '',
          { 'fg-row--flex': this.type === 'flex' },
          { 'overflow-hide': this.overflowHide },
        ],
        style: this.style,
      },
      this.$slots.default
    )
  },
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin';

@include b(row) {
  position: relative;
  box-sizing: border-box;
  @include utils-clearfix;

  @include m(flex) {
    display: flex;
    &:before,
    &:after {
      display: none;
    }

    @include when(justify-center) {
      justify-content: center;
    }
    @include when(justify-end) {
      justify-content: flex-end;
    }
    @include when(justify-space-between) {
      justify-content: space-between;
    }
    @include when(justify-space-around) {
      justify-content: space-around;
    }

    @include when(align-middle) {
      align-items: center;
    }
    @include when(align-bottom) {
      align-items: flex-end;
    }
  }
}
</style>
