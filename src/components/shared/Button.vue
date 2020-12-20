<template>
  <button class="btn" @click="onButtonClick">
    <span>{{text}}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: null
    },
    onButtonClick: {
      type: Function,
      default: () => {},
      required: false,
    },
    isActive: {
      type: Boolean,
      default: null
    },
    mode: {
      type: String,
      default: 'animated'
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
// Button styles and animation stuff
.btn{
  font-size: 15px;
  min-width: 150px;
  min-height: 32px;
  cursor: pointer;
  outline: none;
  z-index: 1;
  background-color: #387de5;
  color: $white;
  border: 0px solid $dark-grey;
  border-radius: 20px;
  transition: 0.2s ease;

  &:hover{
    background-color: darken(#387de5, 8%);
  }
}

</style>
