### css properties

```html
<fg-input v-model="form.field" clearable size="medium" :css-property="{
                height: '27.5px',
                fontSize: '20px',
                fontWeight: '500',
                color: '#748eb7',
                textAlign: 'center',
                fontFamily: 'Noto Sans JP',
                border: '4px solid #DB3394'
              }" />
<script>
export default {
  data() {
    return {
      form: {
        field: '123456789'
      }
    }
  }
}
</script>
```
