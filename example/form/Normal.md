
```html
<fg-form 
  ref="form" 
  label-width="120px"
  @change="formChange"
  >
  <fg-form-item label="Event Name" required>
    <fg-input v-model="form.name"></fg-input>
  </fg-form-item>
  <fg-form-item label="Area">
    <fg-select v-model="form.region" :items="[{text: 'Tokyo', value: 1}, {text: 'Osaka', value: 2}]">
    </fg-select>
  </fg-form-item>
  <fg-form-item label="Date" required>
    <fg-row gutter="20" overflow-hide>
      <fg-col span="12">
        <fg-form-item>
          <fg-calendar type="date" v-model="form.date1" show-after-dash clearable />
        </fg-form-item>
      </fg-col>
      <fg-col span="12">
        <fg-form-item>
          <fg-date-picker v-model="form.date2" clearable></fg-date-picker>
        </fg-form-item>
      </fg-col>
    </fg-row>
  </fg-form-item>
  <fg-form-item>
    <fg-checkbox 
      v-model="form.checked" 
      label="checkbox" 
      :error-message="form.checked ? '' : 'チェックしてください'" />
  </fg-form-item>
  <fg-form-item>
    <fg-button
      type="primary"
      @click="submitForm"
      size="small"
      width="120">Create</fg-button>
  </fg-form-item>
</fg-form>


<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          checked: false,
        },
      };
    },
    methods: {
      formChange() {
        // validate
        console.log(JSON.stringify(this.form, null, 2))
      },
      submitForm() {
        console.log('submit')
      },
    }
  }
</script>

<style lang="scss">
.demo-rule-form {
  width: 640px;
  max-width: 100%;
}
</style>
```
