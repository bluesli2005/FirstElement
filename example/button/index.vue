<template>
  <div class="example-button-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
    <SuffixIcon />
    <PrefixIcon />
    <Size />
    <Icon />
    <WhiteTransparent />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/button.md'
import Normal from './Normal.md'
import SuffixIcon from './SuffixIcon.md'
import PrefixIcon from './PrefixIcon.md'
import Size from './Size.md'
import Icon from './Icon.md'
import WhiteTransparent from './WhiteTransparent.md'

export default {
  components: {
    Docs,
    Normal,
    SuffixIcon,
    PrefixIcon,
    Size,
    Icon,
    WhiteTransparent,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss">
.example-button-wrapper {
}
</style>
