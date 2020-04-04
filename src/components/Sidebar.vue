<template>
  <div class="sidebar">
    <router-link
      v-for="page in PAGES"
      :key="page.value"
      :to="'/' + page.value"
      class="sidebar-item p-x-5 p-y-5 clickable flex column layout-align-center-center">
      <img :src="require('@/assets/icons/' + classObject(page) + '.svg')" :alt="classObject(page)" class="sidebar-icon"/>
      <p class="p-b-5">{{page.label}}</p>
    </router-link>
  </div>
</template>

<script>
import {_} from '@/utils/utils';
import { PAGES } from "../utils/constants";

export default {
  name: "Sidebar",
  data: function() {
    return {
      PAGES: PAGES
    };
  },
  methods: {
    classObject: function(page) {
      let retVal = _.get(page, "class");

      return retVal;
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: $header-height;
  bottom: 0;
  width: $sidebar-width;
  background-color: $dark-grey;
  border-right: 1px solid $beige;
  z-index: 10;

  &-item {
    text-align: center;
    color: $light-grey;
    text-decoration: none;
    height: 105px;
    transition: all 0.3s ease;

    &:hover{
      color: $white;

      .sidebar-icon{
        filter: $filter-white;
      }
    }

    &.router-link-exact-active {
      background: $gold;
      color: $white;

      .sidebar-icon{
        filter: $filter-white;
      }
    }

    .sidebar-icon{
      height: 30px;
      filter: $filter-light-grey;
    }
  }
}
</style>
