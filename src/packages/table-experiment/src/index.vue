<template>
  <div
    :class="[
      'fg-table-experiment',
      rounded ? 'rounded' : '',
      headBottomBorder ? 'head-bottom-border' : '',
      headFontWeightNormal ? 'head-font-weight-normal' : '',
      headBackground ? 'head-background' : '',
      '__' + padding,
      stripe ? '__stripe' : '',
      border ? '__border' : '',
      tdSpaceVerticalLine ? 'td-space-vertical-line' : '',
      '__' + size,
      bottomRounded ? 'bottom-rounded' : '',
      tdBottomBorder ? 'td-bottom-border' : '',
      smallHeader ? 'small-header' : '',
    ]"
  >
    <div class="table-head-wrapper" :style="{ paddingRight: headOffsetRight }">
      <table class="fg-table-experiment__table" cellpadding="0" cellspacing="0">
        <colgroup>
          <col v-for="(width, i) in headWidthList" :key="i" :width="width" />
        </colgroup>
        <thead ref="head">
          <tr>
            <th
              v-for="(item, i) in headers"
              :key="i"
              :class="[item.align ? 'is-' + item.align : 'is-center']"
            >
              <SortTh
                v-if="item.sortable"
                :item="item"
                :value="item.defaultSort"
                @change="sortChange"
              >
                {{ item.text }}
              </SortTh>
              <div v-else class="table-th-item">
                {{ item.text }}
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      class="table-body-wrapper"
      :style="{
        height: bodyHeight,
        minHeight: bodyMinHeight,
        maxHeight: bodyMaxHeight,
      }"
    >
      <div v-show="isEmpty" class="empty-content-wrapper">
        <slot name="placeholder"></slot>
        {{ placeholder }}
      </div>
      <table class="fg-table-experiment__table" cellpadding="0" cellspacing="0">
        <colgroup>
          <col v-for="(width, i) in headWidthList" :key="i" :width="width" />
        </colgroup>
        <tbody ref="body">
          <slot></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SortTh from './sort-th'
export default {
  name: 'FgTableExperiment',
  components: {
    SortTh,
  },
  props: {
    headers: {
      type: Array,
      default() {
        return []
      },
    },
    list: {
      type: Array,
      default() {
        return []
      },
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    headBottomBorder: {
      type: Boolean,
      default: false,
    },
    headFontWeightNormal: {
      type: Boolean,
      default: false,
    },
    headBackground: {
      type: Boolean,
      default: false,
    },
    bodyHeight: {
      type: String,
      default: null,
    },
    bodyMinHeight: {
      type: String,
      default: null,
    },
    bodyMaxHeight: {
      type: String,
      default: null,
    },
    padding: {
      type: String,
      default: 'lr10',
    },
    border: Boolean,
    stripe: Boolean,
    tdSpaceVerticalLine: Boolean,
    tdBottomBorder: Boolean,
    size: {
      type: String,
      default: 'medium',
    },
    bottomRounded: Boolean,
    placeholder: {
      type: String,
      default: 'データはありません',
    },
    smallHeader: Boolean,
  },
  data() {
    const headWidthList = this.headers.map((item) => item.width)
    return {
      headWidthList,
      headOffsetRight: '0',
    }
  },
  computed: {
    isEmpty() {
      return this.list.length === 0
    },
  },
  watch: {
    list() {
      this.initTableItemWidth()
    },
  },
  mounted() {
    this.initTableItemWidth()
  },
  methods: {
    initTableItemWidth() {
      let timer = setTimeout(() => {
        const head = this.$refs.head
        if (!head) return
        const headWidth = head.offsetWidth
        const body = this.$refs.body
        const bodyWidth = body.offsetWidth
        // reset head offset right when body has scroll bar
        this.headOffsetRight = headWidth - bodyWidth + 'px'
        // reset th and td width from th width
        if (body.children[0]) {
          // from td width
          this.headWidthList = [...body.children[0].querySelectorAll('td')].map(
            (el) => el.offsetWidth
          )
        }
        clearTimeout(timer)
        timer = null
      }, 0)
    },
    sortChange(sort, item) {
      this.$emit('sort-change', item.field, sort)
    },
  },
}
</script>

<style lang="scss">
.fg-table-experiment {
  // thead wrapper
  .table-head-wrapper {
    background: $--color-white;
  }
  // tbody wrapper
  .table-body-wrapper {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    background: $--color-white;
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $--color-background-hover;
      cursor: pointer;
      border-radius: 2px;
      border: 1px solid $--color-white;
    }
    .empty-content-wrapper {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      background: $--color-white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  }
  // inner common style
  .cur {
    cursor: pointer;
  }
  .high-light {
    td,
    th {
    }
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // table
  table {
    width: 100%;
    border: 0;
    th,
    td {
      text-align: center;
      &.is-left {
        text-align: left;
      }
      &.is-right {
        text-align: right;
      }
    }
  }

  th {
    height: 40px;
    font-size: 12px;
  }
  td {
    font-size: 12px;
    position: relative;
  }
  tbody {
    tr {
      &:hover td {
        background: $--color-background-hover;
      }
    }
  }

  // border radius
  &.rounded {
    border-radius: 5px;
    overflow: hidden;
  }

  &.bottom-rounded {
    border-radius: 0 0 4px 4px;
    overflow: hidden;
  }

  // head-bottom-border
  &.head-bottom-border {
    .table-head-wrapper {
      border-bottom: 1px solid $--color-border;
    }
  }
  // head font weight normal
  &.head-font-weight-normal {
    th {
      font-weight: normal;
    }
  }

  &.head-background {
    th {
      background: $--color-background;
    }
  }

  &.__border {
    border: 1px solid $--color-border;
    border-top: 0;
    th,
    td {
      border-top: 1px solid $--color-border;
    }
  }

  &.td-bottom-border {
    tr {
      td {
        border-bottom: 1px solid $--color-border;
      }
      &:last-child td {
        border-bottom: 0;
      }
    }
  }

  &.__stripe {
    tbody {
      tr {
        &:nth-child(2n) {
          background: $--color-background;
        }
      }
    }
  }

  &.td-space-vertical-line {
    tbody {
      td {
        &:before {
          position: absolute;
          top: 10px;
          bottom: 10px;
          left: 0;
          content: '';
          background: $--color-border;
          width: 1px;
        }
        &:first-child {
          &:before {
            background: none;
          }
        }
      }
    }
  }

  // size
  &.__medium {
    td {
      height: 70px;
    }
  }

  &.__small {
    .empty-content-wrapper {
      font-size: 12px;
    }
    td {
      height: 40px;
    }
  }

  &.small-header {
    th {
      height: 30px;
      font-size: 12px;
    }
  }

  .table-th-item {
    &.sortable {
      cursor: pointer;
      user-select: none;
    }
    span {
      vertical-align: middle;
    }
    .bold {
      font-weight: 800;
    }
  }

  // padding
  &.__lr10 {
    th,
    td {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  // is-selected
  .is-selected td {
    background: $--color-background-hover;
  }
}
</style>
