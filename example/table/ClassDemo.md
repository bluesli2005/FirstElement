### thead-class tbody-class

```html
<fg-table
  thead-class="thead-bg"
  tbody-class="tbody-bg"
  :data="itemList">
  <fg-table-column
    show="name"
    label="顧客名(Left)"
    :sortable="false"
    cell-class="left"
    width="20%"
  >
    <template v-slot="item">
      <fg-avatar
        :data="{
          url:
            'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2700073372,1831939333&fm=26&gp=0.jpg',
          name: `${item.lastName} ${item.firstName}`,
          summary: '(43才)',
        }"
        text-flex-direction-column
        text-summary-no-offset
      ></fg-avatar>
    </template>
  </fg-table-column>
  <fg-table-column
    show="birthday"
    label="生年月日(center sort)"
    :sortable="true"
    width="40%"
  ></fg-table-column>
  <fg-table-column
    show="carInfo"
    label="対象車両(right)"
    :sortable="false"
    cell-class="right"
    width="20%"
  >
    <template>
      <div class="car-info">
        <span>トヨタ</span>
        <span>プリウス</span>
      </div>
    </template>
  </fg-table-column>
  <fg-table-column
    show="instrument"
    label="車検満了日"
    :sortable="true"
    width="10%"
  ></fg-table-column>
  <fg-table-column
    show="customerName"
    label="option"
    :sortable="false"
    width="10%"
  >
    <template>
      <fg-checkbox :v-model="true" />
    </template>
  </fg-table-column>
</fg-table>
<script>
export default {
  data() {
    return {
      itemList: [
        {
          firstName: '道春',
          lastName: '米田',
          instrument: '2020/02/24',
          birthday: '1980/03/22',
          songs: 72,
        },
        {
          firstName: '篤',
          lastName: '山本',
          instrument: '2020/02/24',
          birthday: '1972/03/22',
          songs: 70,
        },
        {
          firstName: '真希子',
          lastName: '北中',
          instrument: '2020/02/24',
          birthday: '1993/12/02',
          songs: 22,
        },
        {
          firstName: '真希子',
          lastName: '北中',
          instrument: '2020/02/24',
          birthday: '1988/11/04',
          songs: 2,
        },
      ],
    }
  },
}
</script>
```
