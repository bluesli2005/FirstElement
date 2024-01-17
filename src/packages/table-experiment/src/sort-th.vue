<template>
  <div class="table-th-item sortable" @click="handleClick">
    <span :class="{ bold: (isAsc || isDesc) && item.sortactive }">
      <slot></slot>
    </span>
    <i class="sort-icon">
      <Icon
        :active="isAsc && item.sortactive"
        @click.native="sortClick('asc', $event)"
      />
      <Icon
        :active="isDesc && item.sortactive"
        @click.native="sortClick('desc', $event)"
      />
    </i>
  </div>
</template>

<script>
import Icon from './sort-icon'
const DESC = 'desc'
const ASC = 'asc'
export default {
  components: {
    Icon,
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      sort: this.value,
    }
  },
  computed: {
    isAsc() {
      return this.sort === ASC
    },
    isDesc() {
      return this.sort === DESC
    },
  },
  watch: {
    value(val) {
      if (this.sort !== val) {
        this.sort = val
      }
    },
    sort(val) {
      this.$emit('input', val)
      this.$emit('change', val, this.item)
    },
  },
  methods: {
    sortClick(sort, e) {
      e.stopPropagation()
      this.sort = sort
    },
    handleClick() {
      if (this.sort === DESC) {
        this.sort = ASC
      } else if (this.sort === ASC) {
        this.sort = ''
      } else {
        this.sort = DESC
      }
    },
  },
}
</script>

<style lang="scss">
.table-th-item {
  .sort-icon {
    display: inline-flex;
    margin-left: 4px;
    width: 7px;
    height: 11px;
    cursor: pointer;
    vertical-align: middle;
    font-size: 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    i {
      &:first-child {
        transform: rotate(180deg);
      }
      &:last-child {
        margin-top: 3px;
      }
    }
  }
}
</style>
