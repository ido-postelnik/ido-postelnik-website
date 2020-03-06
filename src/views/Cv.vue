<template>
  <div class="page cv">
    <page-layout :page="'cv'">
      <!-- header -->
      <h1 class="page-title">CV</h1>

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

  }
</style>