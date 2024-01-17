<template>
  <div>
    <Docs />
    <h2>Example</h2>
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/progress.md'

export default {
  components: {
    Docs,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
