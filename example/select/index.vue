<template>
  <div class="example-select-wrapper">
    <Docs />
    <h2>Example</h2>
    <Normal />
    <Clearable />
    <Prefix />
    <Transparent />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/select.md'
import Normal from './Normal.md'
import Clearable from './Clearable.md'
import Prefix from './Prefix.md'
import Transparent from './Transparent.md'

export default {
  components: {
    Docs,
    Normal,
    Clearable,
    Prefix,
    Transparent,
  },
  mixins: [customMixin],
  data() {
    const list = [
      {
        title: '営業管理',
      },
      {
        text: 'cars全店',
        value: 1,
      },
      {
        text: '関西エリア',
        value: 2,
      },
      {
        text: '関東エリア',
        value: 3,
      },
      {
        title: '店舗管理',
      },
      {
        text: 'cars奈良中央',
        value: 5,
      },
      {
        text: 'cars大阪',
        value: 6,
      },
      {
        text: 'cars足立',
        value: 7,
      },
      {
        text: 'cars天理',
        value: 8,
      },
    ]
    const options100 = new Array(50).fill({}).map(() => {
      return {
        text: Math.random().toString(),
        value: Math.random().toString(),
      }
    })
    return {
      selectValue1: 7,
      options1: [...list],
      filterValue: 6,
      filterValue2: '',
      filterItems: list.filter((item) => !item.title),
      selectValue2: '',
      options2: [
        {
          text: 'cars全店',
          value: 1,
        },
        {
          text: '関西エリア',
          value: 2,
        },
        {
          text: '関東エリア',
          value: 3,
          disabled: true,
        },
        {
          text: 'cars奈良中央',
          value: 5,
        },
        {
          text: 'cars大阪',
          value: 6,
        },
        {
          text: 'cars足立',
          value: 7,
        },
        {
          text: 'cars天理',
          value: 8,
        },
      ],
      selectValue3: 2,
      selectValue100: '',
      options100,
    }
  },
  methods: {
    customFilter(value, item, i) {
      return i % 3 === 0
    },
  },
}
</script>

<style lang="scss">
.example-select-wrapper {
  list-style: none;
  dt,
  dd {
    margin: 0;
  }
  dt {
    padding: 30px 0 10px;
  }
  .transparent-wrapper {
    padding: 20px;
    background: $--color-primary-active;
  }
}
</style>
