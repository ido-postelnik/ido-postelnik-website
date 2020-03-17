<template>
  <div class="flex row page-layout">
    <div class="main p-y-20">
      <slot></slot>
    </div>

    <div class="side" :style="pageImageStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'PageLayout',
  props: {
    page: {
      type: String,
      default: null
    }
  },
  data: function () {
    return {
    }
  },
  computed: {
    pageImageStyle () {
      let retVal = 'backgroundImage: url(' + require('../assets/img/pages/' + this.page + '.svg') + ')';

      return retVal;
    }
  }
}
</script>

<style scoped lang="scss">
  .page-layout{
    height: calc(100vh - #{$header-height});
    position: absolute;
    top: $header-height;
    left: $sidebar-width;
    right: 0;
    background: $dirty-white;
    background: linear-gradient(0deg, $dirty-white 0%, $white 100%);
    overflow: hidden;

    .main{
      flex: 3;
      overflow: auto;
    }

    .side{
      flex: 2;
      border-left: 1px solid  $beige;
      max-width: 600px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
</style>
