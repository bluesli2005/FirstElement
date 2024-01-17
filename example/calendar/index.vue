<template>
  <div class="example-calendar-wrapper">
    <Docs />

    <h2>Example</h2>

    <Normal />
    <Type />
    <ValidateDemo />
    <ShowDash />
    <Formatters />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/calendar.md'
import Normal from './Normal.md'
import Type from './Type.md'
import ValidateDemo from './ValidateDemo.md'
import ShowDash from './ShowDash.md'
import Formatters from './Formatters.md'

export default {
  components: {
    Docs,
    Normal,
    Type,
    ValidateDemo,
    ShowDash,
    Formatters,
  },
  mixins: [customMixin],
  data() {
    return {
      date1: '2020/08/12',
      date2: '2020/08/12',
      date3: '2020-08-12',
      date4: '2020-08-12',
      date: '2020/08/12',
      month1: '',
      month2: '',
      month3: '1990年02月',
      month4: '',
      year: '2008',
      yearRange: ['2009', '2016'],
    }
  },
}
</script>

<style lang="scss">
.example-calendar-wrapper {
  .fg-row {
    padding-bottom: 20px;
  }
}
</style>
