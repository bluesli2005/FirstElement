```html
<fg-pagination
  v-model="currentPage"
  :total="total"
  :page-size="pageSize"
  :show-page-size="true"
  theme="blue"
/>
<script>
  export default {
    data() {
      return {
        total: 234342,
        pageSize: 10,
        currentPage: 3,
      }
    },
  }
</script>
```
