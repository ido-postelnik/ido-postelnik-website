<template>
  <div class="page cv">
    <page-layout :page="'cv'">
      <!-- header -->
      <h1 class="page-title m-b-20">CV</h1>
      
      <embed src="https://ido-postelnik-cv.s3.us-east-2.amazonaws.com/IdoPostelnik-CV.pdf" type="application/pdf" class="cv-pdf flex layout-algin-start-center m-auto m-b-30"/>
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