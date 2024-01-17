### text-width

```html
<fg-avatar
  :data="avatarData"
  text-flex-direction-column
  text-summary-no-offset
  text-width="120"
  active-flg="#555"
/>
<script>
  const AVATAR_URL =
    'https://i.pinimg.com/originals/b9/09/d7/b909d7450a19279f53fb2b86571dcbfe.jpg'
  export default {
    data() {
      return {
        avatarData: {
          url: AVATAR_URL,
          name: '長谷川宏美長谷川宏美長谷川宏美長谷川宏美長谷川宏美長谷川宏美',
          summary:
            '長谷川宏美長谷川宏美長谷川宏美長谷川宏美長谷川宏美長谷川宏美',
        },
      }
    },
  }
</script>
```
