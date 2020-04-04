<template>
  <div class="skill-box p-x-10">
    <h2 class="">{{ title }}</h2>
    <img :src="imagePath" />
  </div>
</template>

<script>
export default {
  name: 'SkillBox',
  props: {
    title: {
      type: String,
      default: null
    },
    imagePath: {
      type: String,
      default: null
    }
  },
  data: function () {
    return {
      
    }
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

  .skill-box {
    background-color: $white;
    text-align: center;
    width: 14%;
    min-width: 80px;
    height: 70px; 
    box-shadow: 3px 3px 8px 2px rgba(196,196,196,1);
    white-space: nowrap;
    padding-top: 5px;

    @include sm {
      width: 14%;
      min-width: 90px;
      height: 80px; 
      margin-bottom: 10px;
    }

    @include md {
      width: 14%;
      min-width: 110px;
      height: 100px; 
      padding-top: 10px;
    }

    @include xl {
      width: 14%;
      min-width: 120px;
      height: 110px;
      padding-top: 15px; 
    }

    h2{
      font-size: calc(0.8rem + 0.2vw);
      font-weight: 300;
      margin-bottom: 5px;

      @include md {
        font-size: calc(0.8rem + 0.3vw);
        margin-bottom: 10px;
      }
    }

    img{
      display: inline-block;
      max-width: 100px;
      max-height: 45%;
      width: auto;
      height: auto;
    }
  }
</style>
