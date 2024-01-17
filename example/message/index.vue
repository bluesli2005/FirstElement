<template>
  <div>
    <Docs />
    <h2>Example</h2>
    <fg-message></fg-message>
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/message.md'

export default {
  components: {
    Docs,
  },
  mixins: [customMixin],
  data() {
    return {}
  },
}
</script>

<style lang="scss"></style>
