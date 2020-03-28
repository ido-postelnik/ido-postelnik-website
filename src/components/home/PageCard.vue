<template>
  <router-link :to="data.value" class="card flex row" :class="{
      'sketch-mode': activeWorkFlowMode === workFlowModes.SKETCH.value,
      'wireframe-mode': activeWorkFlowMode === workFlowModes.WIREFRAME.value,
      'code-mode': activeWorkFlowMode === workFlowModes.CODE.value}">
    <h3 class="card-title">{{ data.label }}</h3>
    <div class="card-image" :class="classObject"></div>
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

    &:hover{
      cursor: pointer;

      .card-image{
        background-size: 104%;
        transition: background-size 0.1s ease-in;
        
      }

      .card-title{
        color: $white;
        transition: all 0.1s ease-in;
        background-color: $green;
      }
    }
    
    &:last-child{
      margin-right: 0;
    }

    .card-title{
      position: absolute;
      bottom: -50px;
      left: 0;
      transform-origin: 0 0;
      transform: rotate(-90deg);
      background-color: $white;
      width: $home-inner-page-card-height;
      height: 50px;
      line-height: 50px;
      font-family: $font-title;
      font-size: calc(0.8rem + 1.0vw);
      text-align: center;
      color: $light-grey-d;
    }
    
    .card-image{
      position: absolute;
      left: 50px;
      right: 0;
      height: 100%;
      background-position: center;
      background-size: 100%;
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
