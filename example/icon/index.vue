<template>
  <div class="example-icon-wrapper">
    <Docs />
    <h2>Icons</h2>

    <fg-row>
      <fg-col v-for="(icon, i) in icons" :key="i" span="4">
        <fg-icon :name="icon" />
        <p class="mt10">{{ icon }}</p>
      </fg-col>
    </fg-row>
    <h2>Example</h2>
    <Normal />
  </div>
</template>

<script>
import Docs from '../../docs/icon.md'
import { customMixin } from '../_app/mixins'
import Normal from './Normal.md'

const icons = [
  'arrow-top',
  'arrow-right',
  'arrow-down',
  'arrow-left',
  'birthday-pink',
  'birthday',
  'building',
  'calculator',
  'calendar',
  'car-line',
  'change',
  'chat',
  'check-tool',
  'clock',
  'close',
  'contact-us',
  'customer-shop',
  'd-arrow-left',
  'dash',
  'download',
  'edit',
  'email',
  'exclamation',
  'exclamation-circle',
  'exclamation-circle-line',
  'export-icon',
  'eye',
  'flag-done',
  'flag',
  'gear',
  'google',
  'hook',
  'hand-shake',
  'less',
  'line',
  'magnifier',
  'magnifier-less',
  'magnifier-plus',
  'mobile',
  'phone',
  'plus',
  'paperclip',
  'qm-circle',
  'q-naire',
  'required',
  'search',
  'send',
  'send-accessories',
  'send-buy',
  'send-coating',
  'send-inspection',
  'send-insurance',
  'send-maintenance',
  'send-oil',
  'send-sale',
  'send-sheet-metal',
  'send-wash',
  'send-bg-accessories',
  'send-bg-buy',
  'send-bg-inspection',
  'send-bg-insurance',
  'send-bg-maintenance',
  'send-bg-sale',
  'send-bg-sheet-metal',
  'success',
  'tag-done',
  'tag',
  'tel',
  'trash',
  'upload',
]
export default {
  components: {
    Docs,
    Normal,
  },
  mixins: [customMixin],
  data() {
    return {
      icons,
    }
  },
}
</script>

<style lang="scss">
.example-icon-wrapper {
  .fg-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
    height: 100px;
    .fg-icon svg {
      max-width: 55px;
      max-height: 55px;
    }
  }
}
</style>
