<template>
  <div id="app">
    <app-header class="header"/>
    <sidebar v-if="currentRouteName !== 'home'"/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    AppHeader,
    Sidebar
  },
  data: function () {
    return {}
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  }
}
</script>

<style lang="scss">
</style>
