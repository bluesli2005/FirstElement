<template>
  <fg-dialog
    v-model="visible"
    class="fg-image-processor-cropper"
    persistent
    max-width="400px"
    :title="title"
  >
    <div class="picture-wrapper has-animation">
      <div ref="cropBox" class="picture-inner-wrapper"></div>
      <img ref="img" :src="url" alt="" />
    </div>
    <div class="scale-ctrl-wrapper">
      <fg-icon
        name="magnifier-less"
        @click.native="handleScale(false)"
      ></fg-icon>
      <div class="scale-bar has-animation">
        <button ref="barCtrlBtn" />
        <i ref="scaleBar" />
      </div>
      <fg-icon
        name="magnifier-plus"
        @click.native="handleScale(true)"
      ></fg-icon>
    </div>
    <div class="btn-wrapper">
      <fg-button width="240px" type="primary" @click="save">保存</fg-button>
    </div>
  </fg-dialog>
</template>

<script>
import { getStyleValue } from '../../../../libs/index'
import cropperMixin, { resetCropImagePosition } from './mixin'
import {
  resetImageAttrs,
  SCALE_BAR_BTN_HALF_WIDTH,
  setElStyles,
} from './helper'

export default {
  name: 'FgImageProcessorCropper',
  mixins: [cropperMixin],
  props: {
    value: Boolean,
    title: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: this.value,
      imageInfo: {},
    }
  },
  watch: {
    value(val) {
      if (this.visible !== val) {
        this.visible = val
      }
      if (!val) {
        resetImageAttrs(this.$refs.img)
      }
    },
    visible(val) {
      this.$emit('input', val)
    },
  },
  methods: {
    handleScale(isPlus) {
      const perChangePx = isPlus ? 30 : -30
      // scale bar
      const $bar = this.$refs.scaleBar
      const $barCtrlBtn = this.$refs.barCtrlBtn
      const maxWidth = getStyleValue($bar.parentElement, 'width', true)
      let currentWidth = getStyleValue($bar, 'width', true) + perChangePx
      if (currentWidth < 0) {
        currentWidth = 0
      }
      if (currentWidth > maxWidth) {
        currentWidth = maxWidth
      }
      setElStyles($bar, {
        width: currentWidth,
      })

      // reset crop image position
      const $img = this.$refs.img
      this.imageInfo.width = getStyleValue($img, 'width', true)
      this.imageInfo.height = getStyleValue($img, 'height', true)
      this.imageInfo.left = getStyleValue($img, 'left', true)
      this.imageInfo.top = getStyleValue($img, 'top', true)
      resetCropImagePosition(
        $img,
        this.$refs.cropBox,
        this.imageInfo,
        currentWidth / maxWidth
      )

      // scale ctrl btn
      let currentLeft = getStyleValue($barCtrlBtn, 'left', true) + perChangePx
      if (currentLeft < -SCALE_BAR_BTN_HALF_WIDTH) {
        currentLeft = -SCALE_BAR_BTN_HALF_WIDTH
      }
      if (currentLeft > maxWidth - SCALE_BAR_BTN_HALF_WIDTH) {
        currentLeft = maxWidth - SCALE_BAR_BTN_HALF_WIDTH
      }
      setElStyles($barCtrlBtn, {
        left: currentLeft,
      })
    },
    save() {
      const box = this.$refs.cropBox.getBoundingClientRect()
      const $img = this.$refs.img
      const imgLeft = Math.abs(getStyleValue($img, 'left', true))
      const imgTop = Math.abs(getStyleValue($img, 'top', true))
      const imgWidth = getStyleValue($img, 'width', true)
      const radio = $img.naturalWidth / imgWidth
      const cropInfo = {
        sx: imgLeft * radio,
        sy: imgTop * radio,
        sw: box.width * radio,
        sh: box.height * radio,
      }
      this.$emit('change', cropInfo)
      resetImageAttrs($img)
    },
  },
}
</script>

<style lang="scss">
.fg-image-processor-cropper {
  .picture-wrapper {
    width: 400px;
    height: 400px;
    overflow: hidden;
    background: #333;
    position: relative;
    .picture-inner-wrapper {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('../img/crop-mask.svg') no-repeat center center;
      background-size: cover;
      cursor: move;
    }
    img {
      position: absolute;
      z-index: 0;
    }
    &.has-animation {
      img {
        transition: all 0.2s ease-in-out;
      }
    }
  }
  .scale-ctrl-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 40px 0;
    height: 15px;
    .fg-icon {
      flex: 0 0 14px;
      cursor: pointer;
      user-select: none;
      svg {
        color: $--color-primary-placeholder !important;
      }
      &:active {
        svg {
          color: mix(#000, $--color-primary-placeholder, 30) !important;
        }
      }
    }
    .scale-bar {
      position: relative;
      margin: 0 12px;
      height: 15px;
      flex: 1;
      > button {
        position: absolute;
        top: 0;
        left: -7.5px;
        z-index: 2;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        width: 15px;
        height: 15px;
        border: 3px solid $--color-primary-active;
        background: $--color-white;
        border-radius: 50%;
        cursor: move;
        outline: none;
        &:active {
          border-color: $--color-primary;
        }
      }
      > i {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 6px;
        display: block;
        height: 3px;
        border-radius: 2px;
        background: $--color-primary-active;
      }
      &:before {
        content: '';
        position: absolute;
        z-index: 0;
        left: 0;
        top: 6px;
        display: block;
        width: 100%;
        height: 3px;
        border-radius: 2px;
        background: $--color-primary-active;
        opacity: 0.5;
      }
    }
    .has-animation {
      > button {
        transition: left 0.2s ease-in-out;
      }
      > i {
        transition: width 0.2s ease-in-out;
      }
    }
  }
  .scale-ctrl-wrapper .scale-bar.is-move {
    > button,
    > i {
      transition: none;
    }
  }
  .btn-wrapper {
    margin: 28px auto 38px;
    text-align: center;
  }
}
</style>
