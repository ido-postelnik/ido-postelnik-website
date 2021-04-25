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
          title: 'Senior Front End Developer',
          workPlace: {
            name: 'Wix',
            href: 'https://wix.com/',
            timeFrame: '2020 - Present'
          },
          subtitle: `Wix is providing a world class web building platform to create personalized and professional websites.`,
          content: [
            `Developing new features used by millions of Wix users.`,
            `Managing and building projects from scratch to production.`,
            `Collaborating internationally with product managers, UX designers and BI analysts.`,
            `Improved feature development process by transitioning to agile workflow.`
          ],
          isExpanded: true
        },
        {
          title: 'Front-End Team Lead',
          workPlace: {
            name: 'Spot',
            href: 'https://spot.io/',
            timeFrame: '2019 - 2020'
          },
          subtitle: `Spot by NetApp (formerly Spotinst) is a SaaS for managing workloads and cloud infrastructure.`,
          content: [
            `Led a team of developers that develop and build the products’ UI platform.`, 
            `Led and managed new features and projects.`,
            `Collaborated with the product team to define and design new products and features.`
          ],
          isExpanded: false
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
          isExpanded: false
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
          isExpanded: false
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