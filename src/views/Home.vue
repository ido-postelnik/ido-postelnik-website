<template>
  <div class="home">

    <!-- main section -->
    <div class="main-container flex layout-align-start-center">
      <div class="wave wave-3"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-1"></div>
      <div class="world"></div>
      <div class="small-buildings"></div>
      <div class="left-buildings"></div>
      <div class="right-buildings"></div>
      <div class="arrow-down clickable" @click="scrollDown()">
        <img src="../assets/icons/arrow-down.svg" alt="arrow-down" height="20"/>
      </div>

      <!-- ido-postelnik -->
      <div class="welcome-container flex column layout-align-center-center">
        <div class="welcome text-center">
          <div class="profile-image m-auto"></div>
          <div class="flex row layout-align-center-center m-t-10">
            <h1>Ido Postelnik</h1>
            <h2>Front End Engineer</h2>
          </div>
          <div class="flex row layout-align-center-center m-t-5">
            <h3>I love doing UI. From sketch to production. Simple as that.</h3>
          </div>
          <button class="btn m-t-10 m-auto" @click="showWorkFlowModes">Check it out!</button>

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

// @ is an alias to /src
import InnerPageCard from '@/components/home/InnerPageCard.vue'
import Step from '@/components/home/Step.vue'
import ContactFooter from '@/components/home/ContactFooter.vue'
import CopyRight from '@/components/CopyRight.vue'

export default {
  name: 'home',
  data: function () {
    return {
      PAGES: PAGES,
      // Work flow
      workFlowModes: WORK_FLOW_MODES,
      workFlowModesSize: _.size(WORK_FLOW_MODES),
      activeWorkFlowMode: DEFAULT_ACTIVE_WORK_FLOW_MODE,
      shouldShowWorkFlowModes: false,
      shouldShowWorkFlowModesOnScroll: false,
      userHadScrolled: false
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
    scrollDown() {
      let windowInnerHeight = window.innerHeight;
      window.scrollTo({
        top: windowInnerHeight - 50,
        behavior: 'smooth',
      });
    },
    // Work Flow Modes
    setDefaultActiveWorkFlowMode() {
      this.workFlowModes[this.activeWorkFlowMode].isActive = true;
    },
    showWorkFlowModes() {
      this.shouldShowWorkFlowModes = true;
    },
    hideWorkFlowModes() {
      this.shouldShowWorkFlowModes = false;
      this.userHadScrolled = false;
      this.shouldShowWorkFlowModesOnScroll = false;
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
    },
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
    background: rgb(236,233,230);
    background: linear-gradient(0deg, $dirty-white 0%, $white 100%);

    .wave{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-repeat: no-repeat;
      height: 90%;

      &-1 {
        background-image: url(../assets/img/home/wave-1.svg);
      }

      &-2 {
        background-image: url(../assets/img/home/wave-2.svg);
      }

      &-3 {
        background-image: url(../assets/img/home/wave-3.svg);
      }
    }

    .world{
      background-image: url(../assets/img/home/world.svg);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 190px;
      background-repeat: no-repeat;
      background-position: bottom;
    }

    .small-buildings{
      background-image: url(../assets/img/home/small-buildings.svg);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 30%;
      background-repeat: no-repeat;
      background-position: bottom;
    }

    .left-buildings{
      background-image: url(../assets/img/home/left-buildings.svg);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 50%;
      height: 90%;
      background-repeat: no-repeat;
      background-position: left bottom;
    }

    .right-buildings{
      background-image: url(../assets/img/home/right-buildings.svg);
      position: absolute;
      bottom: 0;
      left: 50%;
      right: 0;
      height: 90%;
      background-repeat: no-repeat;
      background-position: right bottom;
    }

    .arrow-down{
      position: absolute;
      bottom: 20px;
      transition: bottom 0.2s;
      width: 25px;
      height: 30px;
      text-align: center;
      line-height: 40px;

      &:hover{
        bottom: 15px;
      }
    }

    .welcome-container{
      height: 90%;
      width: 100%;
      z-index: 2;

      .welcome{
        position: relative;

        .profile-image{
          height: calc(60px + 7vw);
          width: calc(60px + 7vw);
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
          letter-spacing: 1.5px;
        }      
      }
    }
  }

  .work-flow{
    display: none;
    border: 1px solid #313638;
    border-radius: 20px;
    width: 600px;
    height: 100px;
    bottom: 100px;
    left: calc(50% - 300px);
    z-index: 2;
    background: white;
    padding: 20px;
    transition: top 0.2s ease;
    position: relative;

    &.active{
      display: block;
      position: fixed;
      top: calc(1.6rem + 2.75vw + 50% + 40px);
      left: calc(50% - 300px);
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
      top: calc(100vh - 150px);
      left: calc(50% - 300px);
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