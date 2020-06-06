<template>
  <div id="app">
    <app-header class="header"/>
    <sidebar v-if="currentRouteName !== 'home'"/>
    <!-- <transition name="fade"> -->
    <router-view/>
    <!-- </transition> -->
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
#app {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active  {
  transition: opacity 0.1s;
}
.fade-enter{
  opacity: 0;
}
</style>
