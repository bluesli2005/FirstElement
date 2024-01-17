### border and size

```html
<fg-radio v-model="value1" :label="item.value" border>{{item.text}}</fg-radio>
<fg-radio v-model="value1" :label="item.value" border size="medium">{{item.text}}</fg-radio>
<fg-radio v-model="value2" label="Text0002" border size="small"></fg-radio>
<fg-radio v-model="value2" label="Text0002" border size="mini"></fg-radio>
<script>
export default {
  data() {
    return {
      item: {
        text: 'Text0001',
        value: 1,
      },
      value1: 1,
      value2: '',
    }
  }
}
</script>
```
