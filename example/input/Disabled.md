### disabled, size, readonly

```html
<fg-input value="default size" disabled />
<fg-input value="medium size" disabled size="medium" style="margin-top: 10px;" />
<fg-input v-model="value" disabled size="small" style="margin-top: 10px;" />
<fg-input value="mini size" disabled size="mini" style="margin-top: 10px;" />
<fg-input value="readonly" readonly style="margin-top: 10px;" />
<script>
export default {
  data() {
    return {
      value: 'small',
    }
  }
}
</script>
```
