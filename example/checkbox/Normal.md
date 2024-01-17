```html
<fg-checkbox v-model="value1" label="タイトル付き"></fg-checkbox>
<fg-checkbox v-model="value2" disabled class="ml40 mr40"></fg-checkbox>
<fg-checkbox v-model="value3" theme="red"></fg-checkbox>
<script>
export default {
  data() {
    return {
      value1: false,
      value2: true,
      value3: true,
    }
  }
}
</script>
```
