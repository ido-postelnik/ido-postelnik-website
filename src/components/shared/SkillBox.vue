<template>
  <div class="skill-box p-x-10 p-y-10">
    <h2 class="m-b-10">{{ title }}</h2>
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
  .skill-box {
    background-color: $white;
    text-align: center;
    width: 18%;
    min-width: 140px;
    height: 110px; 
    box-shadow: 3px 3px 8px 2px rgba(196,196,196,1);
    white-space: nowrap;

    img{
      display: inline-block;
      max-width: 100px;
      max-height: 50px;
      width: auto;
      height: auto;
    }

    h2{
      font-size: calc(0.75rem + 0.35vw);
      line-height: calc(0.75rem + 0.45vw);
    }
  }
</style>
