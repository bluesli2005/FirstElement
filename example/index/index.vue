<template>
  <div>
    <Docs />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/README.md'
export default {
  components: {
    Docs,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
