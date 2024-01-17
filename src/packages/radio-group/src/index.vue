<template>
  <component
    :is="_fgTag"
    class="fg-radio-group"
    :class="{ 'is-error': isError || !!errorMessage }"
    role="radioGroup"
    @keydown="handleKeydown"
  >
    <slot></slot>
    <transition name="fg-zoom-in-top">
      <div
        v-if="errorMessage"
        class="error-message"
        :class="{ __nowrap: errorMessageNowrap }"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </component>
</template>
<script>
import Broadcaster from '../../../assets/js/broadcaster'

const keyCode = Object.freeze({
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
})
export default {
  name: 'FgRadioGroup',
  mixins: [Broadcaster],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: Boolean,
    isError: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    errorMessageNowrap: Boolean,
    size: {
      type: String,
      default: '',
    },
  },
  computed: {
    _fgTag() {
      return (this.$vnode.data || {}).tag || 'div'
    },
  },
  created() {
    this.$on('handleChange', (value) => {
      this.$emit('change', value)
    })
  },
  mounted() {
    const radios = this.$el.querySelectorAll('[type=radio]')
    const firstLabel = this.$el.querySelectorAll('[role=radio]')[0]
    if (![].some.call(radios, (radio) => radio.checked) && firstLabel) {
      firstLabel.tabIndex = 0
    }
  },
  methods: {
    handleKeydown(e) {
      const target = e.target
      const className =
        target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]'
      const radios = this.$el.querySelectorAll(className)
      const length = radios.length
      const index = [].indexOf.call(radios, target)
      const roleRadios = this.$el.querySelectorAll('[role=radio]')
      switch (e.keyCode) {
        case keyCode.LEFT:
        case keyCode.UP:
          e.stopPropagation()
          e.preventDefault()
          if (index === 0) {
            roleRadios[length - 1].click()
            roleRadios[length - 1].focus()
          } else {
            roleRadios[index - 1].click()
            roleRadios[index - 1].focus()
          }
          break
        case keyCode.RIGHT:
        case keyCode.DOWN:
          if (index === length - 1) {
            e.stopPropagation()
            e.preventDefault()
            roleRadios[0].click()
            roleRadios[0].focus()
          } else {
            roleRadios[index + 1].click()
            roleRadios[index + 1].focus()
          }
          break
        default:
          break
      }
    },
  },
}
</script>

<style lang="scss">
.fg-radio-group {
  position: relative;
  /*
  .fg-radio {
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
  }
  */
  &.is-error {
    .fg-radio {
      color: $--color-warning;
      .fg-radio__inner {
        border-color: $--color-warning;
      }
    }
  }
  .error-message {
    position: absolute;
    top: 100%;
    left: 0;
    // padding-top: 2px;
    font-size: 10px;
    color: $--color-warning;
    line-height: 1;
    &.__nowrap {
      white-space: nowrap;
    }
  }
}
</style>
