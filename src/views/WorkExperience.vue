<template>
  <div class="page work-experience">
    <page-layout :page="'work-experience'">
      <!-- header -->
      <h1 class="page-title m-b-20">{{ PAGES.WORK_EXPERIENCE.label }}</h1>

      <!-- content -->
      <div class="">
        <expandable-text-box v-for="box in content" :key="box.title" class="m-b-15"
          :title="box.title" 
          :workPlace="box.workPlace"
          :timeFrame="box.timeFrame"
          :subtitle="box.subtitle"
          :content="box.content"
          :isExpanded="box.isExpanded">
        </expandable-text-box>
      </div>

    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/PageLayout.vue';
import ExpandableTextBox from '@/components/shared/ExpandableTextBox.vue';
import { PAGES } from "@/utils/constants";

export default {
  name: 'workExperience',
  data: function () {
    return {
      PAGES,
      content: [
        {
          title: 'Front-End Team Leader',
          workPlace: {
            name: 'Spot',
            href: 'https://spot.io/',
            timeFrame: '2019 - Current'
          },
          subtitle: `Spot (formerly Spotinst) is a SaaS for managing workloads and cloud infrastructure.`,
          content: [
            `Leading a team of developers that develop and build the products’ UI platform.`, 
            `Leading and managing new features and projects.`,
            `Collaborating with the product team to define and design new products and features.`
          ],
          isExpanded: true
        },
        {
          title: 'Front-End Developer',
          workPlace: {
            name: 'Spot',
            href: 'https://spot.io/',
            timeFrame: '2018 - 2019'
          },
          content: [
            `Managed the front-end and product aspects in my scrum team.`, 
            `Developed features for the UI console that presents dashboards, charts and on-boarding processes.`, 
            `Built the backend-UI for the server side.`,
          ],
          isExpanded: true
        },
        {
          title: 'Front-End Developer & UX/UI Designer',
          workPlace: {
            name: 'PlayerMaker',
            href: 'https://playermaker.com/',
            timeFrame: '2016 - 2018'
          },
          subtitle: `PlayerMaker uses a smart motion sensor to capture football players movement and performance.`, 
          content: [
            `Built the product’s console from scratch. The console included tables, charts and special UI elements.`, 
            `Worked closely with the product team to prototype and define the product.`,
            `Built wireframes, graphical designs and interactive moquaps.`
          ],
          isExpanded: true
        }
      ]
    }
  },
  components: {
    PageLayout,
    ExpandableTextBox
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