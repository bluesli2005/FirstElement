<template>
  <!-- Never render the contents -->
  <div v-if="false">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FgTableColumn',
  props: {
    show: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    sortKey: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: null,
    },
    sortable: {
      type: Boolean,
      default: true,
    },
    formatter: {
      type: Function,
      default: (v) => v,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    cellClass: {
      type: String,
      default: 'center',
    },
    headerClass: {
      type: String,
      default: '',
    },
    colspan: {
      type: String,
      default: '1',
    },
    colspanDisplay: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
