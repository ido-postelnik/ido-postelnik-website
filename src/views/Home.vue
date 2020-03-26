<template>
  <div class="home">

    <!-- main section -->
    <div class="main-container flex layout-align-start-center">
      <div class="sky"></div>
      <div class="sun"></div>
      <div class="road"></div>
      <div class="arrow-down clickable" @click="onArrowDownClick()">
        <img src="../assets/icons/arrow-down.svg" alt="arrow-down" height="20"/>
      </div>

      <!-- ido-postelnik -->
      <div class="hero-container" :style="{'margin-top': heroContainerMargin + '%'}">
        <div class="text-center flex column layout-align-center-start">
          <div class="hero" :style="{'opacity': heroContainerOpacity}">
            <div class="profile-image m-auto"></div>
            <div class="flex row layout-align-center-center m-t-10">
              <h1>Ido Postelnik</h1>
              <h2>Front End Engineer</h2>
            </div>
            <div class="flex row layout-align-center-center m-t-5">
              <h3><span class="m-r-10">I love doing UI.</span> <span class="m-r-10">From sketch to production.</span> <span>Simple as that.</span></h3>
            </div>

            <button class="btn work-flow-button m-t-10" :class="{'active': shouldShowWorkFlowModes === true}" @click="toggleWorkFlowModes">{{workFlowButton}}</button>
          </div>
          <!-- work flow process -->
          <div class="work-flow flex column layout-align-center-center m-t-20" :class="{'active': shouldShowWorkFlowModes === true, 'on-scroll': shouldShowWorkFlowModesOnScroll === true}">
            <div class="steps flex layout-align-center-center">
              <step v-for="(mode, key, index) in workFlowModes" 
              :key="mode.title" 
              :index="index + 1" 
              :title="mode.title"
              :isActive="mode.isActive"
              :isLast="index === workFlowModesSize - 1" 
              @click.native="switchWorkFlowMode(key)" 
              class="m-r-10"></step>
            </div>
            <img src="../assets/icons/close.svg" alt="close" class="close clickable" @click="hideWorkFlowModes"/>
          </div>

        </div>
      </div>

    </div>

    <!-- inner page cards -->
    <div class="flex row layout-align-start-space-between m-t-20">
      <inner-page-card v-for="page in PAGES" :key="page.value" :data="page"> </inner-page-card>
    </div>

    <!-- quote -->
    <div class="quote flex column layout-align-center-center">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
      <p>Nulla quam velit, vulputate eu pharetra nec,</p>
      <p>mattis ac neque.</p>
    </div>

    <!-- Footer -->
    <contact-footer></contact-footer>

    <copy-right/>
  </div>
</template>

<script>
import { PAGES } from '../utils/constants';
import {_} from '@/utils/utils';

const WORK_FLOW_MODES = {
  SKETCH: {
    title: 'Sketch',
    isActive: false
  },
  WIREFRAME: {
    title: 'Wireframe',
    isActive: false
  },
  CODE: {
    title: 'Code',
    isActive: false
  },
  PRODUCTION: {
    title: 'Production',
    isActive: false
  }
};
const DEFAULT_ACTIVE_WORK_FLOW_MODE = 'PRODUCTION';
const WORK_FLOW_BUTTON = {
  OFF: 'Check it out!',
  ON: 'Back to normal'
};

// @ is an alias to /src
import InnerPageCard from '@/components/home/InnerPageCard.vue'
import Step from '@/components/home/Step.vue'
import ContactFooter from '@/components/home/ContactFooter.vue'
import CopyRight from '@/components/CopyRight.vue'

export default {
  name: 'home',
  data: function () {
    return {
      heroContainerMargin: 10,
      heroContainerOpacity: 1,
      // Work flow
      workFlowButton: WORK_FLOW_BUTTON.OFF,
      workFlowModes: WORK_FLOW_MODES,
      workFlowModesSize: _.size(WORK_FLOW_MODES),
      activeWorkFlowMode: DEFAULT_ACTIVE_WORK_FLOW_MODE,
      shouldShowWorkFlowModes: false,
      shouldShowWorkFlowModesOnScroll: false,
      userHadScrolled: false,
      //
      PAGES: PAGES
    }
  },
  components: {
    Step,
    InnerPageCard,
    ContactFooter,
    CopyRight
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  created() {
    this.setDefaultActiveWorkFlowMode();
  },
  methods: {
    onArrowDownClick() {
      let windowInnerHeight = window.innerHeight;
      window.scrollTo({
        top: windowInnerHeight - 50,
        behavior: 'smooth',
      });
    },
    //#region WorkFlow modes
      setDefaultActiveWorkFlowMode() {
        this.workFlowModes[this.activeWorkFlowMode].isActive = true;
      },
      toggleWorkFlowModes() {
        if(this.shouldShowWorkFlowModes === true) {
          this.shouldShowWorkFlowModes = false;
          this.workFlowButton = WORK_FLOW_BUTTON.OFF;
        }
        else {
          this.shouldShowWorkFlowModes = true;
          this.workFlowButton = WORK_FLOW_BUTTON.ON;

          // Active mode state
          this.workFlowModes[this.activeWorkFlowMode].isActive = false;
          this.workFlowModes[DEFAULT_ACTIVE_WORK_FLOW_MODE].isActive = true;
          this.activeWorkFlowMode = DEFAULT_ACTIVE_WORK_FLOW_MODE;
        }
      },
      hideWorkFlowModes() {
        this.shouldShowWorkFlowModes = false;
        this.userHadScrolled = false;
        this.shouldShowWorkFlowModesOnScroll = false;
        this.workFlowButton = WORK_FLOW_BUTTON.OFF;

        // Active mode state
        this.workFlowModes[this.activeWorkFlowMode].isActive = false;
        this.workFlowModes[DEFAULT_ACTIVE_WORK_FLOW_MODE].isActive = true;
        this.activeWorkFlowMode = DEFAULT_ACTIVE_WORK_FLOW_MODE;
      },
      switchWorkFlowMode(modeKey) {
        if(modeKey !== this.activeWorkFlowMode) {
          this.workFlowModes[this.activeWorkFlowMode].isActive = false;
          this.workFlowModes[modeKey].isActive = true;
          this.activeWorkFlowMode = modeKey;
        }
      },
      onScroll() {
        if(this.userHadScrolled === false && this.shouldShowWorkFlowModes === true){
          this.userHadScrolled = true;
          this.shouldShowWorkFlowModesOnScroll = true;
        }

        let scrollPosition = window.scrollY;
        this.heroContainerMargin = 10 + (scrollPosition / 50);

        // if(scrollPosition > 200) {
          this.heroContainerOpacity = 200 / scrollPosition;
        // }
      }
    //#endregion
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

.home{
  background: white;

  .main-container {
    height: 100vh;
    position: relative;
    background: $light-grey-l;
    background: linear-gradient(0deg, $light-grey-l 0%, $white 100%);

    .sky{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-repeat: no-repeat;
      height: 400px;
      background-image: url(../assets/img/home/road/sky.svg);
    }

    .sun{
      background-image: url(../assets/img/home/road/sun.svg);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-repeat: no-repeat;
      background-position: bottom;
    }

    .road{
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

    .arrow-down{
      position: absolute;
      bottom: 30px;
      transition: bottom 0.2s;
      width: 25px;
      height: 30px;
      text-align: center;
      line-height: 40px;
      filter: $filter-dark-grey;
      z-index: 5;

      &:hover{
        bottom: 25px;
      }
    }

    .hero-container{
      width: 100%;
      margin-top: 10%;
      

      .hero{
        z-index: 2;
        .profile-image{
          height: calc(60px + 7.5vw);
          width: calc(60px + 7.5vw);
          border-radius: 50%;
          background-image: url(../assets/img/home/ido-postelnik-profile-image-zoom.jpg);
          background-size: cover;
          border: $light-grey 1px solid;
        }

        h1{
          font-size: calc(0.9rem + 2.0vw);
          line-height: calc(0.9rem + 2.0vw);
          font-weight: 600;
          font-family: $font-title;
          padding-right: 20px;
          margin-right: 20px;
          border-right: 4px solid $dark-grey;
        }

        h2{
          font-size: calc(0.9rem + 1.3vw);
          letter-spacing: 1.5px;
          font-weight: 500;
        } 

        h3{
          font-size: calc(0.75rem + 0.75vw);
          font-weight: 300;

          span{
            letter-spacing: 1.2px;
          }
        }
        
        .work-flow-button{
          transition: all 0.2s;

          &.active{
            background-color: $green;
            color: $white;
          }
        }
      }
    }
  }

  .work-flow{
    display: none;
    border: 1px solid #313638;
    border-radius: 20px;
    width: 600px;
    height: 90px;
    z-index: 5;
    background: white;
    padding: 18px 15px;

    &.active{
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

    &.on-scroll{
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

    .close{
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
  
  .quote{
    height: 300px;
    font-size: calc(0.7rem + 0.9vw);
  }
}
</style>