<template>
  <div class="step-container flex row layout-align-center-start clickable" :class="{'active': activeWorkFlowMode === value}" >
    <div class="step flex column">
      <p class="step-index">{{ index }}</p>
      <p class="step-label">{{ label }}</p>
    </div>
    <img v-if="!isLast" src="../../assets/icons/chevron-right.svg" class="m-l-10" alt="chevron" height="14"/>
  </div>
</template>

<script>
// Store
import { mapState } from 'vuex';

export default {
  name: 'WorkFlowMode',
  props: {
    index: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    isLast: {
      type: Boolean,
      default: null
    },
  },
  methods: {
  },
  computed: {
    ...mapState([
      'activeWorkFlowMode'
    ])
  }
}
</script>

<style scoped lang="scss">
  .step-container{
    height: 100%;
    text-align: center;
    min-width: 130px;
    padding-bottom: 10px;
    color: $light-grey-d;

    .step{
       min-width: 105px;

      .step-index{
        font-size: calc(1rem + 0.4vw);
        font-weight: 600;
      }

      .step-label{
        font-size: calc(1rem + 0.05vw);
        font-weight: 500;
        font-family: $font-title;
      }
    }

    &:hover{
      color: $dark-grey-l;
      transition: color 0.1s ease;
    }

    &.active{
      color: $dark-grey-d;
      position: relative;
      transition: color 0.1s ease;

      &::after{
        content: "";
        position: absolute;
        bottom: 5px;
        left: 50%;
        width: 40px;
        margin-left: -33px;
        border-bottom: $dark-grey-d solid 2px;
      }
    }
  }
</style>
