<template>
  <div class="home">
    <div class="main-container">
      <!-- top part -->
      
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
        </div>

        <!-- work flow -->
        <div class="work-flow flex row layout-align-center-center">
          <div>A</div>
          <div>B</div>
          <div>C</div>
        </div>
      </div>
     
      <!-- bottom part -->
      <div class="bottom flex row layout-align-start-space-between">
        <inner-page-card class="about-me" label="About me"></inner-page-card>
        <inner-page-card class="work-experience" label="Work experience"></inner-page-card>
        <inner-page-card class="skills-set" label="Skills set"></inner-page-card>
        <inner-page-card class="cv" label="CV"></inner-page-card>
      </div>
    



      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    </div>
    <p> test </p>
  </div>
</template>

<script>
// @ is an alias to /src
import Separator from '@/components/shared/Separator.vue'
import InnerPageCard from '@/components/home/InnerPageCard.vue'

export default {
  name: 'home',
  data: function () {
    return {
      window: {
        width: 0
      }
    }
  },
    created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
    }
  },
  components: {
    Separator,
    InnerPageCard
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
    bottom: calc($home-page-btn-height + 10px);
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
          height: 200px;
          width: 200px;
          border-radius: 50%;
          background-image: url(../assets/img/home/ido-postelnik-profile-image.jpg);
          background-position: -50px -25px;
          background-size: 150%;
          border: $light-grey 1px solid;
        }

        h1{
          font-size: 5rem;
          font-weight: 600;
        }

        h2{
          font-size: 1.5rem;
        }    
      }
    
      .work-flow{
        flex: 1;
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

    // 992px window width and more
    @include md {

    }

  }
}
</style>