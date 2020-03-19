<template>
  <router-link class="card flex row" :to="data.value">
    <div class="card-title-container">
      <h3 class="card-title">{{ data.label }}</h3>
    </div>
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

    &:hover{
      cursor: pointer;

      .card-image{
        background-size: 135%;
        
      }

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

    &-title-container{
      width: 50px;
      height: $home-inner-page-card-height;

      .card-title{
        // transform: rotate(270deg);
        background-color: $white;
        // width: $home-inner-page-card-height;
        padding: 10px 0;
        font-family: $font-title;
        font-size: 1.4rem;
        text-align: center;
      }
    }

    &-image{
      height: 100%;
      width: 100%;
      background-position: center;
      background-size: cover;
      transition: background-size 0.2s ease-in;
    }
  }
</style>
