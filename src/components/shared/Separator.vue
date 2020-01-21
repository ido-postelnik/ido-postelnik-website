<template>
  <div class="separator"></div>
</template>

<script>
export default {
  name: 'Separator',
}
</script>

<style scoped lang="scss">
  .separator {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: $dark-grey;
    position: relative;
    top: -7px;
    margin: 0 10px;

    &:after {
      content: '';
      position: absolute;
      left: -10px;
      top: 10px;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-top-color: $dark-grey;
    }
  }
</style>
