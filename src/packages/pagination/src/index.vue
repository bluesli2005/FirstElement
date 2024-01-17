<template>
  <div class="fg-pagination-wrapper">
    <div class="fg-pagination-wrapper-left">
      <div v-if="hidePageInfo"></div>
      <PageInfo v-else :total="total" :theme="theme" :info="currentPageText" />
      <div v-if="showPageSize" class="page-limit ml20">
        <p class="mr5">表示件数</p>
        <fg-select
          v-model="pageLimitSize"
          width="42px"
          size="mini"
          :offset-right="0"
          filterable
          :items="pageLimitItems"
        />
        <p class="ml5 mr10">件</p>
      </div>
      <slot></slot>
    </div>

    <Pagination
      v-model="page"
      :theme="theme"
      :page-size="pageSize"
      :total="total"
      :size="size"
      :show-number="showNumber"
      :before-change="beforeChange"
      :show-page-size="showPageSize"
    />
  </div>
</template>

<script>
import PageInfo from './PageInfo'
import Pagination from './Pagination'
export default {
  name: 'FgPagination',
  components: {
    PageInfo,
    Pagination,
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
    hidePageInfo: Boolean,
    beforeChange: {
      type: Function,
      default: undefined,
    },
    showPageSize: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: this.value,
      pageLimitSize: this.pageSize,
      pageLimitItems: [
        {
          value: 10,
          text: '10',
        },
        {
          value: 20,
          text: '20',
        },
        {
          value: 50,
          text: '50',
        },
        {
          value: 100,
          text: '100',
        },
      ],
    }
  },
  computed: {
    currentPageText() {
      let start = (this.page - 1) * this.pageSize
      if (this.total) {
        start += 1
      }
      const end = Math.min(this.page * this.pageSize, this.total)
      return `${start.toLocaleString()}〜${end.toLocaleString()}`
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
    },
    pageSize(val) {
      this.pageLimitSize = val
    },
    pageLimitSize(val) {
      this.$emit('page-size-change', val)
    },
  },
}
</script>

<style lang="scss">
.fg-pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-left {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.page-limit {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: $--color-white;
  font-size: 14px;
  .fg-select {
    background: $--color-white;
    border-radius: 5px;
  }
  .fg-input.__mini {
    input {
      height: 20px;
    }
    .__l {
      left: 2px;
    }
    .__r {
      right: 2px;
      height: 20px;
    }
  }
  .fg-select i.__arrow .fg-icon {
    transform: scale(0.8, 0.8);
  }
}
</style>
