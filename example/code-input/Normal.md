code: {{ code }}

code2: {{ code2 }}

```html
<fg-code-input v-model="code" width="300" @change="handleChange" />
<fg-code-input v-model="code2" item-width="60" width="400" class="mt20" />
<script>
export default {
  data() {
    return {
      code: '',
      code2: '198987',
    }
  },
  methods: {
    handleChange(value) {
      console.log('handleChange', value)
    }
  }
}
</script>
```
