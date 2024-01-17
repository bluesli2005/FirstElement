<template>
  <div>
    <Docs />
    <h2>Example</h2>
    <div class="fg-tabs-wrapper">
      <Normal />
    </div>
  </div>
</template>
<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/tabs.md'
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
.fg-tabs-wrapper {
  width: 100%;
  height: 500px;
  color: $--color-white;
  background: $--color-primary-active;
}
</style>
