### hide-header-border

```html
<fg-button type="primary" width="320" @click="visible = true">HideHeaderBorder</fg-button>
<fg-dialog v-model="visible" title="Hello World日本語テスト" max-width="640px" hide-header-border>
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
