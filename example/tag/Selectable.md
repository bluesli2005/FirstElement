### selectable

```html
<fg-tag v-model="value1" selectable>Tag001</fg-tag>
<fg-tag v-model="value2" selectable>Tag002</fg-tag>
<fg-tag v-model="value3" selectable>Tag003</fg-tag>
<fg-tag v-model="value4" selectable>Tag004</fg-tag>
<script>
export default {
  data() {
    return {
      value1: false,
      value2: true,
      value3: false,
      value4: false,
    }
  }
}
</script>
```
