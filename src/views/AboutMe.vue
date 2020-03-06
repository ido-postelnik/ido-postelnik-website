<template>
  <div class="page about-me">
    <page-layout :page="'about-me'">
      <!-- header -->
      <h1 class="page-title">About me</h1>

      <!-- content -->
      <div class="">
        <h1>Here might be a page content</h1>
      </div>
  
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/PageLayout.vue'

export default {
  name: 'aboutMe',
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
  .about-me{

  }
</style>