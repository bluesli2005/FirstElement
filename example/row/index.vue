<template>
  <div class="example-row-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/row.md'
import Normal from './Normal.md'

export default {
  components: {
    Docs,
    Normal,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss">
.example-row-wrapper {
}
</style>
