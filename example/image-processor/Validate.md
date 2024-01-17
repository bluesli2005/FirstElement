### validate

```html
<fg-image-processor
  accept="*/*"
  :options="options"
  :url="url"
  :validate="customValidate"
  @change="change" />
<script>
export default {
  data() {
    return {
      url: 'https://i.pinimg.com/originals/b9/09/d7/b909d7450a19279f53fb2b86571dcbfe.jpg',
      options: {
        width: 2000,
      },
    }
  },
  methods: {
    customValidate(file, next) {
      // check file type
      if (!/^image\/\w+/.test(file.type)) {
        this.$alert('Invalidate file type')
        return
      }
      // check file size
      if (file.size / 1024 > 1024) {
        this.$alert('File size cannot exceed 1MiB')
        return
      }
      next()
    },
    change(res) {
      console.log(res)
    }
  }
}
</script>
```
