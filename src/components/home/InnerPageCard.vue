<template>
  <router-link class="card flex row" :to="data.value">
    <h3 class="card-title">{{ data.label }}</h3>
    <div class="card-image" :class="classObject"></div>
  </router-link>
</template>

<script>
import {_} from '@/utils/utils';

export default {
  name: 'InnerPageCard',
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
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
    color: $dark-grey;
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
      color: $light-grey;
    }
    
    .card-image{
      position: absolute;
      left: 50px;
      right: 0;
      height: 100%;
      background-position: center;
      background-size: 100%;
    }
  }
</style>
