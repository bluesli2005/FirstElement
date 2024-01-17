```html
<fg-button type="warning" width="200" @click="handleClick('warning')">warning</fg-button>
<fg-button type="primary" width="200" @click="handleClick('multiple')">multiple message</fg-button>
<script>
export default {
  methods: {
    handleClick(type) {
      switch (type) {
        case 'warning':
          this.$confirm('this is a ログアウトする message', {
            buttons: {
              ok: {
                text: 'ログアウトする',
                type: 'warning',
              },
            },
          }).then(() => {
            console.log('ok')
          }).catch(() => {
            console.log('cancel')
          })
          break
        case 'multiple':
          this.$confirm(['message-p1', 'message-p2']).then(() => {
            console.log('ok')
          }).catch(() => {
            console.log('cancel')
          })
          break
      }
    },
  },
}
</script>
```
