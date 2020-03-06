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
    border: 7px solid transparent;
    border-bottom-color: $dark-grey;
    position: relative;
    top: -4px;
    margin: 0 12px;

    &:after {
      content: '';
      position: absolute;
      left: -7px;
      top: 7px;
      width: 0;
      height: 0;
      border: 7px solid transparent;
      border-top-color: $dark-grey;
    }
  }
</style>
