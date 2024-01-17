<template>
  <div class="example-text-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
    <Rows />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/text.md'
import Normal from './Normal.md'
import Rows from './Rows.md'

export default {
  components: {
    Docs,
    Normal,
    Rows,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss">
.example-text-wrapper {
}
</style>
