```html
<div class="bg-primary-active p20">
  <fg-breadcrumbs :items="items">
    <template v-slot:default="{ item }">
      <fg-breadcrumbs-item>
        <template v-slot>
          <h4>{{ item.href }}</h4>
        </template>
      </fg-breadcrumbs-item>
    </template>
  </fg-breadcrumbs>
</div>
<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'HOME',
          href: '/home',
        },
        {
          text: '御客一覧',
          href: '/customer',
        },
        {
          text: '御客詳細',
        },
      ],
    }
  },
}
</script>
```
