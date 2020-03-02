<template>
  <div class="step">
    <p class="step-index">{{ index }}</p>
    <p class="step-label">{{ title }}</p>
    <div class="flex row layout-align-center-center m-t-5">
      <div class="frame">
        <p>{{ index }}</p>
      </div>
      <img v-if="!isLast" src="../../assets/icons/chevron-right.svg" class="m-l-10" alt="chevron" height="20"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step',
  props: {
    index: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    isLast: {
      type: Boolean,
      default: null
    },
  },
  methods: {
    goTo: function (page) {
      console.log('page: ', page);
      this.$router.push({ path: '/about' })
    }
  }
}
</script>

<style scoped lang="scss">
  .step{
    height: 100%;
    text-align: left;

    &-index{
      font-size: calc(1rem + 0.4vw);
      font-weight: 600;
      font-family: $font-title;
    }

    &-label{
      font-size: calc(1rem + 0.05vw);
      font-weight: 500;
      font-family: $font-title;
    }

    .frame{
      height: 120px;
      min-height: 100px;
      width: 12%;
      min-width: 170px;
      background-color: $white;
      border: 1px solid $dark-grey;
    }
  }
</style>
