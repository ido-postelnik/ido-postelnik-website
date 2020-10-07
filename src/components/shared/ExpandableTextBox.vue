<template>
  <div class="text-box m-auto p-y-10" :class="{'collapsed': isExpandedInner === false, 'work-experience-on': workPlace != null}">
    <div class="flex row layout-align-center-space-between clickable" @click="toggleBox()">
      <!-- Title -->
      <div class="title-section">
        <h2>{{ title }}</h2>
      </div>

      <!-- Expanded icon -->
      <div class="expandable-section">
        <img 
          src="../../assets/icons/chevron-right.svg" 
          class="chevron"
          :class="{'chevron-down':isExpandedInner === false}" 
          alt="chevron" 
          height="12" 
        />
      </div>
    </div>

    <h3 class="work-place-info" v-if="workPlace != null">
      <span class="at m-r-10">
        @
        <a :href="workPlace.href" target="_blank">{{ workPlace.name }}</a>
      </span> 
  
      <span class="time-frame">/ {{ workPlace.timeFrame }}</span>
    </h3>

    <!-- Content -->
    <transition name="fade">
      <div v-if="isExpandedInner === true">
        <h4 class="m-t-5">{{subtitle}}</h4>
        <div class="m-t-10 m-l-5">
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
      isExpandedInner: this.isExpanded
    }
  },
  methods:{
    toggleBox() {
      this.isExpandedInner = !this.isExpandedInner;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

  .text-box {
    text-align: left;
    width: 90%;
    max-height:1500px; 
    transition: max-height 0.3s ease;
    height:auto;
    white-space: nowrap;
    padding-left: 15px;
    padding-right: 15px;

    @include md {
      width: 80%;
      padding-left: 25px;
      padding-right: 25px;
    }

    @include lg {
      padding-left: 30px;
      padding-right: 30px;
    }
  
    &.collapsed{
      max-height: 52px;

      @include md {
        max-height: 42px;

        &.work-experience-on{
          max-height: 85px;
        }
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
        font-size: calc(1.0rem + 0.3vw);
        font-weight: 500;
        color: $dark-grey-d;
        white-space: normal;
      }
    }

    .work-place-info{        
        .at, a{
          color: $blue-l;
        } 
      }

    .expandable-section{
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: flex-end;
      width: 25px;

      @include md {
        flex-direction: row;
        align-items: center;
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
      color: $dark-grey;
      white-space: initial;
      font-weight: 500;
    }

    p{
      font-size: calc(1.0rem + 0.05vw);
      white-space: initial;
      line-height: 26px;
      color: $dark-grey-l;
      position: relative;
      border-bottom: 1px solid $light-grey;
      padding-bottom: 6px;
      margin-right: 15px;

      &:last-child{
        border-bottom: 0px;
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
