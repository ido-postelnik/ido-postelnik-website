<template>
  <header class="flex row layout-align-center-space-between" :class="{'solid-background': scrollPosition > 70}">
    <p class="logo" @click="goToHome('home')">Ido Postelnik</p>
    <div class="flex row layout-align-center-space-between contact">
      <img src="../assets/icons/email.svg" class="icon" alt="email" height="25"/>
      <p>|</p>
      <img src="../assets/icons/phone.svg" class="icon" alt="phone" height="23"/>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopHeader',
  data: function () {
    return {
      scrollPosition: null
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
      let cuurentRouteName = this.$route.name;

      if(cuurentRouteName !== 'home') {
        this.$router.push({ name: `${page}` });
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
  header{
    // background-color: #fdfdfd;
    height: $header-height;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0 20px;
    color: $white;

    .icon{
      filter: invert(100%) sepia(0%) saturate(1718%) hue-rotate(245deg) brightness(107%) contrast(101%);
    }

    &.solid-background{
      background-color: $platinum;
      transition: 0.1s;
      box-shadow: 0px 1px 5px 0px rgba($light-grey, 0.75);
      color: $dark-grey;

      .icon{
        filter: invert(17%) sepia(12%) saturate(402%) hue-rotate(152deg) brightness(94%) contrast(86%);
      }
    }

    .logo{
      font-family: $font-title;
      font-size: 1.3rem;
      font-weight: 500;
    }

    .contact{
      width: 75px;
    }
  }
</style>
