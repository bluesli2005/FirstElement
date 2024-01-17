<template>
  <div class="example-pagination-wrapper">
    <Docs />
    <H2>Example</H2>
    <Blue />
    <ShowNumber />
    <ThemeWhite />
    <HidePageInfo />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/pagination.md'
import Blue from './Blue.md'
import ShowNumber from './ShowNumber.md'
import ThemeWhite from './ThemeWhite.md'
import HidePageInfo from './HidePageInfo.md'

export default {
  components: {
    Docs,
    Blue,
    ShowNumber,
    ThemeWhite,
    HidePageInfo,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss">
.example-pagination-wrapper {
}
</style>
