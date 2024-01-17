### clearable disabled filterable unit

```html
<fg-select v-model="value" :items="options" clearable />
<div class="mt10">
  <fg-select v-model="value2" :items="options" filterable placeholder="filterable" inline />
  <fg-select v-model="value1" :items="options" disabled inline />
  <fg-select v-model="value3" :items="options" unit="エリア" placeholder="unit" inline />
</div>
<script>
export default {
  data() {
    return {
    value: 8,
    value1: 1,
    value2: 0,
    value3: 0,
      options: [
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
    }
  }
}
</script>
```
