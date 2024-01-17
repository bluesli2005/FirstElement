### transparent

```html
<div class="bg-primary-active p20">
  <fg-select v-model="value" :items="options" theme="transparent" />
</div>
<script>
export default {
  data() {
    return {
      value: 0,
      options: [
       {
         text: 'cars全店',
         value: 1,
       },
     ]
    }
  }
}
</script>
```
