### textarea

```html
<fg-input v-model="value" type="textarea" />
<h4>resizable, and rows=2</h4>
<fg-input v-model="value2" type="textarea" resizable :rows="2" style="margin-top: 10px;" />
<script>
export default {
  data() {
    return {
      value: '',
      value2: 'resizable',
    }
  }
}
</script>
```
