<template>
  <div id="app">
    <top-header class="header"/>
    <sidebar v-if="currentRouteName !== 'home'"/>
    <!-- <transition name="fade"> -->
    <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
    TopHeader,
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
  // font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

.fade-enter-active  {
  transition: opacity 0.1s;
}
.fade-enter{
  opacity: 0;
}
</style>
