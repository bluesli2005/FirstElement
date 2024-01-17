<template>
  <div>
    <Docs />
    <h2>Example</h2>
    <Normal />
    <Border />
    <BorderSize />
    <Disabled />
    <Group />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/radio.md'
import Normal from './Normal.md'
import Group from './Group.md'
import Border from './Border.md'
import BorderSize from './BorderSize.md'
import Disabled from './Disabled.md'

export default {
  components: {
    Border,
    BorderSize,
    Disabled,
    Docs,
    Normal,
    Group,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
