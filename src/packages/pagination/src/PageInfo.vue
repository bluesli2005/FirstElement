<template>
  <div class="fg-pagination-info" :class="['__' + theme]">
    <strong>{{ total.toLocaleString() }}</strong>
    <span>件中 {{ info }}件を表示</span>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    theme: {
      type: String,
      default: 'white',
    },
    info: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.fg-pagination-info {
  line-height: $--height-mini;
  strong {
    display: inline-block;
    font-size: $--font-size-24;
    font-family: 'Avenir Next', 'Helvetica', Arial;
  }
  span {
    font-size: $--font-size-14;
  }
  &.__white {
    strong,
    span {
      color: $--color-white;
    }
  }

  &.__blue {
    strong,
    span {
      color: $--color-primary;
    }
  }
}
</style>
