<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8.484"
    height="9.199"
    viewBox="0 0 8.484 9.199"
    :style="svgStyle"
  >
    <g transform="translate(8.484 9.199) rotate(180)">
      <path
        d="M7.95,0,4.5,3.45,1.05,0,0,1.05l4.5,4.5L9,1.05Z"
        transform="translate(0 9.199) rotate(-90)"
        fill-rule="evenodd"
      />
      <rect width="1.5" height="9" transform="translate(6.984)" />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'white',
    },
  },
  computed: {
    svgStyle() {
      const COLORS = {
        white: this.$colors.white,
        blue: this.$colors.primaryActive,
      }
      return {
        fill: 'currentColor',
        color: COLORS[this.theme],
      }
    },
  },
}
</script>
