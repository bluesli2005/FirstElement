### avatar only

```html
<fg-row>
  <fg-col span="6">
    <fg-avatar :src="src" size="80" />
  </fg-col>
  <fg-col span="6">
    <fg-avatar :src="src" size="80" fillet />
  </fg-col>
  <fg-col span="6">
    <fg-avatar :src="src" size="80" :circle="false" />
  </fg-col>
  <fg-col span="6">
    <fg-avatar :src="src" />
  </fg-col>
</fg-row>
<script>
  const AVATAR_URL =
    'https://i.pinimg.com/originals/b9/09/d7/b909d7450a19279f53fb2b86571dcbfe.jpg'
  export default {
    data() {
      return {
        src: AVATAR_URL,
      }
    },
  }
</script>
```
