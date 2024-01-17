<template>
  <div>
    <Docs />
    <h2>Example</h2>
    <Normal />
    <Title />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/switch.md'
import Normal from './Normal.md'
import Title from './Title.md'

export default {
  components: {
    Docs,
    Normal,
    Title,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
