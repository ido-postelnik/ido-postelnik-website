<template>
  <header class="flex row layout-align-center-space-between" :class="{
    'inner-page-background': isHomeRoute === false,
    'solid-background': scrollPosition > 0 || isHomeRoute === false || activeWorkFlowMode !== workFlowModes.PRODUCTION.value,
    'sketch-mode': activeWorkFlowMode === workFlowModes.SKETCH.value,
    'wireframe-mode': activeWorkFlowMode === workFlowModes.WIREFRAME.value,
    'code-mode': activeWorkFlowMode === workFlowModes.CODE.value}">
    
    <div class="left-side flex row layout-align-center-center">
      <router-link to="/" @click.native="onLogoClick" class="logo cursor-default clickable m-r-10">
        <img src="@/assets/img/logo/logo.svg" alt="logo" />
      </router-link>
      <img src="@/assets/icons/menu.svg" alt="menu" class="icon menu-icon clickable m-r-15" v-show="isHomeRoute === false" @click="onMenuIconClick">
    </div>

    <div class="right-side flex row layout-align-center-space-between">
      <div class="flex hide-on-sm" v-if="isHomeRoute === true" >
        <router-link
          v-for="page in PAGES"
          :key="page.value"
          :to="'/' + page.path"
          class="link clickable m-r-30">{{page.label}}
        </router-link>
      </div>

      <a href="#contact" @click="onContactClick(event)" class="link clickable">Contact</a>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'; // Store
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
    onLogoClick() {
      if (this.isHomeRoute) {
        window.scrollTo(0,0);
      }
      this.toggleSidebar('close');
    },
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
    },
    onContactClick() {
      if(this.isHomeRoute) {
        this.$router.push('#contact');
      } else {
        this.$router.push({ name: `home` });
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

.show-on-sm{
  display: block;

  @include md {
    display: none;
  }
}

.hide-on-sm{
  display: none;

  @include md {
    display: flex;
  }
}

@mixin solid-background {
  box-shadow: 0px 1px 1px 0px rgba($beige, 0.75);
  height: $header-height;

  &.inner-page-background{
    background-color: $white;

    .right-side{
      .link{
        color: $dark-grey;
      }
    }
  }

  .right-side{
    .link{
      color: $white;

      &:hover{
        color: $green-l;
      }

      &:active{
        color: $white;
      }
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
    height: $header-height + $header-height-addon;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0 20px 0 20px;
    transition: all 0.1s ease;
    background-color: $dark-grey;

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
      // font-family: $font-title;
      // font-size: 30px;
      // font-weight: 500;
      // color: $dark-grey;
      width: 45px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      // border: 1px solid $dark-grey;
      border-radius: 100px;
      // background: $white;
      transition: all 0.1s ease;
    }

    .right-side{
      color: $white;

      .link{
        color: $white;
        font-weight: 300;
        letter-spacing: 2px;
        transition: color 0.15s ease;

        &:hover{
          color: $green-l;
        }

        @include lg {
          display: block;
        }
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

        .right-side{
          .link{
            color: $dark-grey;

            &:hover{
              color: $green-l;
            }
          }
        }
      }

      // Wireframe mode
      &.wireframe-mode{
        background-color: $light-grey-l;
        box-shadow: 0px 1px 5px 0px rgba($light-grey-d, 0.75);

        .right-side{
          .link{
            color: $dark-grey;

            &:hover{
              color: $green-l;
            }
          }
        }
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
        }
      }
    }
  }
</style>
