<template>
  <div class="page skills-set">
    <page-layout :page="'skills-set'">
      <!-- header -->
      <h1 class="page-title m-b-20">Skills set</h1>

      <!-- content -->
      <div class="flex row layout-align-center-start skills-set-content m-auto">
        <skill-box v-for="box in content" :key="box.title" class="m-b-30 skill-box m-r-10"
        :title="box.title" 
        :imagePath="box.imagePath"></skill-box>
      </div>

    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/PageLayout.vue'
import SkillBox from '@/components/shared/SkillBox.vue'

export default {
  name: 'skillsSet',
  data: function () {
    return {
      content: [
        {
          title: 'VueJS',
          imagePath: require('@/assets/img/skills/tech/vue.png')
        },
        {
          title: 'AngularJS',
          imagePath: require('@/assets/img/skills/tech/angularjs.png')
        },
        {
          title: 'Angular',
          imagePath: require('@/assets/img/skills/tech/angular.png')
        },
        {
          title: 'ReactJS',
          imagePath: require('@/assets/img/skills/tech/react.png')
        },
        {
          title: 'SCSS',
          imagePath: require('@/assets/img/skills/tech/sass.png')
        },
        {
          title: 'NodeJs',
          imagePath: require('@/assets/img/skills/tech/nodejs.png')
        },
        {
          title: 'Express',
          imagePath: require('@/assets/img/skills/tech/express.png')
        },
                {
          title: 'KoaJs',
          imagePath: require('@/assets/img/skills/tech/koajs.png')
        }
      ]
    }
  },
  components: {
    PageLayout,
    SkillBox
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .skills-set{
    
    &-content{
      width: 80%;
      flex-wrap: wrap;
    }

    .skill-box{

    }
  }
</style>