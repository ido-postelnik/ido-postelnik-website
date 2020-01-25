<template>
  <header class="flex row layout-align-center-space-between">
    <p class="logo">Ido Postelnik</p>
    <div class="flex row layout-align-center-space-between contact">
      <img src="../assets/icons/email.svg" alt="email" height="25"/>
      <p>|</p>
      <img src="../assets/icons/phone.svg" alt="phone" height="23"/>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopHeader',

}
</script>

<style scoped lang="scss">
  header{
    background-color: #fdfdfd;
    height: $header-height;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0 20px;

    .logo{
      font-family: $font-title;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .contact{
      width: 75px;
    }
  }
</style>
