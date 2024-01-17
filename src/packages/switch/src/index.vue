<template>
  <div
    class="fg-switch"
    :class="[
      disabled ? '__disabled' : '',
      checked ? '__checked' : '',
      size ? '__' + size : '',
    ]"
    role="switch"
    @click.prevent="switchValue"
  >
    <input
      ref="input"
      class="fg-switch-input"
      type="checkbox"
      :checked="value"
      :disabled="switchDisabled"
      @change="handleChange"
      @keydown.enter="switchValue"
    />
    <span ref="core" class="fg-switch-core">
      <span class="fg-switch-core-button"></span>
    </span>
    <h4 v-if="label !== ''" class="fg-switch-label">{{ label }}</h4>
  </div>
</template>
<script>
export default {
  name: 'FgSwitch',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      checked: this.value,
    }
  },
  computed: {
    switchDisabled() {
      return this.disabled
    },
  },
  watch: {
    value(val) {
      this.checked = val
    },
  },
  methods: {
    handleChange(event) {
      const val = !this.checked
      if (!this.sync) {
        this.checked = val
      }
      this.$emit('input', val)
      this.$emit('change', val)
    },
    switchValue() {
      !this.switchDisabled && this.handleChange()
    },
  },
}
</script>
<style lang="scss" scoped>
.fg-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  height: 26px;
  line-height: 20px;
  vertical-align: middle;

  &-label {
    transition: 0.2s;
    margin-left: 10px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    vertical-align: middle;
    color: $--color-primary;
  }

  &-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }

  &-core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 60px;
    height: 26px;
    overflow: hidden;
    outline: none;
    border-radius: 13px;
    box-sizing: border-box;
    background: $--color-border;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;

    &-button {
      position: absolute;
      top: 4px;
      left: 6px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 18px;
      height: 18px;
      background-color: $--color-white;
      box-shadow: 0 0 2px 2px $--color-shadow-gray;

      &:after {
        content: 'NO';
        font-size: 12px;
        font-weight: bold;
        color: $--color-primary-active;
        position: absolute;
        left: 22px;
      }
    }
  }

  &.__checked {
    .fg-switch-core {
      background-color: $--color-primary-active;

      &-button {
        left: 100%;
        margin-left: -24px;

        &:before {
          content: 'YES';
          font-size: 12px;
          font-weight: bold;
          color: $--color-white;
          position: absolute;
          left: -28px;
        }
      }
    }
  }

  &.__disabled {
    opacity: 0.6;

    .fg-switch-core,
    .fg-switch-label {
      cursor: not-allowed;
    }
  }

  &.__small {
    width: 42px;
    height: 16px;
    .fg-switch-core {
      width: 42px;
      height: 16px;
      line-height: 16px;
      border-radius: 8px;
    }
    .fg-switch-core-button {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      top: 3px;
      left: 3px;

      &:after {
        content: 'なし';
        width: 20px;
        display: block;
        font-size: 9px;
        left: 14px;
        top: -2px;
      }
    }
  }
  &.__checked.__small {
    .fg-switch-core-button {
      left: 100%;
      margin-left: -13px;

      &:before {
        content: 'あり';
        font-size: 9px;
        font-weight: normal;
        position: absolute;
        left: -25px;
        top: -2px;
      }
    }
  }
}
</style>
