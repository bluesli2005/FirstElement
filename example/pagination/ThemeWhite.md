### theme white

```html
<div class="bg-primary-active p20">
  <fg-pagination 
    v-model="currentPage" 
    :total="total"
    :page-size="pageSize"
    theme="white"
  />
</div>
<script>
export default {
  data() {
    return {
      total: 2001,
      pageSize: 10,
      currentPage: 1,
    }
  },
}
</script>
```
