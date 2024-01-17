```html
<fg-button type="primary" width="200" @click="handleClick('success')">Success</fg-button>
<fg-button type="warning" width="200" @click="handleClick('error')">Error</fg-button>
<script>
export default {
  methods: {
    handleClick(type) {
      switch (type) {
        case 'success':
          this.$success(['送信が完了しました。', 'ステータスは設定メニューからご確認ください。'])
            .then(() => {
              console.log('ok')
            })
          break
        case 'error':
          this.$error('ステータスはXXX画面からご確認ください。')
            .then(() => {
              console.log('ok')
            })
          break
      }
    },
  },
}
</script>
```
