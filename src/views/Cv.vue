<template>
  <div class="page cv">
    <page-layout :page="'cv'">
      <!-- header -->
      <h1 class="page-title m-b-20">CV</h1>
      
      <!-- <object data="https://ido-postelnik-cv.s3.us-east-2.amazonaws.com/Ido+Postelnik+-+FED+-+Resume.pdf" style="background: transparent url(https://cdn.dribbble.com/users/902865/screenshots/4814970/loading-opaque.gif) no-repeat center;" type="application/pdf" /> -->
      <embed src="https://ido-postelnik-cv.s3.us-east-2.amazonaws.com/IdoPostelnik-CV.pdf" type="application/pdf" class="cv-pdf flex layout-algin-start-center m-auto m-b-30"/>
<!-- <iframe src="https://ido-postelnik-cv.s3.us-east-2.amazonaws.com/Ido+Postelnik+-+FED+-+Resume.pdf&embedded=true" style="width:600px; height:500px;" frameborder="0"></iframe> -->
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/PageLayout.vue'

export default {
  name: 'cv',
  data: function () {
    return {

    }
  },
  components: {
    PageLayout
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .cv{
    .cv-pdf{
      width: 800px;
      height: 1100px;
    }
  }
</style>