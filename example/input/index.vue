<template>
  <div class="example-input-wrapper">
    <Docs />

    <h2>Example</h2>

    <Clearable />
    <Inline />
    <Length />
    <Unit />
    <CustomFormatter />
    <Icons />
    <Password />
    <Password2 />
    <Disabled />
    <Round />
    <Textarea />
    <CssProperty />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/input.md'
import Clearable from './Clearable.md'
import Inline from './Inline.md'
import Length from './Length.md'
import Unit from './Unit.md'
import CustomFormatter from './CustomFormatter.md'
import Icons from './Icons.md'
import Password from './Password.md'
import Password2 from './Password2.md'
import Disabled from './Disabled.md'
import Round from './Round.md'
import Textarea from './Textarea.md'
import CssProperty from './CssProperty.md'

export default {
  components: {
    Docs,
    Clearable,
    Inline,
    Length,
    Unit,
    CustomFormatter,
    Icons,
    Password,
    Password2,
    Disabled,
    Round,
    Textarea,
    CssProperty,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss">
.example-input-wrapper {
}
</style>
