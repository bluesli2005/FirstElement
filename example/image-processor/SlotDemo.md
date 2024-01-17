### slot

```html
<fg-image-processor accept="*/*" :url="url">
  <template v-slot:placeholder>
    <fg-icon name="edit" color="#999" />
    <div class="ml5">placeholder</div>
  </template>
</fg-image-processor>
<script>
export default {
  data() {
    return {
      url: '',
    }
  },
}
</script>
```
