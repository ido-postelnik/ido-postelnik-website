<template>
  <div class="home" :class="{
    'sketch-mode': activeWorkFlowMode === WORK_FLOW_MODES.SKETCH.value,
    'wireframe-mode': activeWorkFlowMode === WORK_FLOW_MODES.WIREFRAME.value,
    'code-mode': activeWorkFlowMode === WORK_FLOW_MODES.CODE.value}">

    <div :class="{'work-flow-mode-transition': isWorkFlowModeChanged === true}">
      <loader class="work-flow-mode-transition-loader" :scale="1.0" :color="'dark'" v-if="isWorkFlowModeChanged === true"></loader>
    </div>
    
    <!-- JSfiddle iframe -->
    <iframe class="jsfiddle-iframe" src="//jsfiddle.net/idop/h27dzkbu/47/embedded/js,html,css/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

    <div 
      class="top-bg" 
      :style="setTopBgStyle()" 
      v-if="activeWorkFlowMode !== WORK_FLOW_MODES.SKETCH.value"
      :class="{'top-bg-wireframe': activeWorkFlowMode === WORK_FLOW_MODES.WIREFRAME.value === true}"
    />

    <!-- Main container -->
    <div 
      class="main-container flex column layout-align-center-start text-center" 
      :style="activeWorkFlowMode !== WORK_FLOW_MODES.SKETCH.value ? setMainContainerStyle : ''"
    >
      <div class="avatar m-auto" />
      <div class="hero-title m-t-5"><h1>Ido Postelnik</h1></div>
      <div class="hero-subtitle m-x-15"><h2 >UX/UI driven Front-End Engineer</h2></div>
      
      <Button 
        class="work-flow-button m-t-5" 
        :text="shouldShowWorkFlowModesBox === true && activeWorkFlowMode !== WORK_FLOW_MODES.PRODUCTION.value ? workFlowButton.ON : workFlowButton.OFF" 
        :onButtonClick="toggleWorkFlowModesBox" 
        :isActive="shouldShowWorkFlowModesBox === true"
        :mode="(activeWorkFlowMode === WORK_FLOW_MODES.SKETCH.value || activeWorkFlowMode === WORK_FLOW_MODES.WIREFRAME.value) ? 'basic' : 'animated'"
      />

      <!-- Work flow box -->
      <div class="work-flow-box-container flex column layout-align-center-center m-t-15" :class="{active: shouldShowWorkFlowModesBox === true, 'on-scroll': shouldShowWorkFlowModesAtBottom === true}">
        <div class="work-flow-box-header flex row layout-align-center-center">
          <p>Walk through the steps to see my working progress</p>
          <img src="@/assets/icons/close.svg" alt="close" class="close clickable" @click="toggleWorkFlowModesBox"/>
        </div>
        <div class="work-flow-box-content flex layout-align-center-center">
          <work-flow-mode
            v-for="(mode, key, index) in WORK_FLOW_MODES"
            :key="mode.label"
            :index="index + 1"
            :label="mode.label"
            :shortLabel="mode.shortLabel"
            :value="mode.value"
            :isLast="index === workFlowModesSize - 1"
            @click.native="switchWorkFlowMode(key)"
            :class="{'m-r-10': index !== (workFlowModesSize - 1)}">
          </work-flow-mode>
        </div>
      </div>
    </div>

    <!-- Pages cards -->
    <div class="pages-cards flex row layout-align-center-space-evenly">
      <page-card v-for="page in PAGES" :key="page.value" :data="page"></page-card>
    </div>

    <!-- Highlight-area -->
    <div class="highlight-area text-center flex row layout-align-center-center" :style="setHighLightAreaStyle()" >
      <div class="highlight-image-container flex layout-align-center-end">
        <div class="highlight-image"></div>
      </div>
      <p class="highlight-sentence-container flex column layout-align-start-center p-l-50">
        <span class="m-b-5">I believe in End-to-end development.</span> 
        <span class="m-b-5">From idea to production.</span>
        <span>Simple. As. That.</span>    
      </p>
    </div>

    <!-- Contact-footer -->
    <contact-footer id="contact"></contact-footer>

    <!-- Copy right -->
    <copy-right />
  </div>
</template>

<script>
import { PAGES, WORK_FLOW_MODES, DEFAULT_ACTIVE_WORK_FLOW_MODE } from "@/utils/constants";
import {_, NProgress} from "@/utils/utils";

const WORK_FLOW_BUTTON = {
  OFF: "Check it out!",
  ON: "Got it, Cool!"
};

// @ is an alias to /src
import PageCard from "@/components/home/PageCard.vue";
import WorkFlowMode from "@/components/home/WorkFlowMode.vue";
import ContactFooter from "@/components/home/ContactFooter.vue";
import CopyRight from "@/components/CopyRight.vue";
import Loader from '@/components/shared/Loader.vue';
import Button from '@/components/shared/Button.vue';

// Store
import { mapState, mapMutations  } from 'vuex';

export default {
  name: "home",
  data: () => {
    return {
      // Work flow
      workFlowButton: WORK_FLOW_BUTTON,
      WORK_FLOW_MODES,
      workFlowModesSize: _.size(WORK_FLOW_MODES),
      shouldShowWorkFlowModesBox: false,
      shouldShowWorkFlowModesAtBottom: false,
      userHasScrolled: false,
      isWorkFlowModeChanged: false,
      //
      PAGES
    };
  },
  components: {
    WorkFlowMode,
    PageCard,
    ContactFooter,
    CopyRight,
    Loader,
    Button,
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);

    // Show NProgress while images are loading
    NProgress.start();

    let imgs = document.getElementsByTagName("img");
    let len = imgs.length;
    let counter = 0;

    [].forEach.call(imgs, function(img) {
      if(img.complete) {
        incrementCounter();
      }
      else {
        img.addEventListener('load', incrementCounter, false);
      }
    });

    function incrementCounter() {
      counter++;

      if(counter === len) {
        NProgress.done();
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    this.updateWorkFlowMode(DEFAULT_ACTIVE_WORK_FLOW_MODE);
  },
  created() {
  },
  methods: {
    ...mapMutations([
      'updateWorkFlowMode'
    ]),
    //#region WorkFlow modes
    toggleWorkFlowModesBox() {
      // Hide WorkFlowModesBox
      if (this.shouldShowWorkFlowModesBox === true) {
        this.shouldShowWorkFlowModesBox = false;

        if(this.activeWorkFlowMode !== DEFAULT_ACTIVE_WORK_FLOW_MODE) {
          this.showLoaderBetweenModeChange(DEFAULT_ACTIVE_WORK_FLOW_MODE);
        }

        // gtag event
        this.$gtag.event('toggleWorkFlowModesBox', {
          'event_category': 'engagement',
          'event_label': 'hide'
        })
      } else {
      // Show WorkFlowModesBox
        this.shouldShowWorkFlowModesBox = true;
        this.shouldShowWorkFlowModesAtBottom = false;

        // gtag event
        this.$gtag.event('toggleWorkFlowModesBox', {
          'event_category': 'engagement',
          'event_label': 'show'
        })
      }
    },
    switchWorkFlowMode(modeKey) {
      if (modeKey !== this.activeWorkFlowMode) {
        this.shouldShowWorkFlowModesAtBottom = true;
        this.showLoaderBetweenModeChange(modeKey);

        // gtag event
        this.$gtag.event('switchWorkFlowMode', {
          'event_category': 'engagement',
          'event_label': modeKey
        })
      }
    },
    showLoaderBetweenModeChange(modeKey) {
      this.isWorkFlowModeChanged = true;

      setTimeout(() => {
        this.isWorkFlowModeChanged = false;
        
      }, 800); 
      setTimeout(() => {
        this.updateWorkFlowMode(modeKey);
      }, 300); 
    },
    //#endregion
    onScroll() {
      let scrollPosition = window.scrollY;

      if(scrollPosition < 100) {
        this.userHasScrolled = false;
      }

      if (this.userHasScrolled === false && this.shouldShowWorkFlowModesBox === true) {
        this.userHasScrolled = true;
        this.shouldShowWorkFlowModesAtBottom = true;
      }
    },
    setTopBgStyle() {
      let style = '';
      const width_px = 1920;
      const windowHeight = window.innerHeight;
      const height_px = Math.round(windowHeight * 0.45); 
      const amplitude = 40;
      const offset = height_px - amplitude;
      const frequency = 1.3;
      const units = frequency * width_px / 100;

      let clipPathString = 'clipPath: polygon(100% 0%, 0% 0% ';
      let val = 0;
      for (let i=0; i <= 100; i++){
        val = offset + amplitude * Math.cos(i/units);
        val = (val / height_px * 100).toFixed(2);

        clipPathString = `${clipPathString}, ${i}% ${val}%`;
      }
      clipPathString = `${clipPathString})`;
      style = `height: ${height_px}px; ${clipPathString}`;

      return style;
    },
    setHighLightAreaStyle() {
      let style = '';
      const width_px = 1920;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const height_px = Math.round(windowHeight * 0.6); 
      const amplitude = windowWidth > 500 ? 40 : 20;
      const offset = height_px - amplitude;
      const frequency = windowWidth > 500 ? -1.3 : -1;
      const units = frequency * width_px / 100;

      let clipPathString = 'clipPath: polygon(100% 0%';
      let val = 0;
      for (let i=0; i <= 100; i++){
        val = offset + amplitude * Math.sin(i/units);
        val = (val / height_px * 100).toFixed(2);
        clipPathString = `${clipPathString}, ${100 - i}% ${100 - val}%`;
      }
      clipPathString = `${clipPathString}, 0% 100%, 100% 100%)`;
      style = `height: ${height_px + 50}px; paddingTop: 50px; ${clipPathString}`;

      return style;
    }
  },
  computed: {
    ...mapState([
      'activeWorkFlowMode'
    ]),
    setMainContainerStyle() {
      let style = '';
      const windowHeight = window.innerHeight;
      const marginTop_px = Math.round(windowHeight * 0.28); 
      
      style = `marginTop: ${marginTop_px}px`;

      return style;
    }
  }
};

</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

// Vars
$avatar-size: calc(185px + 1.8vw);
$avatar-size-md: calc(140px + 1.8vw);
$avatar-size-lg: calc(170px + 1.8vw);
$hero-title: calc(1.5rem + 2.8vw);
$hero-title-md: calc(1.5rem + 1.6vw);
$hero-subtitle: calc(1.0rem + 1.0vw);
$hero-subtitle-md: calc(1.2rem + 0.3vw);
$work-flow-button-height: 34px;
$main-container-height-sm: calc(#{$avatar-size} + #{$hero-title} + #{$work-flow-button-height} + 105px + #{$header-height} + #{$header-height-addon});
$main-container-height-lg: calc(#{$avatar-size} + #{$hero-title} + #{$work-flow-button-height} + 50px + #{$header-height} + #{$header-height-addon});

.home {
  background: $white;

  .jsfiddle-iframe{
    position: fixed;
    left: -25%;
    top: 0;
    bottom: 0;
    width: 25%;
    height: 100%;
    z-index: 20;
    transition: left 0.1s;
  }

  .work-flow-mode-transition{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $white;
    z-index: 30;
    pointer-events: none;
    opacity: 0;
    animation: fade-in-and-out 600ms;

    @keyframes fade-in-and-out {
      0%   {opacity: 0;}
      30%  {opacity: 1;}
      70%  {opacity: 1;}
      100% {opacity: 0;}
    }

    .work-flow-mode-transition-loader{
      position: fixed;
      top: calc(50% - 6px);
      left: calc(50% - 40px);
    }
  }

  .top-bg {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, #00D6C2 0%, #1DE9B6 100%);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;

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

    &.top-bg-wireframe{
      background: $light-grey-l;
    }
  }

  .main-container {
    height: $main-container-height-sm;
    max-height: 500px;
    transition: 0.2s all;
    z-index: 2;
    position: relative;

    @include lg {
      max-height: none;
      height: $main-container-height-lg;
    }

    .avatar {
      height: $avatar-size;
      width: $avatar-size;
      border-radius: 50%;
      background-color: white;
      background-image: url(../assets/img/home/ido-postelnik-profile-image-zoom.jpg);
      background-size: cover;
      border: $dark-grey 1px solid;

      @include md {
        height: $avatar-size-md;
        width: $avatar-size-md;
      }

      @include lg {
        height: $avatar-size-lg;
        width:  $avatar-size-lg;
      }
    }

    .hero-title{
      font-size: $hero-title;
      font-weight: 100;
      font-family: $font-title;
      display: block;
      border-bottom: 1px solid $dark-grey-l;
      padding: 0px 10px;
      border-top-right-radius: 2px;
      color: $dark-grey-d;

      @include md {
        font-size: $hero-title-md;
        line-height: $hero-title-md;
        background-color: transparent;
        padding: 0;
        border-top-right-radius: 0;
      }
    }

    .hero-subtitle{
      font-size: $hero-subtitle;
      font-weight: 300;
      letter-spacing: 5.2px;
      display: block;
      padding: 5px 8px;

      @include md {
        background-color: transparent;
        font-size: $hero-subtitle-md;
      }
    }

    .work-flow-button {
      transition: all 0.2s;
      height: $work-flow-button-height;

      @include lg {
        display: inline-block;
      }

      &.active {
        background-color: $gold;
      }
    }
  }

  .work-flow-box-container {
    display: none;
    border: 1px solid #313638;
    border-radius: 10px;
    width: 90%;
    z-index: 40;
    background: $white;
    transition: left 0.25s ease; // in use when in "code-mode"
    margin-top: -35px;

    @include md {
      width: 610px;
      border-radius: 20px;
    }

    .work-flow-box-header {
      position: relative;
      padding: 8px 50px 8px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;

      @include md {
        padding: 8px 20px 4px;
      }
      
      p{
        font-size: 0.9rem;
        line-height: 1.1;

        @include md {
          font-size: 1rem;
        }
      }

      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 10px;
        filter: $filter-dark-grey;

        @include lg {
          height: 11px;
          right: 12px;
        }
      }
    }

    .work-flow-box-content {
      padding: 0px 15px 3px;
      flex-wrap: wrap;
    }

    &.active {
      display: block;
      position: relative;
      animation: work-flow-box-fade-in 0.2s;

      @keyframes work-flow-box-fade-in {
        from {
          opacity: 0;
          margin-top: -15px;
        }
        to {
          opacity: 1;
          margin-top: -35px;
        }
      }
    }

    &.on-scroll {
      position: fixed;
      top: calc(100vh - 110px);
      animation: move 0.6s ease-out;
      margin-top: 0px;

      @keyframes move {
        from {
          top: calc(100vh - 280px);
        }
        to {
          top: calc(100vh - 110px);
        }
      }

      @include lg {
        @keyframes move {
          from {
            top: calc(100vh - 380px);
          }
          to {
            top: calc(100vh - 135px);
          }
        }
      }

      @include lg {
        top: calc(100vh - 135px);
        left: calc(50% - 305px);
      }
    }
  }

  .pages-cards{
    flex-wrap: wrap;
    padding: 10px 10px;
    margin-top: -20px;

    @include md {
      flex-wrap: nowrap;
      padding: 20px 15px;
      height: 250px;
      margin-top: 0px;
    }

    @include lg {
      flex-wrap: nowrap;
      padding: 30px 20px;
      height: 300px;
    }

    @include xl {
      padding: 30px 80px 100px;
      height: 380px;
    }
  }

  .highlight-area {
    height: 540px;
    background-color: #fbfbfb;
    flex-direction: column-reverse;

    @include md {
      flex-direction: row;
      height: 450px;
    }

    @include lg {
      height: 500px;
    }

    .highlight-image-container{
      flex: 3;
      height: 100%;
      max-height: 300px;
      width: 100%;
      padding-right: 0;

      @include md {
        margin-left: auto;
        flex: 1;
        padding-right: 50px;
      }

      .highlight-image{
        background-image: url(../assets/img/home/insparation-image.png);
        height: 60%;
        max-height: 280px;
        width: inherit;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;

        @include md {
          background-position: right;
          height: 80%;
        }

        @include md {
          background-position: right;
          height: 85%;
        }
      }
    }

    .highlight-sentence-container{
      flex: 1;
      font-size: calc(1.0rem + 1.8vw);
      font-weight: 300;
      letter-spacing: 2px;
      margin-top: 15px;
      padding-left: 0;
      align-items: center;

      @include md {
        font-size: calc(1.0rem + 0.5vw);
        margin-top: 0;
        align-items: start;
        padding-left: 30px;
      }

      @include lg {
        padding-left: 50px;
      }
    }
  }

  // Sketch mode
  &.sketch-mode{
    background: none;
    background-image: url(../assets/img/home/workFlowModes/sketch/sketch-bg.svg);
    padding-top: 25vh;
    background-size: 300%;
    background-position: center;

    @include lg {
      background-size: auto;
      background-position: center;
    }

    .main-container{
      background: none;
      opacity: 1 !important;

      .avatar{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-avatar.svg);
        background-size: contain;
        background-repeat: no-repeat;
        border: 0px;
        background-color: transparent;
      }

      .hero-title{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-title.svg);
        height: 80px;
        width: 70vw;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin: 0;
        border: none;

        @include lg {
          height: 80px;
          width: 30vw;
        }

        h1{
          display: none;
        }
      }
      
      .hero-subtitle{
        display: none;
      }

      .work-flow-button{
        background-color: transparent !important;
        color: transparent !important;
        border: none;
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-button.svg);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        height: 60px;
        width: 150px;
        transition: none;
        outline: none;
        cursor: pointer;

        &:active{
          box-shadow: none !important;
        }
      }
    }

    .pages-cards{
      background: transparent;
    }

    .highlight-area {
      background: transparent;
      padding-top: 0 !important;
      height: 500px !important;

      .highlight-image-container{
        .highlight-image{
          background-image: url(../assets/img/home/workFlowModes/sketch/sketch-highlight-image.svg);
        }
      }

      .highlight-sentence-container{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-highlight-sentence.svg);
        height: 100px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: left;
        width: 90%;

        @include lg {
          width: auto;
        }

        span{
          display: none;
        }
      }
    }
  }

  // Wireframe mode
  &.wireframe-mode{

    .main-container{
      opacity: 1 !important;

      .avatar{
        background-image: url(../assets/img/home/workFlowModes/wireframe/wireframe-avatar.svg);
        border: 0px;
        background-size: contain;
        background-repeat: no-repeat;
      }

      .hero-title{
        min-height: 20px;
      
        h1{
          font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
          font-weight: 500;
          border: 0px;
          padding-right: 0px;
          margin-right: 10px;
        }
      }
      
      .hero-subtitle{
        h2{
          letter-spacing: 1px;
        }
      }

      .work-flow-button{
        background: $white !important;
        border: 1px solid $dark-grey-l;
        color: $dark-grey !important;
        border-radius: 5px;
        z-index: 6;

        &:active{
          box-shadow: none !important;
        }
      }
    }

    .pages-cards{
      background: transparent;
    }

    .highlight-area {
      .highlight-image-container{
        .highlight-image{
          background-image: url(../assets/img/home/workFlowModes/wireframe/wireframe-highlight-image.svg);
        }
      }

      .highlight-sentence-container{
        letter-spacing: normal;
        font-weight: 300;
      }
    }

  }

  // Code mode
  &.code-mode{
    margin-left: 0%;
    transition: all 0.2s ease;
    position: absolute;
    top: 220px;
    
    @include lg {
      margin-left: 25%;
      position: static;
      top: 0px;
    }

    .jsfiddle-iframe{
      left: 0;
      width: 100%;
      height: 400px;

      @include lg {
        left: 0;
        width: 25%;
        height: 100%;
      }
    }

    .work-flow-box-container {
      &.on-scroll {
        // left: 0;
        transition: left 0.25s ease;

        @include lg {
          left: calc(62.5% - 305px);
        }
      }
    }
  }
}
</style>
