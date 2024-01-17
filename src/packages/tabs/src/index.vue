<template>
  <div class="fg-tabs" :class="theme ? `is_${theme}` : ''">
    <ul ref="tabsItems" role="tablist" class="fg-tabs-header">
      <li
        v-for="(tab, i) in tabs"
        v-show="tab.isVisible"
        :key="i"
        :class="{ 'is-active': tab.isActive, 'is-disabled': tab.disabled }"
        class="fg-tabs-header-item"
        role="presentation"
      >
        <a
          :aria-controls="tab.hash"
          :aria-selected="tab.isActive"
          class="tabs-component-tab-a"
          role="tab"
          @click="selectTab(tab.hash, $event)"
        >
          {{ tab.header }}
        </a>
      </li>
      <div ref="line" class="__line" />
    </ul>
    <div class="tabs-panels">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FgTabs',
  props: {
    theme: {
      type: String,
      default: null,
    },
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    tabs: [],
    activeTabHash: '',
    activeTabIndex: 0,
    lastActiveTabHash: '',
  }),
  created() {
    this.tabs = this.$children
  },
  mounted() {
    if (this.tabs.length) {
      const index =
        this.selectedIndex >= 0 && this.selectedIndex < this.tabs.length
          ? this.selectedIndex
          : 0
      const selectedTab = this.tabs[index]
      this.tabs.forEach((tab) => {
        tab.isActive = tab.hash === selectedTab.hash
      })
      this.activeTabHash = selectedTab.hash
      this.activeTabIndex = index
      this.lastActiveTabHash = this.activeTabHash = selectedTab.hash
      this.resetLinePosition()
    }
  },
  methods: {
    findTab(hash) {
      return this.tabs.find((tab) => tab.hash === hash)
    },
    selectTab(selectedTabHash, event) {
      const selectedTab = this.findTab(selectedTabHash)
      if (!selectedTab) {
        return
      }
      if (selectedTab.isDisabled) {
        event.preventDefault()
        return
      }
      if (this.lastActiveTabHash !== selectedTab.hash) {
        this.$emit('changed', {
          newTab: selectedTab,
          oldTab: this.lastActiveTabHash,
        })
      }
      this.tabs.forEach((tab, index) => {
        tab.isActive = tab.hash === selectedTab.hash
        tab.tabIndex = index
      })
      this.$emit('clicked', { tab: selectedTab })
      this.activeTabHash = selectedTab.hash
      this.activeTabIndex = this.getTabIndex(selectedTabHash)
      this.lastActiveTabHash = this.activeTabHash = selectedTab.hash
      this.resetLinePosition()
    },

    getTabIndex(hash) {
      const tab = this.findTab(hash)
      return this.tabs.indexOf(tab)
    },

    getTabHash(index) {
      const tab = this.tabs.find((tab) => this.tabs.indexOf(tab) === index)

      if (!tab) {
        return
      }

      return tab.hash
    },

    getActiveTab() {
      return this.findTab(this.activeTabHash)
    },

    getActiveTabIndex() {
      return this.getTabIndex(this.activeTabHash)
    },

    resetLinePosition() {
      this.$nextTick(() => {
        const tabsItems = this.$refs.tabsItems.querySelectorAll('li')
        const index = this.tabs.findIndex((tab) => tab.isActive)
        const el = tabsItems[index]
        if (!el) return
        this.$refs.line.style.width = el.offsetWidth + 'px'
        this.$refs.line.style.transform = `translateX(${el.offsetLeft}px)`
      })
    },
  },
}
</script>
<style lang="scss">
.fg-tabs {
  margin: 0;
}

.fg-tabs-header {
  border-radius: 6px;
  margin-bottom: 5px;
  border: 0;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  position: relative;

  .__line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    transition: all 0.2s ease-in-out;
    background: $--color-white;
  }
}
.fg-tabs-header li {
  border: 0;
  display: flex;
  justify-content: flex-start;
  color: $--color-white;
  font-size: 14px;
  list-style: none;
  margin: 0 20px;
  position: relative;
}

.fg-tabs-header .is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

.fg-tabs-header li a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: 10px 0;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
}

.is_blue {
  .fg-tabs-header li {
    color: $--color-primary;
  }

  .fg-tabs-header .__line {
    background: $--color-primary;
  }
}
</style>
