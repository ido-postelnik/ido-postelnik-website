<template>
  <div class="home">

    <!-- main section -->
    <div class="main-container">

      <!-- ido-postelnik -->
      <div class="top">
        <div class="ido-postelnik flex column layout-align-center-center">
          <div class="profile-image"></div>
          <h1>Ido Postelnik</h1>
          <div class="flex row layout-align-center-center">
            <h2>UX/UI Designer</h2>
            <separator></separator>
            <h2>Frontend Engineer</h2>
            <separator></separator>
            <h2>Product Manager</h2>
          </div>
          <h3 class="m-t-15">I love doing UI. From sketch to production. Simple as that.</h3>
        </div>

        <!-- work flow process -->
        <div class="work-flow m-r-30">
          <div class="work-flow-step">A</div>
          <div class="work-flow-step m-x-20">B</div>
          <div class="work-flow-step">C</div>
        </div>
      </div>
     
      <!-- bottom part -->
      <div class="bottom flex row layout-align-start-space-between">
        <inner-page-card class="about-me" label="About me"/>
        <inner-page-card class="work-experience" label="Work experience"/>
        <inner-page-card class="skills-set" label="Skills set"/>
        <inner-page-card class="cv" label="CV"/>
      </div>
    </div>

    <!-- sub section -->
    <div class="sub-container flex column layout-align-center-center">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
      <p>Nulla quam velit, vulputate eu pharetra nec,</p>
      <p>mattis ac neque.</p>
    </div>

    <!-- contact section -->
    <footer class="footer-container">
    </footer>
    <copy-right/>
  </div>
</template>

<script>
// @ is an alias to /src
import Separator from '@/components/shared/Separator.vue'
import InnerPageCard from '@/components/home/InnerPageCard.vue'
import CopyRight from '@/components/CopyRight.vue'

export default {
  name: 'home',
  data: function () {
    return {
    }
  },
  components: {
    Separator,
    InnerPageCard,
    CopyRight
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

.home{
  position: fixed;
  top: $header-height;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  &::after {
    content: "";
    background-image: url(../assets/img/home/background.png);
    opacity: 0.05;
    top: 0;
    left: 0;
    bottom: $home-inner-page-card-height;
    right: 0;
    position: absolute;
    z-index: -1;   
  }

  .main-container {
    height: calc(100vh - #{$header-height});
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;

    .top{
      display: flex;
      height: 100%;

      .ido-postelnik{
        flex: 2;
    
        .profile-image{
          height: calc(110px + 7vw);
          width: calc(110px + 7vw);
          border-radius: 50%;
          background-image: url(../assets/img/home/ido-postelnik-profile-image-zoom.jpg);
          background-size: cover;
          border: $light-grey 1px solid;
        }

        h1{
          font-size: calc(1rem + 3vw);
          font-weight: 600;
        }

        h2{
          font-size: calc(0.92rem + 0.8vw);
        }    

        h3{
          font-size: calc(1rem + 0.4vw);
          font-weight: 300;
        }    
      }
    
      .work-flow{
        display: none;
      }

      // 992px window width and more
      @include lg {
        .work-flow{
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          &-step{
            width: 100%;
            height: 150px;
            background-color: $white;
            border: 1px solid $dark-grey;
          }

        }
      }
    }

    .bottom{
      .about-me{
        background-image: $about-me;
      }

      .work-experience{
        background-image: $work-experience;
      }

      .skills-set{
        background-image: $skills-set;
      }

      .cv{
        background-image: $cv;
      }
    }
  }

  .sub-container{
    height: 300px;
    font-size: 2rem;
  }

  .footer-container{
    height: 300px;
    background: rgb(53,92,125);
    background: linear-gradient(180deg, rgba(53,92,125,1) 0%, rgba(108,91,123,1) 48%, rgba(192,108,132,1) 100%);
    border-bottom: 10px solid $dark-grey;
  }
}
</style>