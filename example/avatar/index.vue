<template>
  <div class="example-avatar-wrapper">
    <Docs />
    <h2>Example</h2>
    <TableAvatarData />
    <TextFlexDirectionColumn />
    <TextSummaryNoOffset />
    <AvatarOnly />
    <LongTextData />
  </div>
</template>

<script>
import { customMixin } from '../_app/mixins'
import Docs from '../../docs/avatar.md'
import TableAvatarData from './TableAvatarData.md'
import TextFlexDirectionColumn from './TextFlexDirectionColumn.md'
import TextSummaryNoOffset from './TextSummaryNoOffset.md'
import AvatarOnly from './AvatarOnly.md'
import LongTextData from './LongTextData.md'
export default {
  components: {
    Docs,
    TableAvatarData,
    TextFlexDirectionColumn,
    TextSummaryNoOffset,
    AvatarOnly,
    LongTextData,
  },
  mixins: [customMixin],
}
</script>

<style lang="scss"></style>
