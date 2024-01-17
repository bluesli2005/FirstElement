### crop

user photo crop

```html
<fg-image-processor
  :options="options"
  :url="url"
  width="240"
  height="240"
  @change="change" />
<script>
export default {
  data() {
    return {
      url: 'https://i.pinimg.com/originals/b9/09/d7/b909d7450a19279f53fb2b86571dcbfe.jpg',
      options: {
        width: 720,
        height: 720,
      },
    }
  },
  methods: {
    change(res) {
      console.log(res)
    }
  }
}
</script>
```
