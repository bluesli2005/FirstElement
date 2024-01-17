<template>
  <div ref="el" class="fg-message-box" :class="{ 'is-show': visible }">
    <div class="fg-message-box__inner" :style="innerStyle">
      <div class="__header"></div>
      <div class="__body">
        <div class="icon-wrapper" :style="'border-color:' + iconInfo.color">
          <FgIcon
            :name="iconInfo.name"
            :color="iconInfo.color"
            :size="iconInfo.size"
          ></FgIcon>
        </div>
        <div v-show="dialogType === 'success' || dialogType === 'error'">
          <div class="hero-message-wrapper">
            <p
              v-for="(p, i) in content"
              :key="i"
              :style="'color:' + iconInfo.color"
            >
              {{ p }}
            </p>
          </div>
        </div>
        <div
          v-show="dialogType === 'alert' || dialogType === 'confirm'"
          class="content-wrapper"
        >
          <p v-for="(p, i) in content" :key="i">{{ p }}</p>
        </div>
      </div>
      <div class="__footer">
        <FgButton :type="okBtnType" @click="handleClick('ok')">{{
          okBtnText
        }}</FgButton>
        <FgButton
          v-if="dialogType === 'confirm'"
          :type="cancelBtnType"
          border
          @click="handleClick('cancel')"
          >{{ cancelBtnText }}</FgButton
        >
      </div>
    </div>
    <div class="fg-message-box__background" :style="maskStyle"></div>
  </div>
</template>
<script>
import FgButton from '../../button/index'
import FgIcon from '../../icon/index'
import { resetZIndex } from '../../../libs/index'
export default {
  name: 'FgMessageBox',
  components: {
    FgButton,
    FgIcon,
  },
  props: {},
  data() {
    return {
      visible: false,
      message: '',
      dialogType: 'alert',
      type: 'warning',
      okBtnText: 'ok',
      okBtnType: 'primary',
      cancelBtnText: 'キャンセル',
      cancelBtnType: 'primary',
      maskColor: '',
      maskOpacity: '',
      boxShadow: '',
    }
  },
  computed: {
    content() {
      if (!Array.isArray(this.message)) {
        return [this.message]
      }
      return this.message
    },
    el() {
      return this.$refs.el
    },
    innerStyle() {
      const ret = {}
      if (this.boxShadow) {
        ret.boxShadow = this.boxShadow
      }
      return ret
    },
    maskStyle() {
      const ret = {}
      if (this.maskColor) {
        ret.backgroundColor = this.maskColor
      }
      if (this.maskOpacity) {
        ret.opacity = this.maskOpacity
      }
      return ret
    },
    iconInfo() {
      const { warning, primary } = this.$colors
      let name = 'exclamation'
      let color = warning
      let size = 8
      switch (this.dialogType) {
        case 'success':
          color = primary
          name = 'success'
          size = 55
          break
      }
      return {
        name,
        color,
        size,
      }
    },
  },
  watch: {
    visible(val) {
      if (val) {
        resetZIndex(this.el)
      }
    },
  },
  methods: {
    handleClick(type) {
      this.callback(type)
    },
  },
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin';
.fg-message-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
  overflow: hidden;
  .fg-message-box__inner {
    position: relative;
    z-index: 1;
    text-align: center;
    width: 560px;
    max-width: 90%;
    background: $--color-white;
    border-radius: $--border-radius-6;
    box-shadow: 0 5px 10px $--color-shadow-primary;
    overflow: hidden;
    transform: scale(0);
    opacity: 0;
    transition: inherit;
    .icon-wrapper {
      margin: 40px auto 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 55px;
      height: 55px;
      border: 2px solid $--color-border;
      border-radius: 50%;
    }
    .hero-message-wrapper {
      margin-top: -20px;
      margin-bottom: 60px;
      p {
        font-weight: 500;
        &:first-child {
          margin-bottom: 30px;
        }
        &:nth-child(2) {
          color: $--color-primary !important;
          font-weight: 300;
          font-size: 12px;
          margin-bottom: -30px;
        }
      }
    }
    .content-wrapper {
      margin: 0 50px;
      padding-bottom: 20px;
      // text-align: left;
      p {
        margin: 0;
        padding: 0;
        line-height: 24px;
        font-size: 12px;
        color: $--color-primary;
      }
    }
    .__footer {
      position: relative;
      padding: 20px;
      display: flex;
      justify-content: center;
      @include borderTop();
      .fg-button {
        margin: 0 10px;
        flex: 1;
        max-width: 50%;
      }
    }
  }
  .fg-message-box__background {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: $--color-primary-active;
    transition: inherit;
    overflow: hidden;
  }
}
.fg-message-box.is-show {
  pointer-events: auto;
  .fg-message-box__inner {
    transform: scale(1);
    opacity: 1;
  }
  .fg-message-box__background {
    opacity: 0.5;
  }
}
</style>
