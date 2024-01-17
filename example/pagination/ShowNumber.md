### show-number

```html
<fg-pagination 
  v-model="currentPage" 
  :total="total"
  :page-size="pageSize"
  :show-number="5"
  theme="blue"
/>
<script>
export default {
  data() {
    return {
      total: 2001,
      pageSize: 10,
      currentPage: 3,
    }
  },
}
</script>
```
