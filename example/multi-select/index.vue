<template>
  <div class="example-select-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/multi-select.md'
import Normal from './Normal.md'

export default {
  components: {
    Docs,
    Normal,
  },
  mixins: [customMixin],
  data() {
    return {}
  },
  methods: {
    customFilter(value, item, i) {
      return i % 3 === 0
    },
  },
}
</script>

<style lang="scss">
.example-select-wrapper {
  list-style: none;
  dt,
  dd {
    margin: 0;
  }
  dt {
    padding: 30px 0 10px;
  }
  .transparent-wrapper {
    padding: 20px;
    background: $--color-primary-active;
  }
}
</style>
