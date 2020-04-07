<template>
  <div class="text-box m-auto p-x-30 p-y-10" :class="{'collapsed': isExpanded === false}">
    <div class="flex row layout-align-center-space-between">
      <!-- Title -->
      <div class="title-section">
        <h2>{{ title }}</h2>
        <h3 v-if="workPlace != null" class=""><span class="at">@</span><a :href="workPlace.website" target="_blank">{{ workPlace.name }}</a></h3>
      </div>

      <!-- Expanded icon -->
      <div class="expandable-section">
        <h3 class="">{{ timeFrame }}</h3>
        <img src="../../assets/icons/chevron-right.svg" class="chevron clickable" :class="{'chevron-down':isExpanded === false}" alt="chevron" height="12" @click="toggleBox()"/>
      </div>
    </div>

    <!-- Content -->
    <transition name="fade">
      <div v-if="isExpanded === true">
        <h4 class="m-t-5">{{subtitle}}</h4>
        <div class="m-t-10 m-l-20">
          <p v-for="row in content" :key="row" class="m-b-10">{{ row }}</p>
        </div>
        
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ExpandableTextBox',
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
    subtitle: {
      type: String,
      default: null
    },
    content: {
      type: Array,
      default: null
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      // isExpanded: true
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
@import "@/styles/_mixins.scss";

  .text-box {
    background-color: $white;
    text-align: left;
    width: 80%;
    max-height:1500px; 
    box-shadow: 3px 3px 8px 2px rgba(196, 196, 196, 0.5);
    transition: max-height 0.3s ease;
    height:auto;
    white-space: nowrap;
  
    &.collapsed{
      max-height: 52px;

      @include md {
        max-height: 42px;
      }
    }

    .title-section{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      @include md {
        flex-direction: row;
        align-items: center;
      }

      h2{
        font-size: calc(1.0rem + 0.1vw);
        font-weight: 500;
        color: #3c3c3c;
      }

      h3{
        font-size: calc(1.0rem + 0.0vw);
        line-height: calc(1.0rem + 0.0vw);
        height: calc(1.0rem + 0.2vw);
        margin-top: 2px;
        margin-left: 0px;

        @include md {
          margin-left: 5px;
        }
        
        a{
          color: #0d72bb;
        }
      }

      .at{}
    }

    .expandable-section{
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: flex-end;

      @include md {
        flex-direction: row;
        align-items: center;
      }

      h3{
        margin-right: 0px;

        @include md {
          margin-right: 10px;
        }
      }

      .chevron{
        filter: $filter-dark-grey;
        transition: .3s;

        &.chevron-down{
          transform: rotate(90deg);
          
        }
      }
    }

    h4{
      color: #60696b;
      white-space: initial;
      font-weight: 500;
    }

    p{
      font-size: calc(1.0rem + 0.05vw);
      white-space: initial;
      line-height: 26px;
      color: #60696b;
      position: relative;

      &::before{
        content: '✔';
        position: absolute;
        left: -20px;
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
