<template>
  <div class="home"
    :class="{
      'sketch-mode': activeWorkFlowMode === workFlowModes.SKETCH.value,
      'wireframe-mode': activeWorkFlowMode === workFlowModes.WIREFRAME.value,
      'code-mode': activeWorkFlowMode === workFlowModes.CODE.value}">

    <div :class="{'work-flow-mode-transition': isWorkFlowModeChanged === true}"></div>
    
    <!-- JSfiddle iframe -->
    <iframe class="jsfiddle-iframe" src="//jsfiddle.net/idop/h27dzkbu/14/embedded/js,html,css/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

    <!-- Main container -->
    <div class="main-container flex layout-align-center-center">
      <div class="bg-item top-left"></div>
      <div class="bg-item bottom-left"></div>
      <div class="bg-item right"></div>
      <div class="arrow-down clickable" @click="onArrowDownClick">
        <img src="../assets/icons/arrow-down.svg" alt="arrow-down" height="20"/>
      </div>

      <!-- Hero container -->
      <div class="hero-container">
        <div class="flex column layout-align-center-start text-center">
          <div class="hero" :style="[{opacity: heroContainerOpacity}, activeWorkFlowMode !== workFlowModes.SKETCH.value && activeWorkFlowMode !== workFlowModes.WIREFRAME.value ? {'margin-top': heroContainerMargin + '%'} : {}]">
            <div class="avatar m-auto"></div>
            <div class="hero-title flex row layout-align-center-center m-t-5">
              <h1>Ido Postelnik</h1>
            </div>
            <div class="hero-subtitle flex row layout-align-center-center">
              <h2>UX/UI driven Front End Engineer</h2>
            </div>

            <!-- Work flow button -->
            <button
              class="btn work-flow-button m-t-10"
              :class="{active: shouldShowWorkFlowModesBox === true}"
              @click="toggleWorkFlowModesBox">
              <transition name="work-flow-button-fade" mode="out-in">
                <span v-bind:key="shouldShowWorkFlowModesBox" >{{ shouldShowWorkFlowModesBox === true && activeWorkFlowMode !== workFlowModes.PRODUCTION.value ? workFlowButton.ON : workFlowButton.OFF }}</span>
              </transition>
            </button>
          </div>

          <!-- Work flow box -->
          <div class="work-flow-box flex column layout-align-center-center m-t-20"
            :class="{active: shouldShowWorkFlowModesBox === true, 'on-scroll': shouldShowWorkFlowModesAtBottom === true}">
            <div class="steps flex layout-align-center-center">
              <work-flow-mode
                v-for="(mode, key, index) in workFlowModes"
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
    <div class="pages-cards flex row layout-align-start-space-between p-t-50 p-b-50 p-x-50">
      <page-card v-for="page in PAGES" :key="page.value" :data="page"></page-card>
    </div>

    <!-- Highlight-area -->
    <div class="highlight-area text-center flex row layout-align-center-center">
      <div class="highlight-image-container flex layout-align-center-end p-r-50">
        <img src="@/assets/img/home/highlight-sentence.png" alt="highlight-sentence">
      </div>
      <p class="highlight-sentence-container flex column layout-align-start-center p-l-50">
        <span class="m-b-5">I do End-to-End development.</span> 
        <span class="m-b-5">From idea to production.</span>
        <span>Simple. As. That.</span>    
      </p>
    </div>

    <!-- Contact-footer -->
    <contact-footer></contact-footer>

    <!-- Copy right -->
    <copy-right />
  </div>
</template>

<script>
import { PAGES, WORK_FLOW_MODES, DEFAULT_ACTIVE_WORK_FLOW_MODE } from "@/utils/constants";
import { _ } from "@/utils/utils";

const WORK_FLOW_BUTTON = {
  OFF: "Check it out!",
  ON: "Back to normal"
};

// @ is an alias to /src
import PageCard from "@/components/home/PageCard.vue";
import WorkFlowMode from "@/components/home/WorkFlowMode.vue";
import ContactFooter from "@/components/home/ContactFooter.vue";
import CopyRight from "@/components/CopyRight.vue";

// Store
import { mapState, mapMutations  } from 'vuex';

export default {
  name: "home",
  data: () => {
    return {
      heroContainerMargin: null,
      heroContainerOpacity: 1,
      // Work flow
      workFlowButton: WORK_FLOW_BUTTON,
      workFlowModes: WORK_FLOW_MODES,
      workFlowModesSize: _.size(WORK_FLOW_MODES),
      shouldShowWorkFlowModesBox: false,
      shouldShowWorkFlowModesAtBottom: false,
      userHasScrolled: false,
      isWorkFlowModeChanged: false,
      //
      PAGES: PAGES
    };
  },
  components: {
    WorkFlowMode,
    PageCard,
    ContactFooter,
    CopyRight
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    // window.addEventListener("resize", this.setHeroContainerMarginPercentage);
    this.heroContainerMargin = this.setHeroContainerMarginPercentage();
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
      } else {
      // Show WorkFlowModesBox
        this.shouldShowWorkFlowModesBox = true;
        this.shouldShowWorkFlowModesAtBottom = false;

        // gtag event
        this.$gtag.time({
          'name' : 'showWorkFlowModesBox',
          // 'value' : 3549,
          'event_category' : 'engagement'
        })
      }
    },
    switchWorkFlowMode(modeKey) {
      if (modeKey !== this.activeWorkFlowMode) {
        this.shouldShowWorkFlowModesAtBottom = true;
        this.showLoaderBetweenModeChange(modeKey);

        // gtag event
        this.$gtag.time({
          'name' : 'switchWorkFlowMode',
          'value' : 1,
          'event_category' : 'engagement'
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


      this.heroContainerMargin = scrollPosition / 50;

      // if(scrollPosition > 200) {
      this.heroContainerOpacity = 200 / scrollPosition;
      // }
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
  background: white;

  .jsfiddle-iframe{
    position: fixed;
    left: -25%;
    top: $header-height;
    bottom: 0;
    width: 25%;
    height: calc(100% - 50px);
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
  }

  .main-container {
    height: 100vh;
    position: relative;
    // background: #fdfbfb ;
    // background: linear-gradient(0deg, #fdfbfb  0%, #ebedee 100%);
    // background: rgb(253,251,251);
    // background: radial-gradient(circle, rgba(253,251,251,1) 0%, rgba(235,237,238,1) 100%);
    background: rgb(253,251,251);
    background: linear-gradient(288deg, rgba(253,251,251,1) 0%, rgba(255,255,255,1) 100%);

    .bg-item{
      position: absolute;
      background-repeat: no-repeat;
      background-size: contain;
    }

    .top-left {
      background-image: url(../assets/img/home/buildings/top-left.svg);
      top: 0;
      left: 0;
      height: 70%;
      width: 30%;
    }

    .bottom-left {
      background-image: url(../assets/img/home/buildings/bottom-left.svg);
      bottom: 0;
      left: 0;
      height: 34%;
      width: 50%;
    }

    .right {
      background-position: bottom right;
      background-image: url(/img/right.21af4566.svg);
      bottom: 0;
      top: 0;
      right: 0;
      width: 100%;
    }

    .arrow-down {
      position: absolute;
      bottom: 30px;
      transition: bottom 0.2s;
      width: 25px;
      height: 30px;
      text-align: center;
      line-height: 40px;
      filter: $filter-dark-grey;
      z-index: 5;

      &:hover {
        bottom: 25px;
      }
    }

    .hero-container {
      width: 100%;
      height: 55%;
      display: block;

      .hero {
        z-index: 2;

        .hero-title{
        }

        .avatar {
          height: calc(140px + 1vw);
          width: calc(140px + 1vw);
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

        h1 {
          font-size: calc(1.5rem + 1.2vw);
          font-weight: 100;
          font-family: $font-title;

          @include md {
            font-size: calc(1.5rem + 1.8vw);
          }
        }

        h2 {
          font-size: calc(1.0rem + 0.6vw);
          font-weight: 400;
          letter-spacing: 6.2px;
          display: block;

        }

        .work-flow-button {
          display: none;
          transition: all 0.2s;

          @include lg {
            display: inline-block;
          }

          .work-flow-button-fade-enter-active, .work-flow-button-fade-leave-active {
            transition: opacity .1s;
          }
          .work-flow-button-fade-enter, .work-flow-button-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
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
    // width: 90%;
    background: rgb(247,247,247);
    background: linear-gradient(90deg, rgba(247,247,247,1) 0%, rgba(255,255,255,1) 100%);

    @include sm {
      flex-wrap: nowrap;
    }
  }

  .highlight-area {
    height: 70vh;
    background: rgb(247,247,247);
    background: linear-gradient(0deg, rgba(247,247,247,1) 0%, rgba(255,255,255,1) 100%);

    .highlight-image-container{
      flex: 1;
      height: 100%;

      img{
        height: 80%;
      }
    }

    .highlight-sentence-container{
      flex: 1;
      font-size: calc(1.0rem + 0.3vw);
      letter-spacing: 2px;;

      @include md {
        font-size: calc(1.0rem + 0.6vw);
      }

    }

  }

  // Sketch mode
  &.sketch-mode{
    background: none;
    background-image: url(../assets/img/home/workFlowModes/sketch/sketch-bg.svg);

    .main-container{
      background: none;
      .sky{
        top: calc(#{$header-height} + 5px);
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-sky.svg);
        background-size: contain;
        height: 260px;
      }

      .sun{
        display: none;
      }
      
      .road{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-road.svg);
        height: 300px;
        background-size: contain;
      }

      .arrow-down{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-arrow-down.svg);
        img{
          display: none;
        }
      }
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

          h1, h2{
            display: none;
          }
        }
        
        .hero-subtitle{
          h3, span{
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

    .highlight-sentence{
      background-image: url(../assets/img/home/workFlowModes/sketch/sketch-highlight-sentence.svg);
      background-repeat: no-repeat;
      background-size: 40%;
      background-position: center;
      margin: 20px 0;

      p{
        display: none;
      }
    }
  }

  // Wireframe mode
  &.wireframe-mode{
    background-color: $light-grey-l;
    background-image: none;

    .main-container{
      background: none;
      .sky{
        top: calc(#{$header-height} + 5px);
        background-image: url(../assets/img/home/workFlowModes/wireframe/wireframe-sky.svg);
        background-size: contain;
        height: 260px;
      }

      .sun{
        display: none;
      }
      
      .road{
        background-image: url(../assets/img/home/workFlowModes/wireframe/wireframe-road.svg);
        background-size: contain;
        height: 300px;
      }

      .arrow-down{
        background-image: url(../assets/img/home/workFlowModes/wireframe/wireframe-arrow-down.svg);
        filter: $filter-white;
        img{
          display: none;
        }
      }
    }

    .hero-container {
      margin-top: 50px !important;
      z-index: 3;

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
         
          h1, h2{
             font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
             font-weight: 500;
             border: 0px;
             padding-right: 0px;
             margin-right: 10px;
          }
        }
        
        .hero-subtitle{
          h3, span{
            letter-spacing: 1px;
          }
        }

        .work-flow-button{
          background-color: $light-grey-l !important;
          color: $dark-grey !important;
          border-radius: 5px;
          z-index: 6;

          &:active{
            box-shadow: none !important;
          }
        }
      }
    }

    .highlight-sentence{
      p{
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

    .main-container{
      .sky{
        top: calc(#{$header-height} - 2px);
      }
    }

    .work-flow-box {
      &.on-scroll {
        left: calc(62.5% - 305px);
        transition: left 0.25s ease;
      }
    }
  }
}
</style>
