<template>
  <div
    :class="[
      'fg-multi-select',
      '__' + size,
      '__' + theme,
      disabled ? '' : '__selectable',
      clearable ? '__clearable' : '',
      isNonEmpty ? 'is-non-empty' : '',
    ]"
    :style="elStyle"
    @mouseenter="isLeaved = false"
    @mouseleave="isLeaved = true"
    @click="toggleList($event)"
  >
    <fg-input
      :value="selectText.join(',')"
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
        'fg-multi-select-popup-wrapper',
        '__' + size,
        '__' + theme,
        popupClass,
      ]"
      :position="popupPosition"
      :offset="popupOffset"
      :doc-auto-closed="false"
      @mouseenter.native="isLeaved = false"
      @mouseleave.native="isLeaved = true"
    >
      <slot name="options"></slot>
      <div v-if="!$slots.options" :style="{ width: popupWidth }">
        <div class="__checkall ml10 mr10">
          <fg-checkbox
            v-if="isShowAllLabel"
            key="checbox-all"
            :value="checkAll"
            class="pt10 pb10"
            label="全て"
            @change="handleChangeAll"
          />
        </div>
        <div class="__checklist ml10 mr10" :style="popStyle">
          <template v-for="(item, i) in selectedList">
            <p :key="`p-${i}`" class="pt10 pb10 pr20" @click="handleClick">
              <fg-checkbox
                :key="i"
                :value="item.checked"
                :label="item.text"
                @change="handleChange(item)"
              />
            </p>
          </template>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import Popup from '../../popup/index'
import { isNumberLike } from '../../../libs/index'
import { formEmitterMixin } from '../../../mixins/form-emitter'
import Mixin from './mixin'

export default {
  name: 'FgMultiSelect',
  components: {
    Popup,
  },
  mixins: [Mixin, formEmitterMixin],
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
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
    popWidth: {
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
    isShowAllLabel: {
      type: Boolean,
      default: true,
    },
    popupWidth: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {
      list: this.items,
      popVisible: false,
      selectText: [],
      selectValue: this.value,
      iconColors: {
        default: this.$colors.primary,
        'light-blue': this.$colors.primaryActive,
        transparent: this.$colors.white,
      },
      timer: null,
      isLeaved: true,
      checkAll: false,
    }
  },
  computed: {
    selectedList() {
      return this.list.map((item) => {
        return {
          ...item,
          checked: this.selectValue.includes(item.value),
        }
      })
    },
    iconColor() {
      return this.iconColors[this.theme]
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
    popStyle() {
      const ret = {}
      if (this.popWidth) {
        ret.width = this.popWidth + (isNumberLike(this.popWidth) ? 'px' : '')
      }
      // if (this.inline) {
      //   ret.display = 'inline-flex'
      // }
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
    selectValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value(val) {
      this.selectText = []
      if (val && Array.isArray(val)) {
        this.selectValue = val
        this.list.forEach((item) => {
          if (val.includes(item.value)) {
            this.selectText.push(item.text)
          }
        })
      }

      // if (this.selectValue !== val) {
      //   this.selectValue = []
      //   this.selectText = []
      // }
    },
  },
  mounted() {
    this.initSelectedItem()
  },
  methods: {
    toggleList() {
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
    addPrefix(t) {
      return this.itemPrefix + t
    },
    resetPopPosition() {
      this.$refs.popup.resetPopPosition()
    },
    initSelectedItem() {
      if (!Array.isArray(this.list)) return
      this.selectedList.forEach((item) => {
        if (item.checked) {
          this.selectText.push(item.text)
        }
      })
    },
    handleChangeAll() {
      if (!this.checkAll) {
        this.checkAll = true
        this.selectText = []
        this.selectValue = []
        this.list.forEach((item) => {
          item.checked = true
          this.selectText.push(item.text)
          this.selectValue.push(item.value)
        })
      } else {
        this.checkAll = false
        this.list.map((item) => {
          return {
            ...item,
            checked: false,
          }
        })
        this.selectText = []
        this.selectValue = []
      }
    },
    handleChange(select) {
      this.popVisible = true
      if (select.checked !== true) {
        this.selectText.push(select.text)
        if (!this.selectValue.includes(select.value)) {
          this.selectValue.push(select.value)
        }
      } else {
        this.checkAll = false
        this.selectText = this.selectText.filter((item) => {
          return item !== select.text
        })
        this.selectValue = this.selectValue.filter((item) => {
          return item !== select.value
        })
      }
    },
    handleClick(e) {
      e.stopPropagation()
    },
  },
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin';

.fg-popup {
  & .__checklist {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    max-width: 300px;

    p {
      line-height: 20px;
      padding: 10px 20px 10px 0;
    }
  }
}

.fg-multi-select {
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
  max-height: 300px;
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
