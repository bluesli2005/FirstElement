<template>
  <div class="example-fg-breadcrumb-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
  </div>
</template>

<script>
import Docs from '../../docs/breadcrumbs.md'
import { customMixin } from '../_app/mixins'
import Normal from './Normal.md'

export default {
  components: {
    Docs,
    Normal,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
