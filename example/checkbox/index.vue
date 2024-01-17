<template>
  <div class="example-checkbox-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
    <SlotDemo />
  </div>
</template>
<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/checkbox.md'
import Normal from './Normal.md'
import SlotDemo from './SlotDemo.md'

export default {
  components: {
    Docs,
    Normal,
    SlotDemo,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
