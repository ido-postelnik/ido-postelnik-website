<template>
  <button class="btn" @click="onButtonClick">
    <span class="btn-static" >{{text}}</span>
    <div class="btn-dynamic" :class="{active: isActive === true}">
      <span class="btn-dynamic-inner">{{text}}</span>
    </div>
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
    typee: {
      type: String,
      default: null
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
.btn {
  padding: 5px 40px;
  position: relative;
  border-radius: 20px;
  border: 1px solid $dark-grey;
  color: $white;
  background-color: $gold;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  
  
  .btn-dynamic {
    background-color: $white;
    color: $dark-grey-d;
    overflow: hidden;
  }

  .btn-dynamic, .btn-dynamic-inner {    
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 2;
    transition: all ease 0.3s;
  }

  &:hover{
    .btn-dynamic {
      transform: translateX(100%);
    }
    .btn-dynamic-inner {
      transform: translateX(-100%);
    }
  }
}
</style>
