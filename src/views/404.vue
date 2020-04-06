<template>
  <div class="page-not-found height-100 flex column layout-align-center-center">
    <img src="../assets/img/other/no-result-found.png" alt="no-result-found">
    <h1 class="m-t-10">Oh, snap! Page not found :/</h1>
    <button class="btn m-t-10" @click="goToHome">Go to home page</button>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  data: function () {
    return {};
  },
  methods: {
    goToHome: function () {
      this.$router.push({ name: `home` });
    }
  }
};
</script>

<style scoped lang="scss">
  .page-not-found{
    height: calc(100vh - #{$header-height});
    position: absolute;
    top: $header-height;
    left: $sidebar-width;
    right: 0;

    h1{
      font-size: calc(1.0rem + 0.2vw);
    }

    img{
      width: calc(200px + 5.0vw);
      height: auto;
    }
  }
</style>