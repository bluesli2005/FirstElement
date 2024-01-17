### password, suffix-icon

```html
<fg-input
  v-model="password"
  placeholder="password"
  suffix-icon="eye"
  :suffix-icon-color="showPassword ? '#1E5199' : '#DFE6F0'"
  :type="showPassword ? 'text' : 'password'"
  :offset-right="30"
  @click:suffix-icon="showPassword = !showPassword"
  width="210"
/>
<script>
export default {
  data() {
    return {
      password: 'This is a password input',
      showPassword: false
    }
  }
}
</script>
```
