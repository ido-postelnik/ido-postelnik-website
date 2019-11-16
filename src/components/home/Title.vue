<template>
  <div class="title">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    label: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../styles/_variables.scss";

  .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    background-color: $dark-grey;
    color: $white;
  }
</style>
