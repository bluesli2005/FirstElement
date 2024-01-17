<template>
  <div class="example-form-wrapper">
    <Docs />

    <h2>Example</h2>
    <Normal />
    <ErrorMessage />
    <Demo2 />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/form.md'
import Normal from './Normal.md'
import ErrorMessage from './ErrorMessage.md'
import Demo2 from './Demo2.md'

export default {
  components: {
    Docs,
    Normal,
    ErrorMessage,
    Demo2,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss">
.example-form-wrapper {
  color: $--color-primary;
  overflow: hidden;
  .form-inner-wrapper {
    margin: 30px auto;
    padding: 24px;
    width: 712px;
    background: $--color-white;
    border-radius: 6px;
  }
  .footer-button-wrapper {
    text-align: center;
    overflow: hidden;
    padding-bottom: 20px;
    dt {
      color: #fff;
      opacity: 0.8;
      margin: 20px auto 10px;
    }
  }
}
</style>
