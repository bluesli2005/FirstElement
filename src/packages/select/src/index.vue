<template>
  <div
    :class="[
      'fg-select',
      '__' + size,
      '__' + theme,
      disabled ? '' : '__selectable',
      clearable ? '__clearable' : '',
      isNonEmpty ? 'is-non-empty' : '',
    ]"
    :style="elStyle"
    @mouseenter="isLeaved = false"
    @mouseleave="isLeaved = true"
    @click="toggleList"
  >
    <fg-input
      :value="selectText"
      :placeholder="placeholder"
      :size="size"
      :readonly="!filterable"
      :clearable="clearable"
      :icon-color="iconColor"
      :disabled="disabled"
      :unit="unit"
      :width="width"
      :offset-left="offsetLeft"
      :offset-right="offsetRight"
      :is-error="isError"
      :error-message="errorMessage"
      :error-message-nowrap="errorMessageNowrap"
      @clear="inputClear"
      @input.native="handleInput"
    >
      <template v-slot:prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-slot:suffix>
        <i :class="['__arrow', popVisible ? 'is-show' : '']">
          <fg-icon name="arrow-down" :color="iconColor" />
        </i>
      </template>
    </fg-input>
    <slot></slot>
    <Popup
      ref="popup"
      v-model="popVisible"
      :class="[
        'fg-select-popup-wrapper',
        '__' + size,
        '__' + theme,
        popupClass,
      ]"
      :position="popupPosition"
      :offset="popupOffset"
      @mouseenter.native="isLeaved = false"
      @mouseleave.native="isLeaved = true"
      @click.native="$emit('click', $event)"
    >
      <slot name="options"></slot>
      <dl v-if="!$slots.options">
        <template v-for="(item, i) in list">
          <dt v-if="item.title" :key="i" class="__title">
            <div>{{ item.title }}</div>
          </dt>
          <dd
            v-else
            :key="i"
            :class="[
              '__item',
              selectValue === item.value ? '__selected' : '',
              item.disabled ? '__disabled' : 'cur',
            ]"
            :title="item.text"
            @click="handleSelect(item, $event)"
          >
            <div>{{ addPrefix(item.text) }}</div>
          </dd>
        </template>
      </dl>
    </Popup>
  </div>
</template>

<script>
import Popup from '../../popup/index'
import { isFunction, isNumberLike } from '../../../libs/index'
import { formEmitterMixin } from '../../../mixins/form-emitter'
import Mixin from './mixin'

export default {
  name: 'FgSelect',
  components: {
    Popup,
  },
  mixins: [Mixin, formEmitterMixin],
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    placeholder: {
      type: String,
      default: '選択してください',
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    size: {
      type: String,
      default: 'regular',
    },
    textSize: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'default',
    },
    disabled: Boolean,
    inline: Boolean,
    itemPrefix: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: '',
    },
    unit: {
      type: String,
      default: '',
    },
    clearable: Boolean,
    popupClass: {
      type: String,
      default: '',
    },
    popupPosition: {
      type: String,
      default: '',
    },
    filterable: Boolean,
    customFilter: {
      type: Function,
      default: undefined,
    },
    offsetLeft: {
      type: Number,
      default: 0,
    },
    offsetRight: {
      type: Number,
      default: 20,
    },
    popupOffset: {
      type: [Number, String],
      default: undefined,
    },
    isError: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    errorMessageNowrap: Boolean,
  },
  data() {
    const item = this.items.find((item) => item.value === this.value) || {}
    const { white, primaryActive, border } = this.$colors
    return {
      list: this.items,
      popVisible: false,
      selectText: item.text,
      selectValue: this.value,
      clearVisible: true,
      iconColors: {
        default: primaryActive,
        'light-blue': primaryActive,
        transparent: white,
        disabled: border,
      },
      timer: null,
      isLeaved: true,
    }
  },
  computed: {
    iconColor() {
      return this.disabled
        ? this.iconColors.disabled
        : this.iconColors[this.theme]
    },
    elStyle() {
      const ret = {}
      if (this.width) {
        ret.width = this.width + (isNumberLike(this.width) ? 'px' : '')
      }
      if (this.inline) {
        ret.display = 'inline-flex'
      }
      return ret
    },
    isNonEmpty() {
      return !!this.selectText
    },
  },
  watch: {
    items(val) {
      this.list = val
    },
    value(val) {
      if (this.selectValue !== val) {
        const item = this.items.find((item) => item.value === this.value) || {}
        this.selectValue = val
        this.selectText = item.text
      }
    },
    selectValue(val) {
      this.$emit('input', val)
    },
    popVisible(val) {
      this.$emit('pop-visible', val)
    },
  },
  methods: {
    toggleList(e) {
      e.stopPropagation()
      if (this.disabled) return
      if (!this.popVisible) {
        let timer = setTimeout(() => {
          this.popVisible = true
          clearTimeout(timer)
          timer = null
        }, 0)
      } else {
        this.popVisible = false
      }
    },
    handleSelect(item, e) {
      if (item.disabled) {
        e.stopPropagation()
        return
      }
      e.stopPropagation()
      this.selectText = item.text
      this.selectValue = item.value
      this.popVisible = false
      this.$emit('change', item)
      this.emitFormChange()
    },
    addPrefix(t) {
      return this.itemPrefix + t
    },
    inputClear() {
      this.selectText = ''
      this.selectValue = ''
      // reset list
      this.list = this.items
      // emit change
      this.$emit('change', null)
      this.emitFormChange()
    },
    handleInput(e) {
      if (!this.filterable) return
      const value = e.target.value
      // default filter
      const reg = new RegExp(value, 'i')
      this.list = !value
        ? this.items
        : this.items.filter((item, i) => {
            // custom filter
            return isFunction(this.customFilter)
              ? this.customFilter(value, item, i)
              : reg.test(item.text)
          })
    },
    resetPopPosition() {
      this.$refs.popup.resetPopPosition()
    },
  },
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin';

.fg-select {
  position: relative;
  .cur {
    cursor: pointer;
  }
  i.__arrow {
    display: inline-flex;
    align-items: center;
    font-size: 0;
    .fg-icon {
      transition: all 0.2s ease-in-out;
    }
    justify-content: center;
    &.is-show {
      .fg-icon {
        transform: rotate(-180deg);
      }
    }
  }

  &.__selectable {
    .fg-input input {
      cursor: pointer;
    }
  }

  // theme
  &.__light-blue {
    .fg-input input {
      border-color: $--color-background;
      background: $--color-background;
      color: $--color-primary-active;
      &::placeholder {
        color: $--color-primary-placeholder;
      }
    }
    i.__clear {
      &:before,
      &:after {
        background: $--color-primary-active;
      }
    }
  }

  &.__transparent {
    .fg-input input {
      border: 1px solid $--color-white;
      background: none;
      color: $--color-white;
      &::placeholder {
        color: $--color-white;
        opacity: 0.5;
      }
    }
    i.__clear {
      &:before,
      &:after {
        background: $--color-white;
      }
    }
  }

  &.__clearable.__selectable.is-non-empty {
    &:hover {
      .__arrow {
        display: none;
      }
      .__clear {
        display: block;
      }
    }
  }
}

@mixin sizeMixin($height, $fontSize) {
  .result-wrapper {
    height: $height;
    span {
      margin-left: 10px;
      font-size: $fontSize;
    }
  }
}

// size
.__medium {
  @include sizeMixin($--height-medium, $--font-size-12);
}

.__small {
  @include sizeMixin($--height-small, $--font-size-10);
}

.__mini {
  @include sizeMixin($--height-mini, $--font-size-10);
}

.fg-select-popup-wrapper {
  dl {
    min-height: 35px;
    max-height: 300px;
    overflow-y: auto;
    color: $--color-primary;
    margin: 2px 2px 2px 0;
    padding: 5px 0;
    @include scrollbar();
  }
  dt,
  dd {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 18px;
    white-space: nowrap;
    cursor: pointer;
    div {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  dt {
    position: relative;
    margin: 6px 0;
    font-size: 10px;
    line-height: 24px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 1px solid $--color-border;
      transform: scaleY(0.5);
    }
  }
  dd {
    font-size: $--font-size-12;
    line-height: 24px;
    &:hover {
      background: $--color-background;
    }
    &.__disabled {
      opacity: 0.5;
      cursor: default;
    }
    &.__selected {
      background: $--color-background-hover;
    }
  }

  // theme
  &.__light-blue {
    color: $--color-primary-active;
  }

  // size
  &.__medium {
    dt,
    dd {
      padding: 0 10px;
    }
  }

  &.__small {
    dt,
    dd {
      padding: 0 10px;
    }
  }

  &.__mini {
    dt,
    dd {
      padding: 0 10px;
    }
  }
}
</style>
