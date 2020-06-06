<template>
  <div class="loader" :class="{'dark': color === 'dark'}" :style="{'transform': 'scale(' + scale + ')'}">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    scale: {
      type: Number,
      default: null
    },
    color: {
      type: String,
      default: null
    },
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
.loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 12px;
  z-index: 40;

  div{
    position: absolute;
    top: 0px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $white;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  &.dark{
    div{
      background: $dark-grey-l;
    }
  }
}

.loader div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.loader div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.loader div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.loader div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}



</style>
