<template>
  <div class="text-box m-auto p-x-30 p-y-10" :class="{'collapsed': isExpanded === false}">
    <div class="flex row layout-align-center-space-between">
      <!-- Title -->
      <div class="flex row layout-align-start-center">
        <h2>{{ title }}</h2>
        <h3 v-if="workPlace != null" class="m-l-10"><a :href="workPlace.website" target="_blank"><span class="at">@</span>{{ workPlace.name }}</a></h3>
      </div>

      <!-- Expanded -->
      <div class="flex row layout-align-center-center">
        <h3 class="m-r-15">{{ timeFrame }}</h3>
        <img src="../../assets/icons/chevron-right.svg" class="chevron clickable" :class="{'chevron-down':isExpanded === false}" alt="chevron" height="12" @click="toggleBox()"/>
      </div>
    </div>

    <transition name="fade">
      <div v-if="isExpanded === true" class="m-t-10">
        <p v-for="row in content" :key="row" class="m-b-10">{{ row }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TextBox',
  props: {
    title: {
      type: String,
      default: null
    },
    workPlace: {
      type: Object,
      default: null
    },
    timeFrame: {
      type: String,
      default: null
    },
    content: {
      type: Array,
      default: null
    }
  },
  data: function () {
    return {
      isExpanded: true
    }
  },
  methods:{
    toggleBox() {
      this.isExpanded = !this.isExpanded;
    }
  }
}
</script>

<style scoped lang="scss">
  .text-box {
    background-color: $white;
    text-align: left;
    width: 80%;
    max-height:600px; 
    box-shadow: 3px 3px 8px 2px rgba(196,196,196,1);
    transition: max-height 0.3s ease;
    height:auto;
    white-space: nowrap;
  
    &.collapsed{
      max-height: 42px;
    }

    h2{
      font-size: calc(0.75rem + 0.45vw);
      line-height: calc(0.75rem + 0.45vw);
    }

    h3{
      font-size: calc(0.75rem + 0.2vw);
      line-height: calc(0.75rem + 0.45vw);
      height: calc(0.75rem + 0.45vw);
    }

    p{

    }

    .at{
      vertical-align: text-top;
    }
    
    .chevron{
      filter: $filter-dark-grey;
      transition: .3s;

      &.chevron-down{
        transform: rotate(90deg);
        
      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s ease;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }

  }
</style>
