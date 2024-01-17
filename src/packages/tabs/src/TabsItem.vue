<template>
  <section
    v-show="isActive"
    :id="computedId"
    :aria-hidden="!isActive"
    class="tabs-item-panel"
    role="tabpanel"
  >
    <slot />
  </section>
</template>

<script>
export default {
  name: 'FgTabsItem',
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isActive: false,
    isVisible: true,
  }),
  computed: {
    header() {
      return this.prefix + this.name + this.suffix
    },
    computedId() {
      return this.id ? this.id : this.name.toLowerCase().replace(/ /g, '-')
    },
    hash() {
      if (this.disabled) {
        return '#'
      }
      return '#' + this.computedId
    },
  },
}
</script>
