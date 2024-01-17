<template>
  <th
    v-if="isVisible && !isGroupBy"
    :class="headerClass"
    role="columnheader"
    :aria-sort="ariaSort"
    :aria-disabled="ariaDisabled"
    :width="column.width"
    @click="handleClicked"
  >
    {{ label }}
    <span></span>
  </th>
</template>

<script>
import { classList } from './js/utils.js'

export default {
  props: {
    column: {
      type: Object,
      default: () => {},
    },
    sort: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: '',
    },
    groupBy: {
      type: String,
      default: null,
    },
  },

  computed: {
    ariaDisabled() {
      if (!this.column.isSortable()) {
        return 'true'
      }

      return false
    },

    ariaSort() {
      if (!this.column.isSortable()) {
        return false
      }

      if (this.column.show !== this.sort.fieldName) {
        return 'none'
      }

      return this.sort.order === 'asc' ? 'ascending' : 'descending'
    },

    headerClass() {
      if (!this.column.isSortable()) {
        return classList('fg-table__th', this.column.headerClass)
      }

      if (this.column.show !== this.sort.fieldName) {
        return classList('fg-table__th--sort', this.column.headerClass)
      }

      return classList(
        `fg-table__th--sort fg-table__th--sort-${this.sort.order}`,
        this.column.headerClass
      )
    },

    isVisible() {
      return !this.column.hidden
    },

    isGroupBy() {
      return this.column.show === this.groupBy
    },

    label() {
      if (this.column.label === null) {
        return this.column.show
      }

      return this.column.label
    },
  },

  methods: {
    handleClicked() {
      if (this.column.isSortable()) {
        this.$emit('click', this.column)
      }
    },
  },
}
</script>
