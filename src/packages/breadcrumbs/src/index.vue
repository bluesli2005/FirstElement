<script>
import FgBreadcrumbsItem from './BreadcrumbsItem.vue'
export default {
  name: 'FgBreadcrumbs',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    genItems(createElement) {
      const items = []
      const hasSlot = !!this.$scopedSlots.item
      const keys = []
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        keys.push(item.text)

        if (hasSlot) {
          items.push(item)
        } else {
          items.push(
            createElement(
              FgBreadcrumbsItem,
              {
                key: keys.join('.'),
                props: { item, finalFlg: i === this.items.length - 1 },
              },
              [item.text]
            )
          )
        }
      }

      return items
    },
  },

  render(createElement) {
    const children = this.$slots.default || this.genItems(createElement)
    return createElement(
      'ul',
      {
        staticClass: 'fg-breadcrumbs',
      },
      children
    )
  },
}
</script>
<style lang="scss">
.fg-breadcrumbs {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto;
  list-style-type: none;
  margin: 0;
}
</style>
