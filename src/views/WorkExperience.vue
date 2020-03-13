<template>
  <div class="page work-experience">
    <page-layout :page="'work-experience'">
      <!-- header -->
      <h1 class="page-title m-b-20">Work experience</h1>

      <!-- content -->
      <div class="">
        <text-box v-for="box in content" :key="box.title" class="m-b-30"
        :title="box.title" 
        :workPlace="box.workPlace"
        :timeFrame="box.timeFrame"
        :content="box.content"></text-box>
      </div>

    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/PageLayout.vue'
import TextBox from '@/components/shared/TextBox.vue'

export default {
  name: 'workExperience',
  data: function () {
    return {
      content: [
        {
          title: 'Front end Team leader',
          workPlace: {
            name: 'Spotinst',
            website: 'https://spotinst.com/'
            },
          timeFrame: 'Jan 2020 - Current',
          content: ['a', 'b', 'c']
        }
      ]
    }
  },
  components: {
    PageLayout,
    TextBox
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .work-experience{

  }
</style>