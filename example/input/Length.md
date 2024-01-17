### length and size

```html
<fg-input v-model="form.field" clearable size="medium" :length="10" />
<script>
export default {
  data() {
    return {
      form: {
        field: '123456789'
      }
    }
  }
}
</script>
```
