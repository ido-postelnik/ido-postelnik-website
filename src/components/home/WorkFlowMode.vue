<template>
  <div class="step-container flex row layout-align-center-start clickable" :class="{'active': activeWorkFlowMode === value}" >
    <div class="step flex column">
      <p class="step-index">{{ index }}</p>
      <p class="step-label is-lg-screen">{{ label }}</p>
      <p class="step-label is-md-screen">{{ shortLabel }}</p>
    </div>
    <img v-if="!isLast" src="../../assets/icons/chevron-right.svg" class="m-l-10 step-arrow" alt="chevron" />
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
    shortLabel: {
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
  @import "@/styles/_mixins.scss";

  .is-lg-screen{
    display: none;

    @include md {
      display: block;
    }
  }

  .is-md-screen{
    display: block;

    @include md {
      display: none;
    }
  }

  .step-container{
    height: 100%;
    text-align: center;
    padding-bottom: 10px;
    color: $light-grey-d;

    @include lg {
      min-width: 130px;
    }

    .step{
      @include lg {
        min-width: 105px;
      }

      .step-index{
        font-size: calc(0.9rem);
        font-weight: 600;

        @include lg {
          font-size: calc(1rem + 0.4vw);
        }
      }

      .step-label{
        font-size: calc(0.9rem);
        font-weight: 500;
        font-family: sans-serif;

        @include md {
          font-size: calc(1rem + 0.05vw);
          font-family: $font-title;
        }
      }
    }

    .step-arrow{
      height: 12px;

      @include lg {
        height: 14px;
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
        @include lg {
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
  }
</style>
