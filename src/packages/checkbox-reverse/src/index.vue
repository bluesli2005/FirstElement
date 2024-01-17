<template>
  <label
    class="fg-checkbox"
    :class="['fg-checkbox--' + theme, { 'is-error': required }]"
  >
    <span
      class="fg-checkbox-input"
      :class="{
        disabled: disabled,
        checked: checked,
      }"
      @click="handleClickRadioBtn"
    >
      <span class="fg-checkbox-inner"></span>
      <input
        class="fg-checkbox-original"
        type="checkbox"
        :disabled="disabled"
        :value="value"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span v-if="label" class="fg-checkbox-label">
      {{ label }}
    </span>
    <slot></slot>
    <transition name="fg-zoom-in-top">
      <div
        v-if="errorMessage"
        class="error-message"
        :class="{ 'error-message--error': errorMessageNowrap }"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </label>
</template>
<script>
import { formEmitterMixin } from '../../../mixins/form-emitter'
export default {
  name: 'FgCheckboxReverse',
  mixins: [formEmitterMixin],
  props: {
    value: {
      type: [Boolean, Number, String],
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'blue',
    },
    isError: Boolean,
    errorMessageNowrap: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      checked: !!this.value,
      selfModel: false,
      focus: false,
      isLimitExceeded: false,
    }
  },
  computed: {
    required() {
      return this.isError || !!this.errorMessage
    },
  },
  watch: {
    value(value) {
      this.checked = value
    },
  },
  methods: {
    handleClickRadioBtn(e) {
      // the click event's propagation will be stopped
      e.stopPropagation()
    },
    handleChange() {
      const value = !this.checked
      this.$emit('change', value)
      this.$emit('input', value)
      this.emitFormChange()
    },
  },
}
</script>
<style lang="scss" scoped>
.fg-checkbox {
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  border-radius: 3px;
  vertical-align: middle;

  &.is-error {
    color: $--color-warning;
    .fg-checkbox-inner {
      border-color: $--color-warning;
    }
    .fg-checkbox-label {
      color: $--color-warning !important;
    }
  }
  .error-message {
    position: absolute;
    top: 100%;
    left: 0;
    padding-top: 4px;
    font-size: 10px;
    color: $--color-warning;
    line-height: 1;
    font-weight: normal;
    &--error {
      white-space: nowrap;
    }
  }

  &-input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
  }

  .fg-checkbox-inner {
    height: 15px;
    width: 15px;
    display: inline-block;
    position: relative;
    border: 1px solid $--color-border;
    border-radius: 2px;
    box-sizing: border-box;
    background-color: $--color-white;
    transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);

    &:after {
      box-sizing: content-box;
      content: '';
      border: 2px solid $--color-white;
      border-left: 0;
      border-top: 0;
      height: 6px;
      left: 4px;
      position: absolute;
      top: 1px;
      transform: rotate(45deg) scaleY(0);
      width: 4px;
      transition: transform 0.15s ease-in 0.05s;
      transform-origin: center;
    }
  }

  &-original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }
  &-label {
    display: inline-flex;
    padding-right: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  //disable
  &--blue,
  &--red {
    .fg-checkbox-input.disabled {
      .fg-checkbox-inner {
        opacity: 0.5;

        &:hover {
          border-color: $--color-border;
          cursor: not-allowed;
        }
      }
    }
  }
  //theme
  &--blue {
    .fg-checkbox-inner:hover {
      border-color: $--color-primary;
    }
    .fg-checkbox-input.checked .fg-checkbox-inner {
      background-color: $--color-primary;
      border-color: $--color-primary;
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }

    .fg-checkbox-label {
      color: $--color-primary;
    }
  }

  &--red {
    .fg-checkbox-inner:hover {
      border-color: $--color-warning;
    }
    .fg-checkbox-input.checked .fg-checkbox-inner {
      background-color: $--color-warning;
      border-color: $--color-warning;
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }
    .fg-checkbox-label {
      color: $--color-warning;
    }
  }
}
</style>
