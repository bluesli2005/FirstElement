```html
<fg-multi-select v-model="value" :items="options" />
<div class="mt10">
  <fg-multi-select v-model="value1" :items="options" inline />
  <fg-multi-select v-model="value2" :items="options" inline />
  <fg-multi-select v-model="value3" :items="options" inline />
</div>
<script>
  export default {
    data() {
      return {
        value: ['1', '2', '3'],
        value1: ['1'],
        value2: ['2'],
        value3: ['3'],
        options: [
          {
            text: '東北エリア',
            value: '1',
          },
          {
            text: '関西エリア',
            value: '2',
          },
          {
            text: '関東エリア',
            value: '3',
          },
          {
            text: '九州エリア',
            value: '4',
          },
          {
            text: '四国エリア',
            value: '5',
          },
        ],
      }
    },
  }
</script>
```
