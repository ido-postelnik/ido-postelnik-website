<template>
  <div class="sidebar">
    Sidebar
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data: function () {
    return {
    }
  },
}
</script>

<style scoped lang="scss">
  .sidebar{
    position: fixed;
    left: 0;
    top: $header-height;
    bottom: 0;
    width: 150px;
    background-color: $green;
  }
</style>
