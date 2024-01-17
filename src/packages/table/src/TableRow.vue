<template>
  <tr @click="clickRow(row)">
    <TableCell
      v-for="column in visibleColumns"
      :key="column.id"
      :row="row"
      :column="column"
    ></TableCell>
  </tr>
</template>

<script>
import TableCell from './TableCell.vue'

export default {
  components: {
    TableCell,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
    colspan: {
      type: String,
      default: '1',
    },
    colspanDisplay: {
      type: Boolean,
      default: true,
    },
    row: {
      type: Object,
      default: () => {
        return {}
      },
    },
    groupBy: {
      type: String,
      default: null,
    },
  },

  computed: {
    visibleColumns() {
      return this.columns.filter(
        (column) => !column.hidden && column.show !== this.groupBy
      )
    },

    getGroupByIndex() {
      return this.columns.findIndex((column) => column.show === this.groupBy)
    },
  },
  watch: {
    value(val) {
      this.gronpByName = val
    },
    groupByName(val) {
      this.$emit('input', val)
    },
  },

  methods: {
    clickRow(row) {
      this.$emit('row-click', row.data)
    },
  },
}
</script>
