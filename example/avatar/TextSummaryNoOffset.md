### text-summary-no-offset and subName

text-flex-direction-column, data={subName: ''}

```html
<fg-avatar
  :data="avatarData"
  text-summary-no-offset
  text-flex-direction-column
/>
<script>
  export default {
    data() {
      return {
        avatarData: {
          url:
            'https://i.pinimg.com/originals/b9/09/d7/b909d7450a19279f53fb2b86571dcbfe.jpg',
          name: '米田 道春',
          summary: 'カタカナカタカナカタカナ',
          subName: '（47歳）',
        },
      }
    },
  }
</script>
```
