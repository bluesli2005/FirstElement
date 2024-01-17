### slot

```html
<fg-checkbox v-model="value1">
  <fg-input size="small" class="ml10" />
</fg-checkbox>
<fg-checkbox v-model="value2" disabled class="ml40">
  <span class="ml10">disabled</span>
</fg-checkbox>
<script>
export default {
  data() {
    return {
      value1: false,
      value2: true,
    }
  }
}
</script>
```
