<template>
  <div class="fg-customer-rank">
    <div v-if="vip" class="rank-wrapper vip">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15.231"
        height="10.434"
        viewBox="0 0 15.231 10.434"
      >
        <path
          id="Path_4484"
          data-name="Path 4484"
          d="M15.231,61.318a1.274,1.274,0,0,0-1.157-1.365,1.274,1.274,0,0,0-1.157,1.365,1.5,1.5,0,0,0,.325.948c-.787,1.924-2.291,2.6-3.457,1.988-1.038-.542-1.421-2.092-1.551-3.293a1.624,1.624,0,0,0,.712-1.391A1.465,1.465,0,0,0,7.615,58a1.466,1.466,0,0,0-1.331,1.571A1.624,1.624,0,0,0,7,60.961c-.13,1.2-.513,2.75-1.551,3.293-1.166.608-2.67-.064-3.457-1.988a1.5,1.5,0,0,0,.325-.948,1.274,1.274,0,0,0-1.157-1.365A1.274,1.274,0,0,0,0,61.318a1.309,1.309,0,0,0,1.008,1.354l1.334,5.763H12.89l1.334-5.763A1.309,1.309,0,0,0,15.231,61.318Z"
          transform="translate(0 -58)"
          fill="inherit"
        />
      </svg>
      <span>VIP</span>
    </div>
    <div v-else class="rank-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10.464"
        height="10"
        viewBox="0 0 10.464 10"
      >
        <path
          id="Path_4523"
          data-name="Path 4523"
          d="M10.438,15.133a.554.554,0,0,0-.527-.384H6.729l-.969-3.017a.554.554,0,0,0-1.054,0l-.969,3.017H.554a.554.554,0,0,0-.323,1L2.811,17.6,1.818,20.62a.554.554,0,0,0,.853.62l2.561-1.877L7.793,21.24a.554.554,0,0,0,.853-.62L7.653,17.6l2.58-1.852A.554.554,0,0,0,10.438,15.133Z"
          transform="translate(0 -11.347)"
          fill="inherit"
        />
      </svg>
      <span>{{ rank }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FgCustomerRank',
  props: {
    vip: {
      type: Boolean,
      default: false,
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss">
.fg-customer-rank {
  display: inline-block;
  .rank-wrapper {
    width: 46px;
    height: 16px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $--color-white;
    color: $--color-primary;
    border: 1px solid $--color-border;
    svg {
      fill: $--color-primary;
      margin-right: 3.5px;
    }
    span {
      font-size: 12px;
      font-weight: bold;
    }
  }
  .vip {
    background: $--color-warning;
    color: $--color-white;
    border: none;
    svg {
      fill: $--color-white;
    }
    span {
      font-size: 10px;
      font-weight: bold;
    }
  }
}
</style>
