<template>
  <div class="flex row page-layout">
    <div class="main p-y-20 m-auto">
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
@import "@/styles/_mixins.scss";
  .page-layout{
    height: calc(100vh - #{$header-height});
    position: absolute;
    top: $header-height;
    left: $sidebar-width;
    right: 0;
    background: $light-grey-l;
    background: linear-gradient(0deg, $light-grey-l 0%, $white 100%);
    overflow: hidden;

    .main{
      flex: 4;
      overflow: auto;
      max-width: 1200px;
      height: 100%;
    }

    .side{
      // flex: 2;
      flex: 2;
      border-left: 1px solid  $beige;
      // max-width: 600px;
      max-width: 0px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;

      @include lg {
        min-width: 360px;
        max-width: 600px;
      }
    }
  }
</style>
