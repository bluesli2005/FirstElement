<template>
  <div class="fg-avatar" :style="wrapperStyle" @click="handleClick">
    <div
      :class="[
        'avatar-wrapper',
        { __clickable: clickable },
        { __fillet: fillet },
        { __bg: background },
      ]"
      :style="avatarStyle"
    >
      <div
        class="avatar-wrapper-image"
        :style="avatarStyle"
        :class="{ __circle: circle }"
        v-on="
          showType == 'image'
            ? { mouseenter: mouseEnter, mouseleave: mouseLeave }
            : {}
        "
      >
        <img :src="imgUrl" @load="handleLoad" />
      </div>
      <span
        v-if="activeFlg"
        class="activeFlg"
        :style="{ background: activeFlg }"
      ></span>
    </div>
    <div
      v-if="content"
      :class="[
        'text-wrapper',
        { 'text-flex-direction-column': textFlexDirectionColumn },
        { 'text-summary-no-offset': textSummaryNoOffset },
      ]"
      :style="textStyle"
    >
      <div
        class="__name"
        v-on="
          showType == 'name'
            ? { mouseenter: mouseEnter, mouseleave: mouseLeave }
            : {}
        "
      >
        {{ content }}
        <span v-if="data.subName" class="sub-name">{{ data.subName }}</span>
      </div>
      <div v-if="data.summary" class="__summary">{{ data.summary }}</div>
      <div class="__summary"><slot name="sub-summary"></slot></div>
    </div>
    <div
      v-if="slotVisible && $slots['sub-title']"
      :class="showType == 'image' ? 'avatar-image' : 'avatar-kana'"
    >
      <slot name="sub-title"></slot>
    </div>
  </div>
</template>

<script>
import { isNumberLike } from '../../../libs/index'
export default {
  name: 'FgAvatar',
  props: {
    src: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '37',
    },
    circle: {
      type: Boolean,
      default: true,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    fillet: {
      type: Boolean,
      default: false,
    },
    background: {
      type: Boolean,
      default: false,
    },
    nameFontWeightNormal: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    textFlexDirectionColumn: {
      type: Boolean,
      default: false,
    },
    textSummaryNoOffset: {
      type: Boolean,
      default: false,
    },
    textWidth: {
      type: String,
      default: '',
    },
    activeFlg: {
      type: String,
      default: '',
    },
    showType: {
      type: String, // showTyoe: [image, name]
      default: 'name',
    },
    // title: {
    //   type: String,
    //   default: '',
    // },
    // nameKana: {
    //   type: String,
    //   default: '',
    // },
  },
  data() {
    return {
      slotVisible: false,
      timer: null,
    }
  },
  computed: {
    imgUrl() {
      return this.src || this.data.url
    },
    wrapperStyle() {
      const ret = {}
      if (this.size) {
        ret.height = isNumberLike(this.size) ? this.size + 'px' : this.size
      }
      return ret
    },
    avatarStyle() {
      const ret = {}
      if (this.size) {
        ret.width = isNumberLike(this.size) ? this.size + 'px' : this.size
        ret.height = ret.width
        ret.flex = `0 0 ${ret.width}`
      }
      return ret
    },
    textStyle() {
      const ret = {}
      if (this.textWidth) {
        ret.maxWidth =
          this.textWidth + (isNumberLike(this.textWidth) ? 'px' : '')
      }
      ret.height = this.wrapperStyle.height
      return ret
    },
    content() {
      const { name, lastName, firstName } = this.data
      return name || [lastName, firstName].join('')
    },
  },
  methods: {
    handleLoad(e) {
      const el = e.target
      if (el.width > el.height) {
        el.style.width = 'auto'
        el.style.height = '100%'
      }
    },
    handleClick(e) {
      if (!this.clickable) return
      this.$emit('click', this.imgUrl, e)
    },
    mouseLeave() {
      if (!this.slotVisible) return
      this.clearTimeout()
      this.timer = setTimeout(() => {
        this.slotVisible = false
      }, 0)
    },
    mouseEnter() {
      this.slotVisible = true
      this.clearTimeout()
    },
    clearTimeout() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
  },
}
</script>

<style lang="scss">
.fg-avatar {
  display: inline-flex;
  align-items: center;
  font-size: 0;
  vertical-align: middle;
  position: relative;

  .avatar-image,
  .avatar-kana {
    position: absolute;
    z-index: 10;
    top: 30px;
    background: $--color-white;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(7, 134, 189, 0.3);
    font-size: 12px;
    font-weight: bold;
    border: 1px $--color-border solid;
    color: $--color-primary;

    > div {
      line-height: 20px;
      text-align: center;
      overflow: hidden;
    }

    &:before {
      position: absolute;
      z-index: 10;
      top: -3px;
      right: 50%;
      margin-left: -3px;
      content: '';
      width: 6px;
      height: 6px;
      background: $--color-white;
      border-top: 1px $--color-border solid;
      border-left: 1px $--color-border solid;
      transform: rotate(45deg);
    }
  }
  .avatar-image {
    right: 10px;
    width: 80px;
    transform: translateX(50%);
  }
  .avatar-kana {
    padding: 5px 5px;
    left: 50px;

    // > div {
    //   text-align: left;
    //   > p {
    //     white-space: pre;
    //   }
    //   .__normal {
    //     font-weight: normal;
    //     font-size: 10px;
    //   }
    // }

    &:before {
      top: -3px;
      right: 70%;
      margin-left: -3px;
    }
  }
  .avatar-wrapper {
    position: relative;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    &.__clickable {
      cursor: pointer;
    }
    &.__fillet {
      border-radius: $--border-radius-4;
    }
    &.__bg {
      background: $--color-background-hover;
    }
    &-image.__circle {
      overflow: hidden;
      display: inline-flex;
      border-radius: 50%;
    }
    img {
      width: 100%;
      height: auto;
    }
    .activeFlg {
      bottom: 0;
      right: 0;
      position: absolute;
      display: block;
      width: 10px;
      height: 10px;
      border: 1px $--color-white solid;
      border-radius: 50%;
    }
  }
  .text-wrapper {
    display: inline-flex;
    font-weight: 800;
    margin-left: 10px;
    align-items: center;
    overflow: hidden;
    .__name,
    .__summary {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      line-height: 1.4;
    }
    .__name {
      font-size: $--font-size-14;
      .sub-name {
        font-size: $--font-size-10;
      }
    }
    .__summary {
      font-size: $--font-size-10;
    }
    &.text-flex-direction-column {
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      .__summary {
        margin-left: -6px;
      }
    }
    &.text-summary-no-offset {
      .__summary {
        margin-left: 0;
      }
    }
  }
}
</style>
