### group

```html
<fg-radio-group v-model="value">
  <fg-radio
    v-for="(item, i) in values"
    :key="i"
    :label="item.value"
    border
    >{{ item.text }}</fg-radio>
</fg-radio-group>
<script>
export default {
  data() {
    return {
      value: 2,
      values: [
        {
          text: 'Text0001',
          value: 1,
        },
        {
          text: 'Text0002',
          value: 2,
        },
      ],
    }
  }
}
</script>
```
