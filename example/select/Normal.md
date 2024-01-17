```html
<fg-select v-model="value" :items="options" />
<div class="mt10">
  <fg-select v-model="value1" :items="options" inline />
  <fg-select v-model="value2" :items="options" inline />
  <fg-select v-model="value3" :items="options" inline />
</div>
<script>
export default {
  data() {
    return {
      value: 0,
      value1: 1,
      value2: 2,
      value3: 3,
      options: [
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
     ]
    }
  }
}
</script>
```
