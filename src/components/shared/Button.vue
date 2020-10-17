<template>
  <button class="btn" :class="{'btn-animated': mode === 'animated'}" @click="onButtonClick">
    <span  class="btn-static" >{{text}}</span>
    <div v-if="mode === 'animated'" class="btn-dynamic" :class="{active: isActive === true}">
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
  font-size: 16px;
  min-width: 150px;
  min-height: 32px;
  cursor: pointer;
  outline: none;
  z-index: 1;
}

.btn-animated {
  padding: 5px 40px;
  position: relative;
  border-radius: 20px;
  border: 0px solid $dark-grey;
  color: $white;
  background-color: #1DE9B6 ;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  
  .btn-dynamic {
    background-color: $green-l;
    background: linear-gradient(90deg, #00D6C2 0%, #1DE9B6 100%);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    color: $white;
    overflow: hidden;

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
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
