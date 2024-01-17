### show-before-dash, show-after-dash

```html
<fg-calendar v-model="date1" inline />
<fg-calendar v-model="date2" inline show-before-dash class="ml15 mr40" />

<fg-calendar v-model="date3" inline show-after-dash :dash-offset="-11" />
<fg-calendar v-model="date4" inline class="ml30" />
<script >
export default {
  data() {
    return {
      date1: '',
      date2: '',
      date3: '',
      date4: '',
    }
  }
}
</script>
```
