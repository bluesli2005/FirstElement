### format

date1: {{ date1 }}
date2: {{ date2 }}

```html
<fg-calendar v-model="date1" format="yyyy年MM月dd日(W)" value-format="yyyy-MM-dd" inline />
<fg-calendar v-model="date2" format="yyyy-MM-dd" value-format="yyyy/MM/dd" inline />
<script >
export default {
  data() {
    return {
      date1: '1998/06/23',
      date2: '',
    }
  }
}
</script>
```
