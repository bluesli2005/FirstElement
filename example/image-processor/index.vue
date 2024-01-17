<template>
  <div class="example-image-processor-wrapper">
    <Docs />
    <h2>Example</h2>
    <UserPhotoCrop />
    <IconType />
    <Validate />
    <SlotDemo />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/image-processor.md'
import UserPhotoCrop from './UserPhotoCrop.md'
import IconType from './IconType.md'
import Validate from './Validate.md'
import SlotDemo from './SlotDemo.md'
export default {
  components: {
    Docs,
    UserPhotoCrop,
    IconType,
    Validate,
    SlotDemo,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
