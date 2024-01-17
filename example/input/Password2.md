### password, v-slot:suffix

```html
<fg-input
    v-model="password"
    placeholder="password"
    :offset-right="30"
    :type="showPassword ? 'text' : 'password'"
  width="210"
  >
    <template v-slot:suffix>
      <fg-icon
        name="eye"
        :color="showPassword ? '#1E5199' : '#DFE6F0'"
        @click="showPassword = !showPassword"
      ></fg-icon>
    </template>
  </fg-input>
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
