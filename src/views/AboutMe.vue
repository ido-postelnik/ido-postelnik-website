<template>
  <div class="page about-me">
    <page-layout :page="'about-me'">
      <!-- header -->
      <h1 class="page-title m-b-20">About me</h1>

      <!-- content -->
      <div class="">
        <text-box v-for="box in content" :key="box.title" class="m-b-30"
        :title="box.title" 
        :content="box.content"></text-box>
      </div>
  
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/PageLayout.vue'
import TextBox from '@/components/shared/TextBox.vue'

export default {
  name: 'aboutMe',
  data: function () {
    return {
      content: [
        {
          title: 'Well, hello there',
          content: ['a', 'b', 'c']
        },
        {
          title: 'Well, hello there 2',
          content: ['a', 'b', 'c']
        },
        {
          title: 'Well, hello there 3',
          content: ['a', 'b', 'c']
        },
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
  .about-me{

  }
</style>