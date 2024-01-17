### max-width

```html
<fg-button type="primary" width="320" @click="visible = true">max-width</fg-button>
<fg-dialog v-model="visible" title="Hello World日本語テスト" max-width="640px">
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
