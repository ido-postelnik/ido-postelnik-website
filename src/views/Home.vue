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
      <div class="welcome flex column layout-align-center-center">
          <div class="profile-image"></div>
          <h1>Ido Postelnik</h1>
          <div class="flex row layout-align-center-center">
            <h2>UX/UI Designer</h2>
            <separator></separator>
            <h2>Frontend Engineer</h2>
            <separator></separator>
            <h2>Product Manager</h2>
          </div>
          <ip-button :label="'About me'" class="m-t-10"></ip-button>
      </div>
    </div>

    <!-- work flow process -->
    <div class="work-flow flex column layout-align-center-center">
      <div class="work-flow-bg"></div>
      <h3 class="m-b-50">I love doing UI. From sketch to production. Simple as that.</h3>
      <div class="steps flex layout-align-center-center">

        <step 
          :index="'1'"
          :title="'Sketch'"  
          class="m-r-10">
        </step>

        <step 
          :index="'2'"
          :title="'Wireframe'"  
          class="m-r-10">
        </step>

        <step 
          :index="'3'"
          :title="'Code'"  
          class="m-r-10">
        </step>

        <step 
          :index="'4'"
          :title="'Production'"
          :isLast="true"  
          class="">
        </step>
      </div>
    </div>

    <!-- inner page cards -->
    <div class="flex row layout-align-start-space-between m-t-30">
      <inner-page-card v-for="page in PAGES" :key="page.value" :data="page"> </inner-page-card>
    </div>

    <!-- quote -->
    <div class="quote flex column layout-align-center-center">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
      <p>Nulla quam velit, vulputate eu pharetra nec,</p>
      <p>mattis ac neque.</p>
    </div>

    <!-- contact section -->
    <footer class="contact"></footer>
    <copy-right/>
  </div>
</template>

<script>
import { PAGES } from '../utils/constants';

// @ is an alias to /src
import Separator from '@/components/shared/Separator.vue'
import IpButton from '@/components/shared/IpButton.vue'
import InnerPageCard from '@/components/home/InnerPageCard.vue'
import Step from '@/components/home/Step.vue'
import CopyRight from '@/components/CopyRight.vue'

export default {
  name: 'home',
  data: function () {
    return {
      PAGES: PAGES
    }
  },
  components: {
    Separator,
    IpButton,
    Step,
    InnerPageCard,
    CopyRight
  },
  created() {
  },
  methods: {
    scrollDown() {
      let windowInnerHeight = window.innerHeight;
      window.scrollTo({
        top: windowInnerHeight - 50,
        behavior: 'smooth',
      });
    }
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

    .welcome{
      height: 90%;
      width: 100%;
      z-index: 2;

      .profile-image{
        height: calc(60px + 7vw);
        width: calc(60px + 7vw);
        border-radius: 50%;
        background-image: url(../assets/img/home/ido-postelnik-profile-image-zoom.jpg);
        background-size: cover;
        border: $light-grey 1px solid;
      }

      h1{
        font-size: calc(0.9rem + 3.0vw);
        font-weight: 600;
        font-family: $font-title;
      }

      h2{
        font-size: calc(0.75rem + 0.75vw);
        letter-spacing: 1.5px;
      }      
    }
  }

  .work-flow{
    display: none;
    position: relative;

    &-bg{
      background-image: url(../assets/img/home/work-flow-bg.svg);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 250px;
      background-repeat: no-repeat;
      background-position: left bottom;
    }
  }

  // 992px window width and more
  @include lg {
    .work-flow{
       display: flex;
       height: 45vh;

      h3{
        font-size: calc(1rem + 0.4vw);
        font-weight: 300;
        letter-spacing: 3px;
        z-index: 2;
      }   

      .steps{
        width: 100%;
        z-index: 2;
      }

    }
  }
  
  .quote{
    height: 300px;
    font-size: 2rem;
  }

  .contact{
    height: 300px;
    background: rgb(53,92,125);
    background: linear-gradient(180deg, rgba(53,92,125,1) 0%, rgba(108,91,123,1) 48%, rgba(192,108,132,1) 100%);
    border-bottom: 10px solid $dark-grey;
  }
}
</style>