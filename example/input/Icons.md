### prefix-icon, suffix-icon

```html
<fg-input
  v-model="form.field"
  suffix-icon="car-line"
  prefix-icon="edit"
  :offset-left="22"
  :offset-right="30"
/>
<script>
export default {
  data() {
    return {
      form: {
        field: ''
      }
    }
  }
}
</script>
```
