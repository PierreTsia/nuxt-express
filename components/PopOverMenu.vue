<template>
  <v-menu
    :close-on-content-click="false"
    :nudge-width="200"
    :transition="transition"
    class="pop_over_menu"
    offset-y
  >
    <v-btn
      slot="activator"
      class="accent--text"
      bottom
      offset-y
      icon
    >
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <v-list>
      <slot name="menu_list"/>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: "PopOverMenu",
  props: {
    transition:{
      type: String,
      default:"slide-y-transition"
    },
    icon: {
      type: String,
      default:"more_vert"
    }
  }
};
</script>
<style lang="stylus" scoped>


</style>
