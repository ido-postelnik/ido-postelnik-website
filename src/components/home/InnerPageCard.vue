<template>
  <div class="card">
    <p class="card-title">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'InnerPageCard',
  props: {
    label: String
  }
}
</script>

<style scoped lang="scss">
  .card{
    height: $home-page-btn-height;
    width: 100%;
    margin-right: 5px;
    background-position: center;
    background-size: cover;

    &:last-child{
      margin-right: 0;
    }

    &-title{
      background-color: $white;
      width: 100%;
      padding: 5px 0;
      font-family: $font-title;
      font-size: 1.4rem;
      position:relative;

      &::after{
        content: "";
        position: absolute;
        bottom: 3px;
        left: 50%;
        width: 40px;
        margin-left: -20px;
        border-bottom: $dark-grey solid 2px;
      }
    }
  }
</style>
