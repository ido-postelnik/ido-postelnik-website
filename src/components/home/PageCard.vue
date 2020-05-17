<template>
  <router-link :to="data.path" class="card flex column" :class="{
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
      this.$router.push({ name: `${page}` })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

  .card{
    height: 100%;
    width: 100%;
    max-width: 400px;
    margin-right: 5px;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    min-height: 200px;
    margin-bottom: 20px;
    transition: 0.1s all ease;

    @include md {
      margin-bottom: 0px;
    }

    &:last-child{
      margin-right: 0;
    }

    .card-title{
      height: 40px;
      line-height: 40px;
      font-family: $font-title;
      font-size: calc(1.0rem + 0.5vw);
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
      width: 80%;
      height: 100%;
      min-height: 220px;
      background-size: contain;
      background-position: 50% 2px;
      background-repeat: no-repeat;
      transition: width 0.1s ease;

      @include md {
        background-position: 50% 20px;
        min-height: 175px;
      }
    }

    &:hover{
      cursor: pointer;
      margin-top: -10px;

      .card-image{}

      .card-title{
        color: $green-l;
        transition: all 0.1s ease-in;

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
      &:hover{
        margin-top: 0;
      }
      .card-title{
        display: none;
      }

      .card-image{
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 0px;

        &.about-me-home{background-image: url(../../assets/img/home/workFlowModes/sketch/sketch-about-me.svg);}
        &.work-experience-home{background-image: url(../../assets/img/home/workFlowModes/sketch/sketch-work-experience.svg);}
        &.skills-set-home{background-image: url(../../assets/img/home/workFlowModes/sketch/sketch-skills-set.svg);}
        &.cv-home{background-image: url(../../assets/img/home/workFlowModes/sketch/sketch-cv.svg);}
      }
    }

    //Wireframe mode
    &.wireframe-mode{
      &:hover{
        margin-top: 0;
      }

      .card-title{
        color: $dark-grey;
        background-color: transparent;
        font-weight: 300;
      }

      &:hover{
        .card-title{
          color: $dark-grey;
          background-color: transparent;
        }

        .card-image{
        }
      }
      .card-title{
        font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
        
        &::after{
          content: none;
        }
      }

      .card-image{
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url(../../assets/img/home/workFlowModes/wireframe/wireframe-page-card.svg);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
</style>
