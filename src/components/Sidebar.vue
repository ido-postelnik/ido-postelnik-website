<template>
  <div class="sidebar">
    <router-link 
      v-for="page in PAGES" 
      :key="page.value" 
      :to="'/' + page.path" 
      class="sidebar-item p-x-5 p-y-5 clickable flex column layout-align-center-center"
      v-on:click.native="onLinkClick"
    >
      <img :src="require('@/assets/icons/' + classObject(page) + '.svg')" :alt="classObject(page)" class="sidebar-icon"/>
      <p class="p-b-5">{{page.label}}</p>
    </router-link>
  </div>
</template>

<script>
import {_} from '@/utils/utils';
import { mapState, mapMutations } from 'vuex';
import { PAGES } from "../utils/constants";

export default {
  name: "Sidebar",
  data: function() {
    return {
      PAGES: PAGES
    };
  },
  methods: {
    ...mapMutations([
      'toggleSidebar'
    ]),
    classObject: function(page) {
      let retVal = _.get(page, "class");

      return retVal;
    },
    onLinkClick() {
      const windowWidth = window.innerWidth;

      if(windowWidth < 768) {
        setTimeout(() => {
          this.toggleSidebar();
        }, 50);
      }
    },
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

.sidebar {
  position: fixed;
  left: 0;
  top: $header-height;
  bottom: 0;
  width: $sidebar-width-md;
  background-color: $dark-grey;
  border-right: 1px solid $beige;
  z-index: 0;

  @include md {
    width: $sidebar-width;
  }

  &-item {
    text-align: center;
    color: $light-grey;
    text-decoration: none;
    height: 90px;
    transition: all 0.3s ease;

    @include md {
      height: 105px;
    }

    &:hover{
      color: $white;

      .sidebar-icon{
        filter: $filter-white;
      }
    }

    &.router-link-exact-active {
      background: #387de5;
      color: $white;

      .sidebar-icon{
        filter: $filter-white;
      }
    }

    .sidebar-icon{
      height: 26px;
      filter: $filter-light-grey;

      @include md {
        height: 30px;
      }
    }

    p{
      font-size: 0.9rem;

      @include md {
        font-size: 1rem;
      }
    }
  }
}
</style>
