### error-message

```html
<fg-calendar :error-message="errorMessage" inline />
<fg-calendar :is-error="!!errorMessage" inline />
<script >
export default {
  data() {
    return {
      errorMessage: 'This is an error message!'
    }
  }
}
</script>
```
