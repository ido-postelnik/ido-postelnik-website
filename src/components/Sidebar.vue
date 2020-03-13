<template>
  <div class="sidebar">
    <router-link v-for="page in PAGES" :key="page.value" :to="page.value" class="sidebar-page p-x-5 p-y-5 clickable">
      <p class="p-y-5">{{page.label}}</p>
      <div class="page-image" :class="classObject(page)"></div>
    </router-link>
  </div>
</template>

<script>
import {PAGES} from '../utils/constants';

export default {
  name: 'Sidebar',
  data: function () {
    return {
      PAGES: PAGES
    }
  },
  methods: {
    classObject: function(page) {
      let retVal = _.get(page, 'class');

      return retVal;
    }
  }
}
</script>

<style scoped lang="scss">
  .sidebar{
    position: fixed;
    left: 0;
    top: $header-height;
    bottom: 0;
    width: $sidebar-width;
    background-color: $white;
    border-right: 1px solid $dirty-white;

    &-page{
      text-align: center;
      border-bottom: 1px solid $dirty-white;
      display: block;
      color: $dark-blue-grey;
      text-decoration: none;

      &.router-link-exact-active{
        background: rgb(29,233,182);
        background: linear-gradient(90deg, rgba(29,233,182,1) 0%, rgba(0,214,194,1) 100%);
        color: $white;
      }

      .page-image{
        width: 100%;
        height: 90px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }

  }
</style>
