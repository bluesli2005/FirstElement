<template>
  <i :style="style"></i>
</template>

<script>
export default {
  props: {
    active: Boolean,
  },
  computed: {
    style() {
      const ret = {}
      if (this.active) {
        ret.borderTopColor = this.$colors.primary
      }
      return ret
    },
  },
}
</script>

<style lang="scss" scoped>
i {
  display: inline-block;
  border-top: 4px solid #c6d1e2;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
}
</style>
