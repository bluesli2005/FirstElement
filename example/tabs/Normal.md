```html
<fg-tabs @clicked="tabClicked" @changed="tabChanged">
  <fg-tabs-item name="First tab">
    This is the content of the first tab
  </fg-tabs-item>
  <fg-tabs-item name="Second tab">
    This is the content of the second tab
  </fg-tabs-item>
  <fg-tabs-item name="Third tab">
    This content will be unavailable while :is-disabled prop set to true
  </fg-tabs-item>
  <fg-tabs-item name="Forth tab">
    The fragment that is appended to the url can be customized
  </fg-tabs-item>
</fg-tabs>

<script>
  export default {
    data() {
      return {
        itemList: [],
      }
    },
    methods: {
      tabClicked() {},
      tabChanged() {},
    },
  }
</script>
```
