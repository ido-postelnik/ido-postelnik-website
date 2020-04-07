<template>
  <div class="page cv">
    <page-layout :page="'cv'">
      <!-- header -->
      <div class="header-container m-auto">
        <h1 class="page-title m-b-20">{{ PAGES.CV.label }}</h1>
        <div class="flex row layout-align-center-center cv-download-button p-y-20">
          <!-- <button class="btn" @click="onDownloadClick">Download</button> -->
        </div>
      </div>
      
      <embed :src="cvFileLocation" type="application/pdf" class="cv-pdf flex layout-algin-start-center m-auto m-b-30"/>
    </page-layout>
  </div>
</template>

<script>
import { PAGES } from "@/utils/constants";
import PageLayout from '@/components/PageLayout.vue';

export default {
  name: 'cv',
  data: function () {
    return {
      PAGES,
      cvFileLocation: 'https://ido-postelnik-cv.s3.us-east-2.amazonaws.com/IdoPostelnik-CV.pdf'
    }
  },
  components: {
    PageLayout
  },
  created() {
  },
  methods: {
    onDownloadClick() {
      //
    }
  }
}
</script>

<style scoped lang="scss">
  .cv{
    
    .header-container{
      position: relative;
      width: 80%;

      .cv-download-button{
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .cv-pdf{
      width: 80%;
      height: 1200px;
    }
  }
</style>