<template>
  <label
    class="fg-checkbox"
    :class="['__' + theme, { 'is-error': isError || !!errorMessage }]"
  >
    <span
      class="fg-checkbox-input"
      :class="{
        __disabled: disabled,
        __checked: checked,
      }"
      @click="handleClick"
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
        :class="{ __nowrap: errorMessageNowrap }"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </label>
</template>
<script>
import { formEmitterMixin } from '../../../mixins/form-emitter'
export default {
  name: 'FgCheckbox',
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
  watch: {
    value(value) {
      this.checked = value
    },
  },
  methods: {
    handleClick(e) {
      e.stopPropagation()
    },
    handleChange(e) {
      const value = !this.checked
      if (!this.sync) this.checked = value
      this.$emit('change', value)
      this.$emit('input', value)
      this.emitFormChange()
    },
  },
}
</script>
<style lang="scss">
.fg-checkbox {
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
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
    &.__nowrap {
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

  &-inner {
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
    padding-left: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  //disable
  &.__blue,
  &.__red {
    .fg-checkbox-input.__disabled {
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
  &.__blue {
    .fg-checkbox-inner:hover {
      border-color: $--color-primary;
    }
    .fg-checkbox-input.__checked .fg-checkbox-inner {
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

  &.__red {
    .fg-checkbox-inner:hover {
      border-color: $--color-warning;
    }
    .fg-checkbox-input.__checked .fg-checkbox-inner {
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
