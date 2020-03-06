<template>
  <div class="button">{{ label }}</div>
</template>

<script>
export default {
  name: 'IpButton',
  props: {
    label: String
  }
}
</script>

<style scoped lang="scss">
  .button {
    padding: 6px 40px;
    border: 1px solid $dark-grey;
    border-radius: 20px;
    background-color: $white;
    text-align: center;
  }
</style>
