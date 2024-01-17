### custom-formatter

```html
<fg-input 
  v-model="form.field" 
  width="210" unit="円"
  placeholder="自賠責保険"
  :offset-left="20"
  :custom-formatter="customFormatter">
  <template v-slot:prefix>$</template>
</fg-input>
<script>
import { toCommaNumber } from '~/plugins/first-group-ui/src/libs/index'

export default {
  data() {
    return {
      form: {
        field: 20500
      }
    }
  },
  methods: {
    customFormatter(value, vm) {
      return toCommaNumber(value, true)
    },
  },
}
</script>
```
