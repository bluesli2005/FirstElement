```html
<fg-date-picker v-model="date" format="yyyy/MM/dd hh:mm" inline width="200" />
<fg-date-picker 
  v-model="date1" 
  format="yyyy/MM/dd（W）hh:mm" 
  inline 
  width="200" 
  clearable
  class="ml20"
/>
<script>
export default {
  data() {
    return {
      date: '2020-08-12 12:55',
      date1: '2020-09-12（火）12:55',
    }
  },
}
</script>
```
