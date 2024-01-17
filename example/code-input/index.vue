<template>
  <div class="example-code-input-wrapper">
    <Docs />
    <h2>Example</h2>

    <Normal />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/code-input.md'
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
.example-code-input-wrapper {
}
</style>
