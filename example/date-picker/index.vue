<template>
  <div class="example-date-picker-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/date-picker.md'
import Normal from './Normal.md'

export default {
  components: {
    Docs,
    Normal,
  },
  mixins: [customMixin],
  data() {
    return {
      date: '2020-08-12 12:55',
      date1: '2020-09-12（火）12:55',
    }
  },
}
</script>

<style lang="scss">
.example-date-picker-wrapper {
}
</style>
