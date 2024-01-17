<template>
  <div class="fg-pagination" :class="['__' + theme, '__' + size]">
    <button
      v-show="isMultiplePages"
      :class="['first-page', isFirstPage ? 'disabled' : 'cur']"
      @click="handleClick(isFirstPage ? null : 1)"
    >
      <FirstIconSvg :theme="theme" />
    </button>
    <div v-show="isMultiplePages" ref="pageItems" class="page-items-wrapper">
      <i
        v-for="item in showItems"
        :key="item"
        :class="item === page ? 'is-current' : ''"
        @click="handleClick(item)"
        >{{ item }}</i
      >
      <div ref="line" class="__line" />
    </div>
    <button
      v-show="isMultiplePages"
      :class="['last-page', isLastPage ? 'disabled' : 'cur']"
      @click="handleClick(isLastPage ? null : pages.length)"
    >
      <FirstIconSvg :theme="theme" />
    </button>
    <div class="prev-next-group">
      <button
        :class="['__prev', isFirstPage ? 'disabled' : 'cur']"
        @click="changePage('prev')"
      >
        <PrevNextIcon :theme="theme" />
      </button>
      <span class="__line"></span>
      <button
        :class="['__next', isLastPage ? 'disabled' : 'cur']"
        @click="changePage('next')"
      >
        <PrevNextIcon :theme="theme" />
      </button>
    </div>
  </div>
</template>

<script>
import { isFunction, toNumber } from '../../../libs/index'
import FirstIconSvg from './FirstIconSvg'
import PrevNextIcon from './PrevNextIcon'

export default {
  components: {
    FirstIconSvg,
    PrevNextIcon,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    theme: {
      type: String,
      default: 'white',
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    showNumber: {
      type: Number,
      default: 10,
    },
    size: {
      type: String,
      default: 'medium',
    },
    beforeChange: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      page: this.value,
      themeColor: this.theme,
    }
  },
  computed: {
    /**
     * page number array
     * @returns {[]}
     */
    pages() {
      const len = Math.ceil(this.total / this.pageSize)
      const arr = []
      for (let i = 1; i <= len; i++) {
        arr.push(i)
      }
      return arr
    },
    /**
     * show page item array
     * @returns {*[]}
     */
    showItems() {
      if (this.pages.length <= this.showNumber) {
        return [...this.pages]
      }
      let start = Math.max(this.page - Math.ceil(this.showNumber / 2), 0)
      const end = Math.min(this.pages.length, toNumber(this.showNumber) + start)
      if (end - start < this.showNumber) {
        start = end - this.showNumber
      }
      return this.pages.slice(start, end)
    },
    /**
     * line that current page underline
     * @returns {*}
     */
    $line() {
      return this.$refs.line
    },
    /**
     * current page is first page
     * @returns {boolean}
     */
    isFirstPage() {
      return this.page === 1
    },
    /**
     * current page is last page
     * @returns {boolean}
     */
    isLastPage() {
      return this.page === this.pages.length || this.pages.length === 0
    },
    isMultiplePages() {
      return this.pages.length > 1
    },
  },
  watch: {
    value(val) {
      if (this.page !== val) {
        this.page = val
      }
    },
    page(val) {
      this.$emit('input', val)
      this.$emit('change', val)
      this.resetLinePosition()
    },
    total() {
      // データ数が変わった時
      this.resetLinePosition()
    },
  },
  mounted() {
    this.resetLinePosition()
  },
  methods: {
    handleClick(page) {
      if (page && page !== this.page) {
        if (isFunction(this.beforeChange)) {
          this.beforeChange(
            () => {
              this.page = page
            },
            page,
            this.page
          )
          return
        }
        this.page = page
      }
    },
    changePage(type) {
      switch (type) {
        case 'prev':
          if (!this.isFirstPage) {
            this.handleClick(this.page - 1)
          }
          break
        case 'next':
          if (!this.isLastPage) {
            this.handleClick(this.page + 1)
          }
          break
      }
    },
    resetLinePosition() {
      this.$nextTick(() => {
        if (this.$refs.pageItems) {
          const pageItems = this.$refs.pageItems.querySelectorAll('i')
          const index = this.showItems.findIndex((page) => page === this.page)
          const el = pageItems[index]
          if (!el) return
          this.$line.style.width = el.offsetWidth + 'px'
          this.$line.style.transform = `translateX(${el.offsetLeft}px) scaleX(0.5)`
        }
      })
    },
  },
}
</script>

<style lang="scss">
.fg-pagination {
  display: flex;
  align-items: center;
  .cur {
    cursor: pointer;
  }
  .disabled {
    // opacity: 0.42;
    cursor: not-allowed;
  }
  .first-page,
  .last-page {
    display: inline-block;
    margin-top: -3px;
    width: 20px;
    height: $--height-mini;
    text-align: center;
    line-height: $--height-mini;
    background: none;
    border: 0;
    outline: none;
    svg {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .last-page {
    svg {
      transform: rotate(180deg);
    }
  }
  .page-items-wrapper {
    position: relative;
    i {
      display: inline-block;
      font-style: normal;
      font-size: 14px;
      margin: 0 2px;
      min-width: 20px;
      height: $--height-mini;
      line-height: $--height-mini;
      text-align: center;
      cursor: pointer;
      user-select: none;
      &.is-current {
        font-weight: bold;
      }
    }
    .__line {
      position: absolute;
      bottom: -1px;
      left: 0;
      height: 1px;
      width: 0;
      transition: all 0.2s ease-in-out;
    }
  }

  .prev-next-group {
    display: flex;
    margin-left: 15px;
    width: 57px;
    height: $--height-mini;
    font-size: 0;
    align-items: center;
    justify-content: center;
    span,
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $--height-mini;
      text-align: center;
      vertical-align: top;
      line-height: $--height-mini;
      outline: none;
      border: 0;
      &.__prev,
      &.__next {
        width: 28px;
        background: $--color-white;
      }
      &.__prev {
        border-radius: $--height-mini / 2 0 0 $--height-mini / 2;
      }
      &.__next {
        border-radius: 0 $--height-mini / 2 $--height-mini / 2 0;
        svg {
          transform: rotate(180deg);
        }
      }
      &.__line {
        width: 1px;
        background: $--color-border;
      }
    }
  }

  // theme
  &.__white {
    .page-items-wrapper {
      i {
        color: $--color-white;
      }
      .__line {
        background: $--color-white;
      }
    }
  }

  &.__blue {
    .page-items-wrapper {
      i {
        color: $--color-primary-active;
      }
      .__line {
        background: $--color-primary-active;
      }
    }
    .prev-next-group {
      button {
        box-sizing: border-box;
        border: 1px solid $--color-border;
        &.__prev {
          border-right: 0;
        }
        &.__next {
          border-left: 0;
        }
      }
    }
  }

  // size
  &.__small {
    .page-items-wrapper {
      i {
        font-size: $--font-size-12;
      }
    }
  }
}
</style>
