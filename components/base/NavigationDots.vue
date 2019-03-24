<template>
  <div class="navigationDots">
    <ul class="dots__container">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="['dot', { '--isActive':isActive(item) }]"
        @click="handleDotClick(item)"
      />

    </ul>
  </div>
</template>

<script>
export default {
  name: "NavigationDots",
  props: {
    menuItems: {
      type: Array,
      default: () => []
    },
    activeTabName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    isActive(tabName) {
      return tabName === this.activeTabName;
    },
    handleDotClick(tabName){
      this.$emit('onMenuItemChange', tabName)
    }
  }
};
</script>

<style scoped lang="stylus">
.navigationDots
    width 100%
    height 30px
    .dots__container
      width 100%
      height 100%
      display flex
      justify-content center
      align-items center
      .dot
        cursor pointer
        display block
        height 12px
        width 12px
        border-radius 50%
        background-color grey
        margin-left 5px
        &.--isActive
          background-color #610061

</style>
