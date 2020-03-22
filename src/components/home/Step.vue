<template>
  <div class="step-container flex row layout-align-center-start clickable" :class="{'active': isActive === true}" >
    <div class="step flex column">
      <p class="step-index">{{ index }}</p>
      <p class="step-label">{{ title }}</p>
    </div>
    <img v-if="!isLast" src="../../assets/icons/chevron-right.svg" class="m-l-10" alt="chevron" height="20"/>
  </div>
</template>

<script>
export default {
  name: 'Step',
  props: {
    index: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    isActive: {
      type: Boolean,
      default: null
    },
    isLast: {
      type: Boolean,
      default: null
    },
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .step-container{
    height: 100%;
    text-align: center;
    min-width: 130px;
    padding-bottom: 10px;

    .step{
       min-width: 105px;

      .step-index{
        font-size: calc(1rem + 0.4vw);
        font-weight: 600;
        font-family: $font-title;
      }

      .step-label{
        font-size: calc(1rem + 0.05vw);
        font-weight: 500;
        font-family: $font-title;
      }
    }

    &:hover{
      color: $black;
    }

    &.active{
      color: $green;
      position: relative;
      width: 100%;
      transition: color 0.1s ease;

      &::after{
        content: "";
        position: absolute;
        bottom: 5px;
        left: 50%;
        width: 40px;
        margin-left: -33px;
        border-bottom: $green solid 2px;
      }
    }
  }
</style>
