<template>
  <router-link :to="data.value" class="card flex column" :class="{
      'sketch-mode': activeWorkFlowMode === workFlowModes.SKETCH.value,
      'wireframe-mode': activeWorkFlowMode === workFlowModes.WIREFRAME.value,
      'code-mode': activeWorkFlowMode === workFlowModes.CODE.value}">
    <h3 class="card-title">{{ data.label }}</h3>
    <div class="card-image m-auto" :class="classObject"></div>
  </router-link>
</template>

<script>
// Store
import { mapState } from 'vuex';

import { WORK_FLOW_MODES } from "@/utils/constants";
import {_} from '@/utils/utils';

export default {
  name: 'PageCard',
  data: () => {
    return {
      workFlowModes: WORK_FLOW_MODES
    };
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState([
      'activeWorkFlowMode'
    ]),
    classObject: function () {
      let retVal = _.get(this, 'data.class');
      retVal = `${retVal}-home`;

      return retVal;
    }
  },
  methods: {
    goTo: function (page) {
      console.log('page: ', page);
      this.$router.push({ name: `${page}` })
    }
  }
}
</script>

<style scoped lang="scss">
  .card{
    height: $home-inner-page-card-height;
    width: 100%;
    margin-right: 5px;
    text-decoration: none;
    position: relative;
    width: 100%;
    overflow: hidden;

    &:last-child{
      margin-right: 0;
    }

    .card-title{
      // background-color: $white;
      height: 40px;
      line-height: 40px;
      font-family: $font-title;
      font-size: calc(0.8rem + 0.7vw);
      text-align: center;
      color: $dark-grey;
      width: 100%;
      position: relative;
      text-align: center;

      &::after{
        content: "";
        position: absolute;
        bottom: 0px;
        left: 50%;
        width: 40px;
        margin-left: -20px;
        border-bottom: $dark-grey solid 2px;
      }
    }
    
    .card-image{
      width: 75%;
      height: 100%;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      transition: width 0.1s ease;
      border-bottom-left-radius: 20%;
      border-bottom-right-radius: 20%;
    }

    &:hover{
      cursor: pointer;

      .card-image{
        width: 78%;
      }

      .card-title{
        color: $green-l;
        transition: all 0.1s ease-in;
        // background-color: $green-l;

        &::after{
          transition: all 0.1s ease-in;
          width: 50px;
          margin-left: -25px;
          border-bottom: $green-l solid 2px;
        }

      }
    }

    //Sketch mode
    &.sketch-mode{
      .card-title{
        display: none;
      }

      .card-image{
        background-size: contain;
        background-repeat: no-repeat;

        &.about-me{background-image: url(../../assets/img/home/workFlowModes/sketch/sketch-about-me.svg);}
        &.work-experience{background-image: url(../../assets/img/home/workFlowModes/sketch/sketch-work-experience.svg);}
        &.skills-set{background-image: url(../../assets/img/home/workFlowModes/sketch/sketch-skills-set.svg);}
        &.cv{background-image: url(../../assets/img/home/workFlowModes/sketch/sketch-cv.svg);}
      }
    }

    //Wireframe mode
    &.wireframe-mode{
      .card-title{
        color: $dark-grey;
        background-color: transparent;
      }

      &:hover{
        .card-title{
          color: $dark-grey;
          background-color: transparent;
        }
      }
      .card-title{
        font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
      }

      .card-image{
        background-size: contain;
        background-repeat: no-repeat;
        background-position: left;
        background-image: url(../../assets/img/home/workFlowModes/wireframe/wireframe-page-card.svg);
      }
    }
  }
</style>
