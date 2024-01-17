```html
<div style="background: #1e5199; padding: 20px;">
<div class="form-inner-wrapper">
<h5>基本情報</h5>
<fg-form ref="form" size="mini" label-width="150px">
  <fg-form-item label="お客様の写真">
    <fg-image-processor
      width="80px"
      height="80px"
      :options="{ width: 720, height: 720 }"
      url=""
      @change="avatarChange"
    ></fg-image-processor>
  </fg-form-item>

  <fg-form-item label="fg-image-processor">
    <fg-image-processor
      :options="{ width: 2000 }"
      icon="license-front"
      url=""
    ></fg-image-processor>
    <fg-image-processor
      :options="{ width: 2000 }"
      :url="form.avatar"
      icon="license-back"
    ></fg-image-processor>
  </fg-form-item>
  <fg-form-item label="readonly">
    <fg-image-processor
      :options="{ width: 2000, maxSize: 1024 }"
      icon="car"
      url=""
      readonly
    ></fg-image-processor>
  </fg-form-item>

  <fg-form-item label="icon=car">
    <fg-image-processor
      :options="{ width: 2000 }"
      icon="car"
      url=""
    ></fg-image-processor>
  </fg-form-item>

  <fg-form-item label="個人/法人">
    <fg-radio-group v-model="form.personType">
      <fg-radio label="1">個人</fg-radio>
      <fg-radio label="2">法人</fg-radio>
    </fg-radio-group>
  </fg-form-item>

  <fg-form-item label="氏名" required>
    <fg-row gutter="20" type="flex">
      <fg-col span="12">
        <fg-input placeholder="fg-form-item"></fg-input>
      </fg-col>
      <fg-col span="12">
        <fg-input
          placeholder='fg-row gutter="20" fg-col span=12'
        ></fg-input>
      </fg-col>
    </fg-row>
  </fg-form-item>

  <fg-form-item label="birthday">
    <fg-row gutter="20" type="flex">
      <fg-col span="8">
        <fg-select v-model="form.year" :items="years"></fg-select>
      </fg-col>
      <fg-col span="8">
        <fg-select v-model="form.month" :items="months"></fg-select>
      </fg-col>
      <fg-col span="8">
        <fg-select v-model="form.day" :items="days"></fg-select>
      </fg-col>
    </fg-row>
  </fg-form-item>
</fg-form>
</div>

<dl class="footer-button-wrapper">
<dt>width="240px" suffix-icon="arrow-right"</dt>
<dd>
  <fg-button width="240px" suffix-icon="arrow-right">確認</fg-button>
</dd>
<dt>width="240px" suffix-icon="arrow-right" white-transparent</dt>
<dd>
  <fg-button width="240px" suffix-icon="arrow-right" white-transparent
    >戻る</fg-button
  >
</dd>
</dl>
</div>

<script>
function toDouble(n) {
  return n.toString()[1] ? n : '0' + n
}

export default {
  data() {
    const months = []
    for (let i = 1; i <= 12; i++) {
      months.push({
        text: toDouble(i),
        value: i,
      })
    }
    const days = []
    for (let i = 1; i <= 31; i++) {
      days.push({
        text: toDouble(i),
        value: i,
      })
    }
    return {
      avatarData: {
        url:
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1305069542,2938692060&fm=26&gp=0.jpg',
        name: '米田 道春',
        summary: '（31歳）',
      },
      years: [
        {
          text: '1990',
          value: 1990,
        },
      ],
      months,
      days,
      form: {
        // avatar: 'https://github.com/Atinux.png?size=64',
        avatar:
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1305069542,2938692060&fm=26&gp=0.jpg',
        userName: 'Jock',
        year: 1990,
        month: 5,
        day: 12,
        personType: '1',
      },
    }
  },
  methods: {
    avatarChange(data) {
      console.log(data)
    },
  },
}
</script>
```
