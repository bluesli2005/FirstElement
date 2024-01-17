<template>
  <div class="fg-table">
    <div
      class="fg-table__table-wrapper"
      :style="{
        height: bodyHeight,
        minHeight: bodyMinHeight,
        maxHeight: bodyMaxHeight,
      }"
    >
      <table :class="fullTableClass">
        <thead :class="fullTableHeadClass">
          <tr>
            <TableColumnHeader
              v-for="column in columns"
              :key="column.show"
              :sort="sort"
              :column="column"
              :group-by="groupBy"
              @click="changeSorting(column)"
            ></TableColumnHeader>
          </tr>
        </thead>
        <tbody v-if="isEmpty" class="table-default">
          <tr>
            <td :colspan="columns.length">
              <div>
                <slot name="placeholder"></slot>
                {{ placeholder }}
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-else :class="fullTableBodyClass">
          <template v-for="(row, index) in displayedRows">
            <template v-if="isGroupBy">
              <tr
                v-if="beforeGroupByFlg(row, displayedRows[index - 1], index)"
                :key="index"
                :ref="isGroupBy ? `group-${row.data.groupIndex}` : ''"
                class="group-by-row"
                :style="rowHeightStyle"
                @click="handleToggle(`group-${row.data.groupIndex}`, $event)"
              >
                <th :colspan="columns.length">{{ row.data[groupBy] }}</th>
              </tr>
            </template>
            <TableRow
              :key="`group-${index}-children`"
              :ref="`group-${row.data.groupIndex}-children`"
              :row="row"
              :columns="columns"
              :group-by="groupBy"
              :style="rowHeightStyle"
              @row-click="emitRowClick"
            ></TableRow>
          </template>
        </tbody>
      </table>
    </div>

    <div style="display: none">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Column from './js/column.js'
import Row from './js/row.js'
import { classList } from './js/utils.js'
import TableColumnHeader from './TableColumnHeader'
import TableRow from './TableRow'

export default {
  name: 'FgTable',
  components: {
    TableColumnHeader,
    TableRow,
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    tableClass: {
      type: String,
      default: '',
    },
    theadClass: {
      type: String,
      default: '',
    },
    tbodyClass: {
      type: String,
      default: '',
    },
    groupBy: {
      type: String,
      default: '',
    },
    rowHeight: {
      type: String,
      default: '70px',
    },
    placeholder: {
      type: String,
      default: 'データはありません',
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
  },
  data: () => {
    return {
      columns: [],
      rows: [],
      sortRows: [],
      sort: {
        fieldName: '',
        order: '',
      },
      groupByName: '',
      groupIndex: 0,
      rowHeightStyle: {
        height: '70px',
      },
    }
  },

  computed: {
    isEmpty() {
      return this.data.length === 0
    },
    fullTableClass() {
      return classList('fg-table__table', this.tableClass)
    },

    fullTableHeadClass() {
      return classList('fg-table__table__head', this.theadClass)
    },

    fullTableBodyClass() {
      return classList('fg-table__table__body', this.tbodyClass)
    },

    // usesLocalData() {
    //   return Array.isArray(this.data)
    // },

    isGroupBy() {
      return !!this.groupBy
    },

    displayedRows() {
      if (!this.isGroupBy) {
        return this.sortedRows
      } else {
        let groupIndexCode = 0
        this.sortedRows.forEach((row, index) => {
          if (
            index === 0 ||
            row.data[this.groupBy] !==
              this.sortedRows[index - 1].data[this.groupBy]
          ) {
            groupIndexCode += 1
          }
          row.data.groupIndex = groupIndexCode
        })
        return this.sortedRows
      }
    },

    sortedRows() {
      return this.rows
      // if (!this.usesLocalData) {
      //   return this.rows
      // }

      // if (this.sort.fieldName === '') {
      //   return this.rows
      // }

      // if (this.sort.order === '') {
      //   return this.rows
      // }

      // if (this.columns.length === 0) {
      //   return this.rows
      // }

      // const sortColumn = this.getColumn(this.sort.fieldName)

      // if (!sortColumn) {
      //   return this.rows
      // }

      // const sortedRow = this.sortRows

      // return sortedRow.sort(
      //   sortColumn.getSortPredicate(this.sort.order, this.columns)
      // )
    },
  },

  watch: {
    data() {
      // if (this.usesLocalData) {
      this.mapDataToRows()
      // }
    },
  },

  mounted() {
    const columnComponents = this.$slots.default
      .filter((column) => column.componentInstance)
      .map((column) => column.componentInstance)

    this.columns = columnComponents.map((column) => new Column(column))

    columnComponents.forEach((columnCom) => {
      Object.keys(columnCom.$options.props).forEach((prop) =>
        columnCom.$watch(prop, () => {
          this.columns = columnComponents.map((column) => new Column(column))
        })
      )
    })

    this.mapDataToRows()
    this.rowHeightStyle.height = this.rowHeight
  },

  methods: {
    mapDataToRows() {
      this.rows = this.getRowsData()
      // this.sortRows = this.getRowsData()
    },

    getRowsData() {
      const data = this.data
      let rowId = 0

      return data
        .map((rowData) => {
          rowData.vueTableComponentInternalRowId = rowId++
          return rowData
        })
        .map((rowData) => new Row(rowData, this.columns))
    },

    changeSorting(column) {
      if (this.sort.fieldName !== column.show) {
        this.sort.fieldName = column.show
        this.sort.order = 'asc'
      } else if (this.sort.order === '') {
        this.sort.order = 'asc'
      } else {
        this.sort.order = this.sort.order === 'asc' ? 'desc' : ''
      }
      const sortKey = this.sort.order
        ? this.sort.order === 'asc'
          ? column.sortKey
          : '-' + column.sortKey
        : ''
      this.$emit('sort', sortKey)
      // if (!this.usesLocalData) {
      //   this.mapDataToRows()
      // }
    },

    getColumn(columnName) {
      return this.columns.find((column) => column.show === columnName)
    },

    emitRowClick(row) {
      this.$emit('row-click', row)
    },
    handleToggle(pdom) {
      // TODO
      const dom = `${pdom}-children`
      const list = this.$refs[dom]
      const clickIcon = this.$refs[pdom][0]
      clickIcon.classList.toggle('is-close')
      for (const i in list) {
        if (list[i].$el.style.display === 'none') {
          list[i].$el.style.display = ''
        } else {
          list[i].$el.style.display = 'none'
        }
      }
    },
    beforeGroupByFlg(row, beforeRow, index) {
      let flg = false
      if (this.isGroupBy) {
        if (index === 0 || row.data.groupIndex !== beforeRow.data.groupIndex) {
          flg = true
        }
      }
      return flg
    },
  },
}
</script>

<style lang="scss">
*,
*:after,
*:before {
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.fg-table {
  display: flex;
  flex-direction: column;
  border-spacing: 0;
}

.fg-table__table {
  min-width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border-spacing: 0;
  &-wrapper {
    background: $--color-white;
    overflow-x: auto;
    width: 100%;
    border-radius: 6px;
  }
  thead {
    tr {
      th {
        position: sticky;
        top: 0;
        z-index: 1;
        vertical-align: middle;
        text-align: center;
        font-size: 12px;
        font-weight: normal;
        height: 40px;
        padding: 0;
        white-space: nowrap;
        color: $--color-primary;
        background-color: $--color-white;
        border-bottom: 1px $--color-border solid;
      }
      th.fg-table__th--sort span {
        display: inline-block;
      }

      th.fg-table__th--sort span:before {
        content: '';
        position: absolute;
        top: calc(50% - 10px);
        width: 4px;
        height: 4px;
        border-top: 4px solid $--color-border;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        transform: rotate(180deg);
      }

      th.fg-table__th--sort span:after {
        content: '';
        position: absolute;
        top: calc(50% - 2px);
        width: 4px;
        height: 4px;
        border-top: 4px solid $--color-border;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
      }

      th.fg-table__th--sort-asc {
        font-weight: bold;
        span:before {
          border-top: 4px solid $--color-primary;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
        }
      }

      th.fg-table__th--sort-desc {
        font-weight: bold;

        span:after {
          border-top: 4px solid $--color-primary;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
        }
      }
    }

    &.thead-bg {
      tr {
        th {
          border-bottom: none;
          background-color: $--color-background;
        }
      }
    }
    &.thead-small {
      tr {
        th {
          height: 30px;
        }
      }
    }
  }
  tbody {
    &.table-default {
      td {
        // display: flex;
        // justify-content: center;
        // align-items: center;
        div {
          width: 120px;
          margin: 100px auto;
        }
      }
    }

    tr.group-by-row {
      text-align: left;
      background-color: $--color-background;
      border-top: 1px $--color-border solid;
      height: 40px !important;
      font-size: 12px;

      th {
        padding-left: 4%;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          left: 2%;
          top: 15px;
          width: 7px;
          height: 7px;
          border-left: 2px $--color-primary solid;
          border-top: 2px $--color-primary solid;
          transform: rotate(-135deg);
          transition: transform 0.3s;
        }
      }
    }
    tr.group-by-row.is-close {
      th {
        &:before {
          top: 18px;
          transform: rotate(45deg);
        }
      }
    }
    tr {
      height: 70px;
      background-color: $--color-white;
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: 1px $--color-border solid;
      }

      td {
        font-size: 12px;
        padding: 0 5px;
        color: $--color-primary;

        &:not(:last-child):after {
          content: '';
          position: absolute;
          width: 1px;
          height: 70%;
          top: 15%;
          right: 0;
          background: $--color-border;
        }
        &.left {
          text-align: left;
        }

        &.center {
          text-align: center;
        }

        &.right {
          text-align: right;
        }
        &.hide-border {
          &:after {
            width: 0px;
          }
        }
      }
    }

    &.tbody-bg {
      tr {
        border-bottom: none;
        &:nth-child(even) {
          background-color: $--color-background;
        }
      }
    }
  }
}
</style>
