<template>
  <div class="page about-me">
    <page-layout :page="'about-me'">
      <!-- header -->
      <h1 class="page-title m-b-20">{{ PAGES.ABOUT_ME.label }}</h1>

      <!-- content -->
      <div class="">
        <expandable-text-box v-for="box in content" :key="box.title" class="m-b-15"
          :title="box.title" 
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
  name: 'aboutMe',
  data: function () {
    return {
      PAGES,
      content: [
        {
          title: `TL;DR`,
          content: [
            `Being a Front-End Team Leader and a Developer, my main goal is understanding the user’s needs, and therefore I persist on an easy-to-use yet beautiful User Experience.`,
            `My colleagues would attest that I am a Tech enthusiast and that I always keep up to date with the Front-End world.`,
            `I never take things as granted. I try to enrich and motivate my co-workers to achieve great results.`
          ],
          isExpanded: true
        },
        {
          title: `Team Leader`,
          content: [
            `Leading and managing a Front End Engineering team, I have learned to translate the product’s needs into action items that guide my team and make the daily routine efficient and effective.`, 
            `Having a deep understanding of the company goals is one of my main principles, therefore I create a sense of ownership and commitment within my team.`, 
            `Another key principle for me is communication. Maintaining a good relationship with my team by expressing difficulties and opinions, is essential for having a successful and strong team.`,
            `As a manager, being open to criticism and able to accept other points of view is what helps me grow and achieve better results.`
          ],
          isExpanded: true
        },
        {
          title: `Engineer`,
          content: [
            `As a developer and an engineer I always seek the best practices and best solutions. I am creative and I think outside of the box, which helps me in problem solving.`, 
            `Taking ownership over projects and tasks comes natural to me, and I approach them with full transparency.`, 
            `I am a team player - I advise and support my colleagues, as well as reach out to them for help. This cooperation moves the team towards its desired goals.`
          ],
          isExpanded: true
        },
        {
          title: `Front-End and I`,
          content: [
            `The Front-End world has always intrigued me. Whether developing dashboards and apps or prototyping features, deep understanding of the user is what drives me to make beautiful user interfaces.`,
            `True for every R&D field, but, I believe, especially in Front-End, keeping up to date with new technologies is extremely important. I take online courses, read articles, listen to podcasts, participate in meetups and basically try to satisfy my curiosity in every way possible.`,
            `Working closely with Product and Back-End teams, requires me to have opinions on UX/UI approaches, as well as a solid knowledge on defining APIs, Databases and CI/CD procedures.`
          ],
          isExpanded: true
        },
        {
          title: `Always on the lookout for`,
          content: [
            `A place that pushes me to my limit and takes the best out of me.`,
            `A place where I can be creative, have my opinion and impact the team and the product with my ideas and presence.`,
            `A place with awesome people that I can learn new things from, in order to become a better developer and a better person.`
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
  .about-me{

  }
</style>