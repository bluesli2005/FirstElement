<template>
  <label
    class="fg-radio"
    :class="[
      border && radioSize ? 'fg-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label },
      { 'is-error': isError || !!errorMessage },
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
      class="fg-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label,
      }"
    >
      <span class="fg-radio__inner"></span>
      <input
        ref="radio"
        v-model="model"
        class="fg-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
    </span>
    <span class="fg-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
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
import Broadcaster from '../../../assets/js/broadcaster'
import { getParentComponent } from '../../../libs/index'
import { formEmitterMixin } from '../../../mixins/form-emitter'

export default {
  name: 'FgRadio',
  mixins: [Broadcaster, formEmitterMixin],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: [String, Number],
      default: '',
    },
    disabled: Boolean,
    name: {
      type: String,
      default: '',
    },
    border: Boolean,
    size: {
      type: String,
      default: '',
    },
    isError: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    errorMessageNowrap: Boolean,
  },
  data() {
    return {
      focus: false,
    }
  },
  computed: {
    radioGroup() {
      return getParentComponent.call(this, 'FgRadioGroup')
    },
    isGroup() {
      return !!this.radioGroup
    },
    model: {
      get() {
        return this.isGroup ? this.radioGroup.value : this.value
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('FgRadioGroup', 'input', [val])
        } else {
          this.$emit('input', val)
        }
        this.$refs.radio &&
          (this.$refs.radio.checked = this.model === this.label)
      },
    },
    radioSize() {
      const temRadioSize = this.size
      return this.isGroup ? this.radioGroup.size || temRadioSize : temRadioSize
    },
    isDisabled() {
      return this.isGroup
        ? this.radioGroup.disabled || this.disabled
        : this.disabled
    },
    tabIndex() {
      return this.isDisabled || (this.isGroup && this.model !== this.label)
        ? -1
        : 0
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model)
        this.emitFormChange()
        this.isGroup &&
          this.dispatch('FgRadioGroup', 'handleChange', this.model)
      })
    },
  },
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin';
@import '../../../assets/scss/function';

.fg-radio {
  position: relative;
  &.is-error {
    color: $--color-warning;
    .fg-radio__inner {
      border-color: $--color-warning;
    }
  }
  .error-message {
    padding-top: 4px;
  }
}

@include b(radio) {
  color: $--color-primary;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: $--font-size-12;
  margin-right: 30px;
  @include utils-user-select(none);

  @include when(bordered) {
    padding: 8px 20px 0 10px;
    border-radius: 4px;
    border: 1px solid $--color-border;
    box-sizing: border-box;
    height: $--height-regular;

    &.is-checked {
      border-color: $--color-primary;
    }

    &.is-disabled {
      cursor: not-allowed;
      opacity: $--color-disabled-opacity;
    }

    & + .fg-radio.is-bordered {
      margin-left: 10px;
    }
  }

  @include m(medium) {
    &.is-bordered {
      padding: 10px 20px 0 10px;
      border-radius: 4px;
      height: $--height-medium;
      .fg-radio__label {
        font-size: $--font-size-12;
      }
      .fg-radio__inner {
        height: 14px;
        width: 14px;
      }
    }
  }
  @include m(small) {
    &.is-bordered {
      padding: 8px 15px 0 10px;
      border-radius: 4px;
      height: $--height-small;
      .fg-radio__label {
        font-size: $--font-size-12;
      }
      .fg-radio__inner {
        height: 12px;
        width: 12px;
      }
    }
  }
  @include m(mini) {
    &.is-bordered {
      padding: 6px 15px 0 10px;
      border-radius: 4px;
      height: $--height-mini;
      .fg-radio__label {
        font-size: $--font-size-10;
      }
      .fg-radio__inner {
        height: 12px;
        width: 12px;
      }
    }
  }

  &:last-child {
    margin-right: 0;
  }

  @include e(input) {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;

    @include when(disabled) {
      .fg-radio__inner {
        background-color: $--color-background;
        border-color: $--color-border;
        cursor: not-allowed;

        &::after {
          cursor: not-allowed;
          background-color: $--color-background;
        }

        & + .fg-radio__label {
          cursor: not-allowed;
        }
      }
      &.is-checked {
        .fg-radio__inner {
          background-color: $--color-background;
          border-color: $--color-border;

          &::after {
            background-color: $--color-background;
          }
        }
      }
      & + span.fg-radio__label {
        color: $--color-primary-placeholder;
        cursor: not-allowed;
      }
    }

    @include when(checked) {
      .fg-radio__inner {
        border-color: $--color-border;
        &::after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
      & + .fg-radio__label {
        color: $--color-primary;
      }
    }
    @include when(focus) {
      .fg-radio__inner {
        border-color: $--color-border;
      }
    }
  }

  @include e(inner) {
    border: 1px solid $--color-border;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    background: none;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    &:hover {
      border-color: $--color-border;
    }
    &::after {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $--color-radio-checked;
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.15s ease-in;
    }
  }

  @include e(original) {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }

  &:focus:not(.is-focus):not(:active):not(.is-disabled) {
    .fg-radio__inner {
      box-shadow: 0 0 2px 2px $--color-border;
    }
  }

  @include e(label) {
    font-size: $--font-size-12;
    padding-left: 10px;
  }
}
</style>
