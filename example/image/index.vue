<template>
  <div class="example-image-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
    <ViewMode />
  </div>
</template>

<script>
import Docs from '../../docs/image.md'
import { customMixin } from '../_app/mixins'
import Normal from './Normal.md'
import ViewMode from './ViewMode.md'
export default {
  components: {
    Docs,
    Normal,
    ViewMode,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
