```html
<fg-table-experiment
  :headers="headers"
  :list="list"
  padding="lr10"
  rounded
  head-bottom-border
  head-font-weight-normal
  stripe
  td-space-vertical-line
  body-min-height="300px"
  placeholder="検索結果はありません"
  @sort-change="sortChange"
>
  <tr v-for="(item, i) in list" :key="i">
    <td class="high-light cur" @click="clickRow(item)">
      {{ item.id }}
    </td>
    <td class="is-left">
      <fg-avatar
        text-flex-direction-column
        circle
        background
        text-width="120px"
        :data="item"
      />
    </td>
    <td class="is-left">
      <dl class="table-item-tel">
        <dd>
          <fg-icon name="tel" color="#333" /> 03-1234-1234
        </dd>
        <dd>
          <fg-icon name="mobile" color="#333" /> 080-1234-1234
        </dd>
      </dl>
    </td>
    <td>
      <dl style="display: inline-block; text-align: left;">
        <dd>{{ item.maker }}</dd>
        <dd>{{ item.class || '-' }}</dd>
      </dl>
    </td>
    <td>{{ item }}</td>
    <td>
      <fg-tag bg-color="#12AACE" selected no-border>乗換希望</fg-tag>
      <fg-tag bg-color="#0DBEA9" selected no-border>車検間近</fg-tag>
    </td>
  </tr>
</fg-table-experiment>
<script>
export default {
  data() {
    return {
      headers: [
        {
          text: '顧客ID',
          align: 'center',
          field: 'id',
          sortable: true,
        },
        {
          text: '顧客名',
          field: 'name',
          align: 'center',
          width: '200px',
          sortable: true,
          defaultSort: 'desc',
        },
        { text: '電話番号', align: 'center' },
        { text: '車両情報', align: 'start', width: '120px' },
        { text: '登録ナンバー', align: 'center' },
        { text: 'フラグ', align: 'center' },
      ],
      list: [
        {
          id: 10000001,
          name: '顧客名',
        },
        {
          id: 10000001,
          name: '顧客名',
        },
        {
          id: 10000001,
          name: '顧客名',
        },
        {
          id: 10000001,
          name: '顧客名',
        },
        {
          id: 10000001,
          name: '顧客名',
        },
        {
          id: 10000001,
          name: '顧客名',
        },
        {
          id: 10000001,
          name: '顧客名',
        },
      ],
    }
  },
  methods: {
    sortChange(field, sort) {
      console.log(field, sort)
    },
  },
}
</script>
```
