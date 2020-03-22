<template>
  <div class="button clickable" @click="onClick">{{ label }}</div>
</template>

<script>
export default {
  name: 'IpButton',
  props: {
    label: {
      type: String,
      default: null
    },
    onClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
  .button {
    max-width: 150px;
    padding: 5px 40px;
    border: 1px solid $dark-grey;
    border-radius: 20px;
    background-color: $white;
    text-align: center;

    &:hover{
      background-color: $green;
      color: $white;
      transition: all 0.1s;
    }

    &:active{
      box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.25);
    }
  }
</style>
