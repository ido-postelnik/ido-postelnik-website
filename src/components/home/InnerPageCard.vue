<template>
  <router-link class="card" :class="classObject" :to="data.value">
    <p class="card-title">{{ data.label }}</p>
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
    min-height: 250px;
    width: 100%;
    margin-right: 5px;
    background-position: center;
    background-size: 130%;
    color: $dark-grey;
    text-decoration: none;
   
    &:hover{
      cursor: pointer;
      background-size: 135%;
      transition: background-size 0.2s ease-in;

      .card-title{

        &::after{
          width: 60px;
          margin-left: -30px;
          transition: 0.1s ease-in;
        }
      }
    }
    
    &:last-child{
      margin-right: 0;
    }

    &-title{
      background-color: $white;
      width: 100%;
      padding: 10px 0;
      font-family: $font-title;
      font-size: 1.4rem;
      position: relative;
      text-align: center;
      

      &::after{
        content: "";
        position: absolute;
        bottom: 5px;
        left: 50%;
        width: 40px;
        margin-left: -20px;
        border-bottom: $dark-grey solid 2px;
      }
    }

  }
</style>
