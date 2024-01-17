<template>
  <div>
    <Docs />
    <h2>Example</h2>
    <Normal />
    <Multiple />
    <Success />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/message-box.md'
import Normal from './Normal.md'
import Multiple from './Multiple.md'
import Success from './Success.md'
export default {
  components: {
    Docs,
    Normal,
    Multiple,
    Success,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
