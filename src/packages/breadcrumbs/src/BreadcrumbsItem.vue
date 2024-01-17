<template>
  <div class="fg-breadcrumb-item">
    <span
      ref="link"
      :class="['fg-breadcrumb-item-inner', item.href ? 'is-link' : '']"
      role="link"
    >
      <slot></slot>
    </span>
    <i v-if="!finalFlg" class="icon-divider" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { browserMixin } from '~/mixins/browser'
export default {
  name: 'FgBreadcrumbsItem',
  mixins: [browserMixin],
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    finalFlg: {
      type: Boolean,
      default: false,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('popup', ['getSaveFlg']),
  },
  mounted() {
    if (this.isEditable) this.$store.dispatch('popup/setFlg', true)
    const link = this.$refs.link
    link.setAttribute('role', 'link')
    const { item, $router } = this
    link.addEventListener('click', (_) => {
      if (this.isEditable && item.href) {
        this.popupConfirm(
          this.getSaveFlg,
          () => {
            setTimeout(() => {
              this.$store.dispatch('popup/setFlg', false)
              if (!item.href || !$router) return
              if (item.query) {
                $router.push({ path: item.href, query: item.query })
              } else {
                $router.push(item.href)
              }
            }, 300)
          },
          () => {}
        )
      } else {
        if (!item.href || !$router) return
        if (item.query) {
          $router.push({ path: item.href, query: item.query })
        } else {
          $router.push(item.href)
        }
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.fg-breadcrumb-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: $--color-background;

  .fg-breadcrumb-item-inner {
    display: inline-flex;
    align-items: center;
  }

  .is-link {
    cursor: pointer;
  }
}

.icon-divider {
  margin: 0 8px;
  display: inline-block;
  width: 7px;
  height: 11px;
  background: url('./img/right.svg') no-repeat 0 0;
}
</style>
