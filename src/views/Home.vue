<template>
  <div class="home container">
    <div class="about-me item">
      <Title label="About Me"/>
      Content
    </div>
    <div class="experience-one item">
       <Title label="Work Experience"/>
    </div>
    <div class="experience-two item">
      <Title label="Work Experience"/>
    </div>
    <div class="experience-three item">
      
    </div>
    <div class="looking item">
      <Title label="What Am I Looking"/>
    </div>
    <div class="my-skills item">
      <Title label="My Skills"/>
    </div>
    <div class="cv item">
      <Title label="CV"/>
    </div>
    <div class="linkedin item">linkedin</div>
    <div class="github item">github</div>
    <div class="facebook item">facebook</div>
    <div class="instagram item">instagram</div>
    <div class="experience-three-img item">experience-three-img</div>
    <div class="lets-play item">
      <Title label="Let's Play"/>
    </div>
    <div class="email item">email</div>
    <div class="contact item">contact</div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Title from '@/components/home/Title.vue'

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
    Title
  }
}
</script>
