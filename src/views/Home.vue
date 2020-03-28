<template>
  <div class="home" 
    :class="{
      'sketch-mode': activeWorkFlowMode === workFlowModes.SKETCH.value,
      'wireframe-mode': activeWorkFlowMode === workFlowModes.WIREFRAME.value,
      'code-mode': activeWorkFlowMode === workFlowModes.CODE.value}">

    <div :class="{'work-flow-mode-transition': isWorkFlowModeChanged === true}"></div>
    
    <!-- Main container -->
    <div class="main-container flex layout-align-start-center">
      <div class="sky"></div>
      <div class="sun"></div>
      <div class="road"></div>
      <div class="arrow-down clickable" @click="onArrowDownClick()">
        <img src="../assets/icons/arrow-down.svg" alt="arrow-down" height="20"/>
      </div>

      <!-- ido-postelnik -->
      <div class="hero-container" :style="{ 'margin-top': heroContainerMargin + '%' }">
        <div class="text-center flex column layout-align-center-start">
          <div class="hero" :style="{ opacity: heroContainerOpacity }">
            <div class="avatar m-auto"></div>
            <div class="hero-title flex row layout-align-center-center m-t-10">
              <h1>Ido Postelnik</h1>
              <h2>Front End Engineer</h2>
            </div>
            <div class="hero-subtitle flex row layout-align-center-center m-t-5">
              <h3>
                <span class="m-r-10">I love doing UI.</span>
                <span class="m-r-10">From sketch to production.</span>
                <span>Simple as that.</span>
              </h3>
            </div>

            <!-- Work flow button -->
            <button
              class="btn work-flow-button m-t-10"
              :class="{ active: shouldShowWorkFlowModesBox === true }"
              @click="toggleWorkFlowModesBox">
              {{ workFlowButton }}
            </button>
          </div>

          <!-- work flow process -->
          <div class="work-flow flex column layout-align-center-center m-t-20"
            :class="{active: shouldShowWorkFlowModesBox === true, 'on-scroll': shouldShowWorkFlowModesAtBottom === true}">
            <div class="steps flex layout-align-center-center">
              <mode
                v-for="(mode, key, index) in workFlowModes"
                :key="mode.label"
                :index="index + 1"
                :label="mode.label"
                :value="mode.value"
                :isLast="index === workFlowModesSize - 1"
                @click.native="switchWorkFlowMode(key)"
                class="m-r-10">
              </mode>
            </div>
            <img src="../assets/icons/close.svg" alt="close" class="close clickable" @click="toggleWorkFlowModesBox"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Pages cards -->
    <div class="flex row layout-align-start-space-between m-t-20">
      <page-card
        v-for="page in PAGES"
        :key="page.value"
        :data="page"></page-card>
    </div>

    <!-- Highlight-sentence -->
    <div class="highlight-sentence text-center flex column layout-align-center-center">
      <p>Lorem ipsum dolor sit amet,<br> consectetur adipiscingNulla quam velit,<br> vulputate eu pharetra nec.</p>
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
import Mode from "@/components/home/Mode.vue";
import ContactFooter from "@/components/home/ContactFooter.vue";
import CopyRight from "@/components/CopyRight.vue";

// Store
import { mapState, mapMutations  } from 'vuex';

export default {
  name: "home",
  data: () => {
    return {
      heroContainerMargin: 10,
      heroContainerOpacity: 1,
      // Work flow
      workFlowButton: WORK_FLOW_BUTTON.OFF,
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
    Mode,
    PageCard,
    ContactFooter,
    CopyRight
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
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
        this.workFlowButton = WORK_FLOW_BUTTON.OFF;
        this.shouldShowWorkFlowModesBox = false;
        this.showLoaderBetweenModeChange(DEFAULT_ACTIVE_WORK_FLOW_MODE);
      } else {
      // Show WorkFlowModesBox
        this.shouldShowWorkFlowModesBox = true;
        this.workFlowButton = WORK_FLOW_BUTTON.ON;
        this.shouldShowWorkFlowModesAtBottom = false;
      }
    },
    switchWorkFlowMode(modeKey) {
      if (modeKey !== this.activeWorkFlowMode) {
        this.shouldShowWorkFlowModesAtBottom = true;
        this.showLoaderBetweenModeChange(modeKey);
      }
    },
    showLoaderBetweenModeChange(modeKey) {
      this.isWorkFlowModeChanged = true;
      setTimeout(() => {
        this.isWorkFlowModeChanged = false
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

      this.heroContainerMargin = 10 + scrollPosition / 50;

      // if(scrollPosition > 200) {
      this.heroContainerOpacity = 200 / scrollPosition;
      // }
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

  .work-flow-mode-transition{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $white;
    z-index: 10;
    pointer-events: none;
    opacity: 0;
    animation: fade-in-and-out 600ms;
    }

    @keyframes fade-in-and-out {
      0%   {opacity: 0;}
      30%  {opacity: 1;}
      70%  {opacity: 1;}
      100% {opacity: 0;}
    }

  .main-container {
    height: 100vh;
    position: relative;
    background: $light-grey-l;
    background: linear-gradient(0deg, $light-grey-l 0%, $white 100%);

    .sky {
      background-image: url(../assets/img/home/road/sky.svg);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-repeat: no-repeat;
      background-position: top;
      height: 400px;
    }

    .sun {
      background-image: url(../assets/img/home/road/sun.svg);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-repeat: no-repeat;
      background-position: bottom;
    }

    .road {
      background-image: url(../assets/img/home/road/road.svg);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-repeat: no-repeat;
      background-position: bottom;
      z-index: 3;
      pointer-events: none;
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
      margin-top: 10%;

      .hero {
        z-index: 2;

        .hero-title{
          min-height: 80px;
        }

        .avatar {
          height: calc(60px + 7.5vw);
          width: calc(60px + 7.5vw);
          border-radius: 50%;
          background-image: url(../assets/img/home/ido-postelnik-profile-image-zoom.jpg);
          background-size: cover;
          border: $light-grey 1px solid;
        }

        h1 {
          font-size: calc(0.9rem + 2vw);
          line-height: calc(0.9rem + 2vw);
          font-weight: 600;
          font-family: $font-title;
          padding-right: 20px;
          margin-right: 20px;
          border-right: 4px solid $dark-grey;
        }

        h2 {
          font-size: calc(0.9rem + 1.3vw);
          letter-spacing: 1.5px;
          font-weight: 500;
        }

        h3 {
          font-size: calc(0.75rem + 0.75vw);
          font-weight: 300;

          span {
            letter-spacing: 1.2px;
          }
        }

        .work-flow-button {
          transition: all 0.2s;

          &.active {
            background-color: $green;
            color: $white;
          }
        }
      }
    }
  }

  .work-flow {
    display: none;
    border: 1px solid #313638;
    border-radius: 20px;
    width: 600px;
    height: 90px;
    z-index: 11;
    background: white;
    padding: 18px 15px;

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
      left: calc(50% - 300px);
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

  // 992px window width and more
  // @include lg {
  //   .work-flow{
  //      display: flex;
  //      height: 45vh;

  //     h3{
  //       font-size: calc(1rem + 0.4vw);
  //       font-weight: 300;
  //       letter-spacing: 3px;
  //       z-index: 2;
  //     }

  //     .steps{
  //       width: 100%;
  //       z-index: 2;
  //     }

  //   }
  // }

  .highlight-sentence {
    height: 300px;
    font-size: calc(0.7rem + 0.9vw);
    
  }

  // Sketch mode
  &.sketch-mode{
    background: none;
    background-image: url(../assets/img/home/workFlowModes/sketch/sketch-bg.svg);

    .main-container{
      background: none;
      .sky{
        top: 55px;
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-sky.svg);
        height: 260px;
      }

      .sun{
        display: none;
      }
      
      .road{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-road.svg);
        height: 300px;
      }

      .arrow-down{
        background-image: url(../assets/img/home/workFlowModes/sketch/sketch-arrow-down.svg);
        img{
          display: none;
        }
      }
    }

    .hero-container {
      margin-top: 230px !important;

      .hero{
        opacity: 1 !important;
        .avatar{
          background-image: url(../assets/img/home/workFlowModes/sketch/sketch-avatar.svg);
          background-size: contain;
          background-repeat: no-repeat;
          height: calc(60px + 5.5vw);
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
}
</style>
