### persistent

```html
<fg-button type="primary" width="320" @click="visible = true">persistent</fg-button>
<fg-dialog v-model="visible" title="Hello World日本語テスト" persistent>
  content
  <div style="padding: 24px;">
    <fg-calendar />
  </div>
  <div style="padding: 24px;">
    <fg-calendar />
  </div>
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
