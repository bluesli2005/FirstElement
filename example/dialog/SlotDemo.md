### slot

```html
<fg-button type="primary" width="320" @click="visible = true">SlotDemo</fg-button>
<fg-dialog v-model="visible" title="Hello World日本語テスト" max-width="640px">
  <template v-slot:title-suffix>
    <fg-icon name="flag" color="red"></fg-icon>
  </template>
  <template v-slot:header-right>
    <fg-icon name="flag" color="red" class="mr10"></fg-icon>
  </template>
  content
</fg-dialog>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
}
</script>
```
