<template>
  <div>
    <Docs />
    <h2>Example</h2>
    <Normal />
    <Selectable />
    <CustomColors />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/tag.md'
import Normal from './Normal.md'
import Selectable from './Selectable.md'
import CustomColors from './CustomColors.md'

export default {
  components: {
    Docs,
    Normal,
    Selectable,
    CustomColors,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
