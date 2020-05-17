<template>
  <header class="flex row layout-align-center-space-between" :class="{
    'solid-background': scrollPosition > 0 || isHomeRoute === false || activeWorkFlowMode !== workFlowModes.PRODUCTION.value,
    'sketch-mode': activeWorkFlowMode === workFlowModes.SKETCH.value,
    'wireframe-mode': activeWorkFlowMode === workFlowModes.WIREFRAME.value,
    'code-mode': activeWorkFlowMode === workFlowModes.CODE.value}">
    
    <div class="left-side flex row layout-align-center-center">
      <router-link to="/" class="logo cursor-default m-r-10" :class="{'clickable': isHomeRoute === false}">IP</router-link>
      <img src="@/assets/icons/menu.svg" alt="menu" class="icon menu-icon clickable m-r-15" v-show="isHomeRoute === false" @click="onMenuIconClick">
    </div>

    <div class="right-side flex row layout-align-center-space-between">
      <div class="flex" v-if="isHomeRoute === true">
        <router-link
          v-for="page in PAGES"
          :key="page.value"
          :to="'/' + page.path"
          class="link clickable">
          <p class="separator">{{page.label}}</p>
        </router-link>
      </div>

      <a :href="EMAIL.value" target="_blank" class="separator flex row layout-align-center-center"> 
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
  name: 'AppHeader',
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

@mixin solid-background {
  background-color: $white;
  box-shadow: 0px 1px 5px 0px rgba($beige, 0.75);

  .right-side{
      color: $dark-grey;

    .link{
      color: $dark-grey;

      &:hover{
        color: $green-l;
      }
    }

    .separator::after{
      border-right: 1px solid $dark-grey;
      padding-left: 15px;
      margin-right: 15px;
    }
  }
  
  .icon{
    filter: $filter-dark-grey;

    &:hover{
      filter: $filter-light-green;
    }
  }

  .logo{
    color: $dark-grey;
    width: 35px;
    height: 35px;
    line-height: 35px;
    font-size: 22px;
    margin-top: 0;
  }
}

  header{
    height: $header-height;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0 20px;
    transition: all 0.1s ease;

    .left-side{
      flex-direction: row-reverse;
      @include lg {
        flex-direction: row;
      }
    }

    .icon{
      filter: $filter-dark-grey;
      height: 22px;
      width: 23px;

      &:hover{
        filter: $filter-light-green;
      }
    }

    .menu-icon{
      width: 20px;

      @include lg {
        display: none;
      }
    }

    .logo{
      font-family: $font-title;
      font-size: 30px;
      font-weight: 500;
      color: $dark-grey;
      width: 45px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      border: 1px solid $dark-grey;
      border-radius: 100px;
      background: $white;
      margin-top: 10px;
      transition: all 0.1s ease;
    }

    .right-side{
      color: $white;

      .link{
        color: $dark-grey;
        font-weight: 300;
        font-family: $font-title;
        letter-spacing: 1px;
        transition: color 0.15s ease;
        display: none;

        &:hover{
          color: $green-l;
        }

        @include lg {
          display: block;
        }
      }

      .separator::after{
        content: '';
        display: inline-block;
        height: 10px;
        border-right: 1px solid $dark-grey;
        padding-left: 25px;
        margin-right: 25px;
        transition: all 0.1s ease;
      }
    }

    @include max-lg {
      @include solid-background;
    }

    &.solid-background{
      @include solid-background;

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
        left: 25%;
        border-left: 1px solid $light-grey-d;

        .logo{
          color: $dark-grey;
        }

        .icon{
          filter: $filter-white;

          &:hover{
            filter: $filter-light-green;
          }
        }

        .right-side{
          
          .link{
            color: $white;

            &:hover{
              color: $green-l;
            }
          }

          .separator::after{
            content: '';
            border-right: 1px solid $white;
          }
        }
      }
    }
  }
</style>
