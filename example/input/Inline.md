### inline and error-message

```html
<fg-input v-model="form.field1" inline />
<fg-input v-model="form.field2" inline />
<fg-input v-model="form.field3" inline error-message="this is an error message" />
<script>
export default {
  data() {
    return {
      form: {
        field1: '',
        field2: '',
        field3: '',
      }
    }
  }
}
</script>
```
