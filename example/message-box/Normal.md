```html
<fg-button type="primary" width="200" @click="handleClick('alert')">Alert</fg-button>
<fg-button type="warning" width="200" @click="handleClick('confirm')">Confirm</fg-button>
<script>
export default {
  methods: {
    handleClick(type) {
      switch (type) {
        case 'alert':
          this.$alert('this is a alert message')
            .then(() => {
              console.log('ok')
            })
            .catch(() => {
              console.log('cancel')
            })
          break
        case 'confirm':
          this.$confirm('this is a confirm message')
            .then(() => {
              console.log('ok')
            })
            .catch(() => {
              console.log('cancel')
            })
          break
      }
    },
  },
}
</script>
```
