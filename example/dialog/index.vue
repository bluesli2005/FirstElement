<template>
  <div class="example-dialog-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
    <Persistent />
    <MaxWidth />
    <BodyHeight />
    <HideHeaderBorder />
    <SlotDemo />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/dialog.md'
import Normal from './Normal.md'
import Persistent from './Persistent.md'
import MaxWidth from './MaxWidth.md'
import BodyHeight from './BodyHeight.md'
import HideHeaderBorder from './HideHeaderBorder.md'
import SlotDemo from './SlotDemo.md'

export default {
  components: {
    Docs,
    Normal,
    Persistent,
    MaxWidth,
    BodyHeight,
    HideHeaderBorder,
    SlotDemo,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss">
.example-dialog-wrapper {
}
</style>
