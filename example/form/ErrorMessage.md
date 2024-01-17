### error-message

```html
<fg-form>
  <fg-form-item :error-message="message">
    <fg-input v-model="value" :is-error="true"></fg-input>
  </fg-form-item>
</fg-form>

<script>
export default {
  data() {
    return {
      message: 'This is an error message!',
      value: '',
    }
  }
}
</script>
```
