<template>
  <header class="flex row layout-align-center-space-between" :class="{'solid-background': scrollPosition > 70 || isHomeRoute === false}">
    <router-link to="/" class="logo cursor-default" :class="{'clickable': isHomeRoute === false}">Ido Postelnik</router-link>
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


      <a class="m-x-10 separator flex row layout-align-center-center"> 
        <img src="../assets/icons/email.svg"  alt="email" class="icon clickable"/>
      </a>
      
      <a class="flex row layout-align-center-center">
        <img src="../assets/icons/phone.svg" alt="phone" class="icon clickable"/>
      </a>
    </div>
  </header>
</template>

<script>
import {_} from '@/utils/utils';
import { PAGES } from '../utils/constants';

export default {
  name: 'TopHeader',
  data: function () {
    return {
      scrollPosition: null,
      PAGES: PAGES
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
  header{
    height: $header-height;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0 20px;

    .icon{
        filter: $filter-white;
        height: 23px;
        width: 23px;
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
      background-color: $platinum;
      transition: 0.1s;
      box-shadow: 0px 1px 5px 0px rgba($light-grey, 0.75);

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
    }


  }
</style>
