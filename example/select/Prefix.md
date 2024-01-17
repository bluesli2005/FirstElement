### v-slot:prefix theme="light-blue"

```html
<fg-select
  v-model="value"
  :items="options"
  theme="light-blue"
  size="medium"
  item-prefix="- "
  :offset-left="22"
  >
  <template v-slot:prefix>
    <img :src="iconShop" />
  </template>
</fg-select>
<script>
import iconShop from './img/shop.svg'
export default {
  data() {
    return {
      iconShop,
      value: 5,
      options: [
       {
         title: '営業管理',
       },
       {
         text: 'cars全店',
         value: 1,
       },
       {
         title: '店舗管理',
       },
       {
         text: 'cars奈良中央',
         value: 5,
       },
     ]
    }
  }
}
</script>
```
