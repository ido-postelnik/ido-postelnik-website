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

    <!-- Main container -->
    <div class="main-container flex layout-align-center-center">
      <div class="bg-item back-mountains" :style="{transform: `translateY(${heroContainerMargin * 5}px)`}"/>
      <div class="bg-item ground"/>
      <div class="bg-item clouds" :style="{transform: `translateY(${heroContainerMargin * -5}px)`}"/> 
      <div class="bg-item left-rock"/>
      <div class="bg-item right-rock"/>

      <div class="bg-item hole-1">
        <div class="hole-1-bubbles-container buuble-container-shape">
          <bubbles/>
        </div>
      </div>

      <div class="bg-item hole-2">
        <div class="hole-2-bubbles-container buuble-container-shape">
          <bubbles/>
        </div>
      </div>

      <div class="bg-item right-rock-shade"/>
      <div class="bg-item bottom-main-rock"/>

      <div class="bg-item bottom-center-rock-1">
        <div class="bottom-center-rock-1-bubbles-container buuble-container-shape">
          <bubbles/>
        </div>
      </div>

      <div class="bg-item bottom-center-rock-2">
        <div class="bottom-center-rock-2-bubbles-container buuble-container-shape">
          <bubbles/>
        </div>
      </div>

      <div class="arrow-down clickable" @click="onArrowDownClick">
        <img src="../assets/icons/triangle.svg" alt="arrow-down" height="20"/>
      </div>

      <!-- Hero container -->
      <div class="hero-container">
        <div class="flex column layout-align-center-start text-center">
          <div class="hero" :style="[activeWorkFlowMode !== WORK_FLOW_MODES.SKETCH.value && activeWorkFlowMode !== WORK_FLOW_MODES.WIREFRAME.value ? {'margin-top': heroContainerMargin + '%'} : {}]">
            <div class="avatar m-auto"></div>
            <div class="hero-title flex row layout-align-center-center m-t-5">
              <h1>Ido Postelnik</h1>
            </div>
            <div class="hero-subtitle flex row layout-align-center-center m-x-15">
              <h2>UX/UI driven Front-End Engineer</h2>
            </div>

            <!-- Work flow button -->
            <button class="btn work-flow-button m-t-5" :class="{active: shouldShowWorkFlowModesBox === true}" @click="toggleWorkFlowModesBox">
              <span v-bind:key="shouldShowWorkFlowModesBox" >{{ shouldShowWorkFlowModesBox === true && activeWorkFlowMode !== WORK_FLOW_MODES.PRODUCTION.value ? workFlowButton.ON : workFlowButton.OFF }}</span>
            </button>
          </div>

          <!-- Work flow box -->
          <div class="work-flow-box flex column layout-align-center-center m-t-20"
            :class="{active: shouldShowWorkFlowModesBox === true, 'on-scroll': shouldShowWorkFlowModesAtBottom === true}">
            <div class="steps flex layout-align-center-center">
              <work-flow-mode
                v-for="(mode, key, index) in WORK_FLOW_MODES"
                :key="mode.label"
                :index="index + 1"
                :label="mode.label"
                :value="mode.value"
                :isLast="index === workFlowModesSize - 1"
                @click.native="switchWorkFlowMode(key)"
                class="m-r-10">
              </work-flow-mode>
            </div>
            <img src="@/assets/icons/close.svg" alt="close" class="close clickable" @click="toggleWorkFlowModesBox"/>
          </div>

        </div>
      </div>
    </div>

    <!-- Pages cards -->
    <div class="pages-cards flex row layout-align-center-space-evenly">
      <page-card v-for="page in PAGES" :key="page.value" :data="page"></page-card>
    </div>

    <!-- Highlight-area -->
    <div class="highlight-area text-center flex row layout-align-center-center">
      <div class="highlight-image-container flex layout-align-center-end p-r-50">
        <div class="highlight-image"></div>
      </div>
      <p class="highlight-sentence-container flex column layout-align-start-center p-l-50">
        <span class="m-b-5">I believe in End-to-end development.</span> 
        <span class="m-b-5">From idea to production.</span>
        <span>Simple. As. That.</span>    
      </p>
    </div>

    <div class="hide">
      <img src="../assets/img/home/mainContainer/ground.svg" class="pre-load"/>
      <img src="../assets/img/home/mainContainer/back-mountains.svg" class="pre-load"/>
      <img src="../assets/img/home/mainContainer/bottom-center-rock-1.svg" class="pre-load"/>
      <img src="../assets/img/home/mainContainer/bottom-center-rock-2.svg" class="pre-load"/>
      <img src="../assets/img/home/mainContainer/hole-1.svg" class="pre-load"/>
      <img src="../assets/img/home/mainContainer/hole-2.svg" class="pre-load"/>
      <img src="../assets/img/home/mainContainer/right-rock.svg" class="pre-load"/>
      <img src="../assets/img/home/mainContainer/left-rock.svg" class="pre-load"/>
      <img src="../assets/img/home/mainContainer/right-rock-shade.svg" class="pre-load"/>
      <img src="../assets/img/home/mainContainer/clouds.svg" class="pre-load"/>

      <img src="../assets/img/home/workFlowModes/sketch/sketch-right-rock.svg"/>
      <img src="../assets/img/home/workFlowModes/sketch/sketch-left-rock.svg"/>
      <img src="../assets/img/home/workFlowModes/sketch/sketch-ground.svg"/>

      <img src="../assets/img/home/workFlowModes/wireframe/wireframe-right-rock.svg"/>
      <img src="../assets/img/home/workFlowModes/wireframe/wireframe-left-rock.svg"/>
      <img src="../assets/img/home/workFlowModes/wireframe/wireframe-ground.svg"/>

      <img src="../assets/img/pages/about-me.svg"/>
      <img src="../assets/img/pages/work-experience.svg"/>
      <img src="../assets/img/pages/skills-set.svg"/>
      <img src="../assets/img/pages/cv.svg"/>
    </div>

    <!-- Contact-footer -->
    <contact-footer></contact-footer>

    <!-- Copy right -->
    <copy-right />
  </div>
</template>

<script>
import { PAGES, WORK_FLOW_MODES, DEFAULT_ACTIVE_WORK_FLOW_MODE } from "@/utils/constants";
import {_, NProgress} from "@/utils/utils";

const WORK_FLOW_BUTTON = {
  OFF: "Check it out!",
  ON: "Back to normal"
};

// @ is an alias to /src
import PageCard from "@/components/home/PageCard.vue";
import WorkFlowMode from "@/components/home/WorkFlowMode.vue";
import ContactFooter from "@/components/home/ContactFooter.vue";
import CopyRight from "@/components/CopyRight.vue";
import Loader from '@/components/shared/Loader.vue'
import Bubbles from '@/components/home/Bubbles.vue'

// Store
import { mapState, mapMutations  } from 'vuex';

export default {
  name: "home",
  data: () => {
    return {
      heroContainerMargin: null,
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
    Bubbles
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.heroContainerMargin = this.setHeroContainerMarginPercentage();

    // Show NProgress while images are loading
    NProgress.start();

    let imgs = document.getElementsByClassName('pre-load');
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
    onArrowDownClick() {
      let windowInnerHeight = window.innerHeight;
      window.scrollTo({
        top: windowInnerHeight - 50,
        behavior: "smooth"
      });
    },
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


      this.heroContainerMargin = scrollPosition / 120;
    },
    setHeroContainerMarginPercentage() {
      let retVal = 0;
      this.initialHeroContainerMarginPercentage = retVal;

      return retVal;
    } 
  },
  computed: {
    ...mapState([
      'activeWorkFlowMode'
    ])
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

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

  .main-container {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    position: relative;
    background: rgb(253,251,251);
    background: linear-gradient(0deg, #eceff1 0%, white 100%);
    overflow: hidden;

    @include md {
      min-height: unset;
      height: 100vh;
    }

    .bg-item{
      position: absolute;
      background-repeat: no-repeat;
      background-size: contain;
    }

    .ground{
      background-image: url(../assets/img/home/mainContainer/ground.svg);
      bottom: 0;
      height: 30%;
      left: 0;
      right: 0;
      background-size: cover;
      z-index: 2;
    }

    .back-mountains{
      background-image: url(../assets/img/home/mainContainer/back-mountains.svg);
      bottom: 26%;
      height: 40%;
      left: 0;
      right: 0;
      z-index: 1;
      background-position-y: bottom;
    }

    .right-rock{
      background-image: url(../assets/img/home/mainContainer/right-rock.svg);
      bottom: 0;
      top: calc(#{$header-height} + 5px);
      right: 0;
      left: 0;
      background-position-x: right;
      background-position-y: bottom;
      z-index: 3;
    }

    .right-rock-shade{
      background-image: url(../assets/img/home/mainContainer/right-rock-shade.svg);
      bottom: 0;
      top: calc(#{$header-height} + 5px);
      right: 0;
      left: 0;
      background-position-x: right;
      background-position-y: bottom;
      z-index: 3;
    }

    .buuble-container-shape{
      clip-path: polygon(0 0, 100% 0, 76% 100%, 26% 100%);
      mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    }

    .hole-1{
      background-image: url(../assets/img/home/mainContainer/hole-1.svg);
      bottom: 0;
      right: 0;
      width: 10%;
      height: 53%;
      background-position-y: bottom;
      background-position-x: right;
      z-index: 3;
      display: none;

      .hole-1-bubbles-container{
        position: absolute;
        top: -30px;
        left: 10%;
        width: 60%;
        height: 100px;
      }

      @include lg {
        display: block;
      }
    }

    .hole-2{
      background-image: url(../assets/img/home/mainContainer/hole-2.svg);
      bottom: 5%;
      right: 6%;
      width: 8%;
      height: 20%;
      z-index: 4;
      display: none;

      .hole-2-bubbles-container{
        position: absolute;
        top: 0px;
        left: 14%;
        width: 56%;
        height: 80px;
      }

      @include lg {
        display: block;
      }
    }

    .left-rock{
      background-image: url(../assets/img/home/mainContainer/left-rock.svg);
      bottom: 80px;
      left: 0;
      height: 75%;
      width: 60%;
      background-position-x: left;
      background-position-y: bottom;
      z-index: 2;
    }

    .bottom-main-rock{
      background-image: url(../assets/img/home/mainContainer/bottom-main-rock.svg);
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background-position-x: center;
      background-position-y: bottom;
      background-size: contain;
      z-index: 2;
    }

    .bottom-center-rock-1{
      background-image: url(../assets/img/home/mainContainer/bottom-center-rock-1.svg);
      bottom: 0;
      right: 40%;
      width: calc(180px + 5%);
      height: 14%;
      background-position-y: bottom;
      z-index: 3;

      .bottom-center-rock-1-bubbles-container{
        position: absolute;
        top: -60px;
        left: 22%;
        width: 35%;
        height: 110px;
        display: none;

        @include lg {
          display: block;
        }
      }
    }

    .bottom-center-rock-2{
      background-image: url(../assets/img/home/mainContainer/bottom-center-rock-2.svg);
      bottom: 0;
      right: 52%;
      width: calc(170px + 5%);
      height: 14%;
      background-position-y: bottom;
      z-index: 3;

      .bottom-center-rock-2-bubbles-container{
        position: absolute;
        top: -40px;
        left: 15%;
        width: 55%;
        height: 110px;
        display: none;

        @include lg {
          display: block;
        }
      }
    }

    .clouds{
      background-image: url(../assets/img/home/mainContainer/clouds.svg);
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background-position-x: center;
    }

    .arrow-down {
      position: absolute;
      bottom: 30px;
      transition: bottom 0.2s;
      width: 25px;
      height: 30px;
      text-align: center;
      line-height: 40px;
      // filter: $filter-dark-grey;
      z-index: 4;

      &:hover {
        bottom: 25px;
      }
    }

    .hero-container {
      display: block;
      width: 100%;
      height: 40%;
      margin-bottom: 10%;

      @include md {
        height: 55%;
        margin-bottom: 0;
      }

      .hero {
        z-index: 5;

        .avatar {
          height: calc(140px + 1.8vw);
          width: calc(140px + 1.8vw);
          border-radius: 50%;
          background-image: url(../assets/img/home/ido-postelnik-profile-image-zoom.jpg);
          background-size: cover;
          border: $light-grey-d 1px solid;

          @include md {
            height: calc(140px + 2vw);
            width: calc(140px + 2vw);
          }

          @include lg {
            height: calc(140px + 3vw);
            width:  calc(140px + 3vw);
          }
        }

        .hero-title{
          h1 {
            font-size: calc(1.5rem + 2.8vw);
            font-weight: 100;
            font-family: $font-title;
            background-color: $white;
            display: block;
            border-bottom: 1px solid $dark-grey-l;
            padding: 0px 10px;
            border-top-right-radius: 2px;

            @include md {
              font-size: calc(1.5rem + 1.6vw);
              line-height: calc(1.5rem + 2vw);
              background-color: transparent;
              padding: 0;
              border-top-right-radius: 0;
            }
          }
        }

        .hero-subtitle{
          h2 {
            font-size: calc(1.0rem + 1.0vw);
            font-weight: 300;
            letter-spacing: 5.2px;
            display: block;
            background-color: $white;
            border-bottom-right-radius: 2px;
            padding: 5px 8px;

            @include md {
              background-color: transparent;
              font-size: calc(1.0rem + 0.3vw);
            }
          }
        }

        .work-flow-button {
          display: none;
          transition: all 0.2s;

          @include lg {
            display: inline-block;
          }

          &.active {
            background-color: $green;
            color: $white;
          }
        }
      }
    }
  }

  .work-flow-box {
    display: none;
    border: 1px solid #313638;
    border-radius: 20px;
    width: 610px;
    height: 90px;
    z-index: 40;
    background: white;
    padding: 18px 15px;
    transition: left 0.25s ease; // in use when in "code-mode"

    &.active {
      position: relative;
      display: block;
      animation: fade-in 0.2s;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    &.on-scroll {
      position: fixed;
      top: calc(100vh - 135px);
      left: calc(50% - 305px);
      animation: move 0.6s ease-out;
    }

    @keyframes move {
      from {
        top: calc(100vh - 300px);
      }
      to {
        top: calc(100vh - 135px);
      }
    }

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 12px;
    }
  }

  .pages-cards{
    flex-wrap: wrap;
    background-color: $white;
    padding: 10px 10px;

    @include md {
      flex-wrap: nowrap;
      padding: 20px 15px;
      height: 250px;
    }

    @include lg {
      flex-wrap: nowrap;
      padding: 30px 20px;
      height: 300px;
    }

    @include xl {
      padding: 100px 20px;
      height: 500px;
    }
  }

  .highlight-area {
    height: 540px;
    background: rgb(247,247,247);
    background: linear-gradient(0deg, rgba(247,247,247,1) 0%, rgba(255,255,255,1) 100%);
    flex-direction: column-reverse;

    @include md {
      flex-direction: row;
      height: 500px;
    }

    @include lg {
      flex-direction: row;
      height: 600px;
    }

    .highlight-image-container{
      flex: 3;
      height: 100%;
      width: 100%;

      @include md {
        margin-left: auto;
        flex: 1;
      }

      .highlight-image{
        background-image: url(../assets/img/home/highlight-image.png);
        height: 80%;
        width: 90%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;

        @include md {
          background-position: right;
        }
      }
    }

    .highlight-sentence-container{
      flex: 1;
      font-size: calc(1.0rem + 1.0vw);
      font-weight: 300;
      letter-spacing: 2px;
      margin-top: 15px;
      padding-left: 0;
      align-items: center;

      @include md {
        font-size: calc(1.0rem + 0.6vw);
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

    .main-container{
      background: none;

      .ground{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-ground.svg);
        bottom: 0;
        height: 300px;
        left: 0;
        right: 0;
        background-size: contain;
        background-position-y: bottom;
      }

      .back-mountains{
        display: none;
      }

      .right-rock{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-right-rock.svg);
        bottom: 0;
        top: calc(#{$header-height} + 5px);
        right: 0;
        left: 0;
        background-position-x: right;
        background-position-y: bottom;
        z-index: 3;
      }

      .right-rock-shade{
        display: none;
      }

      .hole-1{
        display: none;
      }

      .hole-2{
        display: none;
      }

      .left-rock{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-left-rock.svg);
        bottom: 80px;
        left: 0;
        height: 75%;
        width: 60%;
        background-position-x: left;
        background-position-y: bottom;
      }

      .bottom-main-rock{
        display: none;
      }

      .bottom-center-rock-1{
        display: none;
      }

      .bottom-center-rock-2{
        display: none;
      }

      .clouds{
        display: none;
      }

 
      .hero-container {
        margin-top: 150px !important;

        .hero{
          opacity: 1 !important;

          .avatar{
            background-image: url(../assets/img/home/workFlowModes/sketch/sketch-avatar.svg);
            background-size: contain;
            background-repeat: no-repeat;
            border: 0px;
          }

          .hero-title{
            background-image: url(../assets/img/home/workFlowModes/sketch/sketch-title.svg);
            height: 80px;
            width: 30vw;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;

            h1{
              display: none;
            }
          }
          
          .hero-subtitle{
            h2{
              display: none;
            }
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
            transition: none;

              &:active{
                box-shadow: none !important;
              }
          }
        }
      }

      .arrow-down{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-arrow-down.svg);
        
        img{
          display: none;
        }

        &:hover {
          bottom: 30px;
        }
      }
    }

    .pages-cards{
      background: transparent;
    }

    .highlight-area {
      background: transparent;

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

        span{
          display: none;
        }
      }
    }
  }

  // Wireframe mode
  &.wireframe-mode{
    background-color: $light-grey-l;

    .main-container{
      background: $white;

      .ground{
        background-image: url(../assets/img/home/workFlowModes/wireframe/wireframe-ground.svg);
        bottom: 0;
        height: 300px;
        left: 0;
        right: 0;
      }

      .back-mountains{
        display: none;
      }

      .right-rock{
        background-image: url(../assets/img/home/workFlowModes/wireframe/wireframe-right-rock.svg);
        bottom: 0;
        top: calc(#{$header-height} + 5px);
        right: 0;
        left: 0;
        background-position-x: right;
        background-position-y: bottom;
        z-index: 3;
      }

      .right-rock-shade{
        display: none;
      }

      .hole-1{
        display: none;
      }

      .hole-2{
        display: none;
      }

      .left-rock{
        background-image: url(../assets/img/home/workFlowModes/wireframe/wireframe-left-rock.svg);
        bottom: 0;
        left: 0;
        height: 75%;
        width: 60%;
        background-position-x: left;
        background-position-y: bottom;
      }

      .bottom-main-rock{
        display: none;
      }

      .bottom-center-rock-1{
        display: none;
      }

      .bottom-center-rock-2{
        display: none;
      }

      .clouds{
        display: none;
      }

      .hero-container {
        margin-top: 50px !important;

        .hero{
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
      }

      .arrow-down{
        background-image: url(../assets/img/home/workFlowModes/wireframe/wireframe-arrow-down.svg);
        filter: $filter-light-grey;
        
        img{
          display: none;
        }

        &:hover {
          bottom: 30px;
        }
      }
    }

    .pages-cards{
      background: transparent;
    }

    .highlight-area {
      background-color: #eaeaea;

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
    margin-left: 25%;
    transition: all 0.2s ease;

    .jsfiddle-iframe{
      left: 0;
    }

    .work-flow-box {
      &.on-scroll {
        left: calc(62.5% - 305px);
        transition: left 0.25s ease;
      }
    }
  }

  .hide{
    visibility: hidden;
    height: 0;
    width: 0;
  }
}
</style>
