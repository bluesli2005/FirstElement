### hide-page-info

```html
<div class="bg-primary-active p20">
  <fg-pagination 
    v-model="currentPage" 
    :total="total"
    :page-size="pageSize"
    theme="white"
    hide-page-info
  />
</div>
<script>
export default {
  data() {
    return {
      total: 2001,
      pageSize: 10,
      currentPage: 10,
    }
  },
}
</script>
```
