<template>
  <div class="flex row page-layout" :class="{'no-sidebar': isSideBarVisibile === false}">
    <div class="main p-y-20 m-auto">
      <slot></slot>
    </div>

    <div class="side" :style="pageImageStyle"></div>
  </div>
</template>

<script>
// Store
import { mapState } from 'vuex';

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
    ...mapState([
      'isSideBarVisibile'
    ]),
    pageImageStyle () {
      let retVal = 'backgroundImage: url(' + require('../assets/img/pages/' + this.page + '.png') + ')';

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
    left: 40px;
    right: 0;
    background: $light-grey-l;
    background: linear-gradient(0deg, $light-grey-l 0%, $white 100%);
    opacity: 0.3;
    overflow: hidden;
    transition: left 0.2s ease;
    z-index: -1;

    @include md {
      left: $sidebar-width;
      opacity: 1;
    }

    &.no-sidebar{
      left: 0;
      z-index: 1;
      opacity: 1;

      @include lg {
        left: $sidebar-width;
      }
    }

    .main{
      flex: 4;
      overflow: auto;
      max-width: 1200px;
      height: 100%;
      overflow-y: overlay;
    }

    .side{
      flex: 2;
      border-left: 1px solid  $beige;
      max-width: 0px;
      background-repeat: no-repeat;
      background-position: center !important;
      background-size: cover !important;
      background: rgb(247,247,247);
      background: linear-gradient(0deg, rgba(247,247,247,1) 0%, rgba(255,255,255,1) 100%);

      @include lg {
        min-width: 360px;
        max-width: 600px;
      }
    }
  }
</style>
