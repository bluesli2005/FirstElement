```html
<fg-button type="primary" width="320" @click="visible = true">Click</fg-button>
<fg-dialog v-model="visible" title="Hello World日本語テスト">
  content
</fg-dialog>

<fg-button type="warning" width="320" @click="visible2 = true">Scroll</fg-button>
<fg-dialog v-model="visible2" title="Scroll Body" max-width="800">
  <div>
    <p v-for="item in 100" :key="item">text {{ item }}</p>
  </div>
</fg-dialog>

<script>
export default {
  data() {
    return {
      visible: false,
      visible2: false,
    }
  },
}
</script>
```
