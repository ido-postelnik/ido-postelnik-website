<template>
  <header class="flex row layout-align-center-space-between" :class="{
    'solid-background': scrollPosition > 70 || isHomeRoute === false || activeWorkFlowMode !== workFlowModes.PRODUCTION.value,
    'sketch-mode': activeWorkFlowMode === workFlowModes.SKETCH.value,
    'wireframe-mode': activeWorkFlowMode === workFlowModes.WIREFRAME.value,
    'code-mode': activeWorkFlowMode === workFlowModes.CODE.value}">
    <div class="flex row layout-align-center-center">
      <router-link to="/" class="logo cursor-default m-r-10" :class="{'clickable': isHomeRoute === false}">Ido Postelnik</router-link>
      <img src="@/assets/icons/menu.svg" alt="menu" class="icon menu-icon clickable" v-show="isHomeRoute === false" @click="onMenuIconClick">
    </div>


    <!-- <p class="logo cursor-default" @click="goToHome('home')" :class="{'clickable': isHomeRoute === false}">Ido Postelnik</p> -->
    <div class="flex row layout-align-center-space-between contact">
      <!-- <div class="flex" v-if="isHomeRoute === true">
        <router-link
          v-for="page in PAGES"
          :key="page.value"
          :to="'/' + page.value"
          class="link clickable">
          <p class="separator p-l-10">{{page.label}}</p>
        </router-link>
      </div> -->

      <a :href="EMAIL.value" class="m-x-10 separator flex row layout-align-center-center"> 
        <img src="@/assets/icons/email.svg" alt="email" class="icon clickable"/>
      </a>
      
      <a :href="PHONE_NUMBER.value" class="flex row layout-align-center-center">
        <img src="@/assets/icons/phone.svg" alt="phone" class="icon clickable"/>
      </a>
    </div>
  </header>
</template>

<script>
// Store
import { mapState, mapMutations } from 'vuex';

import {_} from '@/utils/utils';
import { PAGES, WORK_FLOW_MODES, EMAIL, PHONE_NUMBER } from '../utils/constants';

export default {
  name: 'TopHeader',
  data: function () {
    return {
      scrollPosition: null,
      PAGES,
      workFlowModes: WORK_FLOW_MODES,
      EMAIL,
      PHONE_NUMBER
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  created() {
  },
  methods: {
    ...mapMutations([
      'toggleSidebar'
    ]),
    onMenuIconClick() {
      this.toggleSidebar();
    },
    onScroll() {
      this.scrollPosition = window.scrollY;
    },
    goToHome: function (page) {
      let cuurentRouteName = _.get(this, '$route.name');

      if(cuurentRouteName !== 'home') {
        this.$router.push({ name: `${page}` });
      }
    }
  },
  computed: {
    ...mapState([
      'activeWorkFlowMode'
    ]),
    isHomeRoute() {
      let retVal = false;
      let cuurentRouteName = this.$route.name;

      if(cuurentRouteName === 'home') {
        retVal = true;
      }
      
      return retVal;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

  header{
    height: $header-height;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0 20px;
    transition: all 0.1s ease-in-out;

    .icon{
      filter: $filter-white;
      height: 23px;
      width: 23px;
    }

    .menu-icon{
      width: 20px;

      @include lg {
        display: none;
      }
    }

    .logo{
      font-family: $font-title;
      font-size: 1.3rem;
      font-weight: 500;
      color: $white;
      width: 160px;
    }

    .contact{
      color: $white;

      .link{
        color: $white;
        font-weight: 300;
      }

      .separator::after{
        content: '';
        display: inline-block;
        height: 10px;
        border-right: 1px solid $white;
        padding-left: 10px;
      }
    }

    &.solid-background{
      background-color: $white;
      box-shadow: 0px 1px 5px 0px rgba($beige, 0.75);

      .contact{
         color: $dark-grey;

        .link{
          color: $dark-grey;
        }

        .separator::after{
          border-right: 1px solid $dark-grey;
        }
      }
      
      .icon{
        filter: $filter-dark-grey;
      }

      .logo{
        color: $dark-grey;
      }

      // Sketch mode
      &.sketch-mode{
        background-color: $note-book-sketch;
      }

      // Wireframe mode
      &.wireframe-mode{
        background-color: $light-grey-l;
        box-shadow: 0px 1px 5px 0px rgba($light-grey-d, 0.75);
      }

      // Code mode
      &.code-mode{
        background-color: $jsfiddle;
        box-shadow: none;

        .logo{
          color: $white;
        }

        .icon{
          filter: $filter-white;
        }

        .contact{
          color: $white;

          .separator::after{
            content: '';
            border-right: 1px solid $white;
          }
        }

      }
    }
  }
</style>
