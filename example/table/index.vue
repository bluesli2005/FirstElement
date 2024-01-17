<template>
  <div class="example-table-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
    <ClassDemo />
  </div>
</template>
<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/table.md'
import Normal from './Normal.md'
import ClassDemo from './ClassDemo.md'

export default {
  components: {
    Docs,
    Normal,
    ClassDemo,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
