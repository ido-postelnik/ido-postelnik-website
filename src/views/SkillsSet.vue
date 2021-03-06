<template>
  <div class="page skills-set">
    <page-layout :page="'skills-set'">
      <!-- header -->
      <div class="header-container m-auto">
        <h1 class="page-title m-b-20">{{ PAGES.SKILLS_SET.label }}</h1>
        <div class="flex row layout-align-center-center skills-set-view-options p-y-20">
          <img src="../assets/icons/boxes-icon.svg" class="icon clickable m-r-10" :class="{'active': activeViewOption === viewOptions.BOXES}" alt="boxes" height="20" @click="onViewOptionChanged(viewOptions.BOXES)"/>
          <p>|</p>
          <img src="../assets/icons/list-icon.svg" class="icon clickable m-l-10" :class="{'active': activeViewOption === viewOptions.LIST}" alt="list" height="20" @click="onViewOptionChanged(viewOptions.LIST)"/>
        </div>
      </div>

      <!-- content -->
      <div class="skills-container m-auto">

        <!-- Boxes view -->
        <div v-if="activeViewOption === viewOptions.BOXES" class="boxes-view">
          <div v-for="subject in skillsSet" :key="subject.title" class="m-b-20">
            <h2 class="m-b-10">{{ subject.title }}</h2>
            <div class="flex row layout-align-center-start boxes-view-content m-b-10">
              <skill-box 
                v-for="skill in subject.skills" :key="skill.title" 
                class="m-b-20 skill-box"
                :title="skill.title" 
                :imagePath="skill.imagePath">
              </skill-box>
            </div>
          </div>
        </div>

        <!-- List view -->
        <div v-if="activeViewOption === viewOptions.LIST" class="">
          <div class="list-view flex row layout-align-start-space-between">
            <!-- Table -->
            <div  class="table-container"> 
              <div class="table-container-height">
                <table>
                  <!-- table header -->
                  <tr class="header">
                    <th @click="sortTable('name')" class="name-column clickable">
                      <span>Name</span>
                      <span class="sort" :class="{'active-sort': currentSort === 'name', 'sort-direction': currentSortDirection === 'asc'}">
                        <img src="../assets/icons/chevron-up.svg" alt="sort" height="5" class="m-x-5 m-y-5"/>
                      </span> 
                    </th>
                    <th @click="sortTable('subject')" class="clickable">
                      <span>Field</span>
                      <span class="sort" :class="{'active-sort': currentSort === 'subject', 'sort-direction': currentSortDirection === 'asc'}">
                        <img src="../assets/icons/chevron-up.svg" alt="sort" height="5" class="m-x-5 m-y-5"/>
                      </span> 
                    </th>
                  </tr>
                  <!-- table body -->
                  <tbody v-if="filteredSkills.length > 0">
                    <tr v-for="skill in filteredSkills" :key="skill.name" class="m-y-10">
                      <td class="name-column flex row layout-align-center-start">
                        <div class="img-container inline-block">
                          <img :src="skill.imagePath"/> 
                        </div>              
                        <span class="m-l-10">{{skill.name}}</span>
                      </td>
                      <td>{{skill.subject}}</td>
                    </tr>
                  </tbody>

                  <!-- no matched result -->
                  <div v-if="filteredSkills.length === 0" class="no-result-found-container">
                    <div class="no-result-found">
                      <img src="../assets/img/other/no-result-found.png" alt="no-result-found">
                      <p>Sorry, No result found :/</p>
                    </div>
                  </div>
                </table>
              </div>

              <!-- Pagination -->
              <div v-if="pageCount > 0" class="flex row layout-align-center-end pagination p-t-5">
                <img src="../assets/icons/chevron-left.svg" alt="previous" height="10" 
                class="pagination-icon m-r-5" 
                :class="{'active': isPrevPageActive}"
                @click="prevPage"/>

                <ul class="flex row">
                  <li v-for="page in pageCount" :key="page" 
                  @click="jumpToPage(page)" 
                  class="page clickable"
                  :class="{'page-active': page - 1 === pageNumber}"> 
                    {{ page }}
                  </li>
                </ul>

                <img src="../assets/icons/chevron-right.svg" alt="next" height="10" 
                class="pagination-icon m-l-5" 
                :class="{'active': isNextPageActive}"
                @click="nextPage"/>
              </div>
            </div>

            <!-- Search input -->
            <div class="search-input-container m-b-10">
              <input type="text" name="filter" v-model="searchInput" placeholder="Search" class="search-input no-outline">
            </div>
          </div>
        </div>
         <!-- End of List view -->
      </div>

    </page-layout>
  </div>
</template>

<script>
import {_,NProgress} from '@/utils/utils';
import { PAGES } from "@/utils/constants";
import PageLayout from '@/components/PageLayout.vue';
import SkillBox from '@/components/skillsSet/SkillBox.vue';

const VIEW_OPTIONS = {
  BOXES: 'boxes',
  LIST: 'list'
};
const SKILLS_SET = [
  {
    title: 'Front-End',
    skills: [
      {
        title: 'VueJS',
        imagePath: require('@/assets/img/skills/frontend/vue.png')
      },
      {
        title: 'AngularJS',
        imagePath: require('@/assets/img/skills/frontend/angularjs.png')
      },
      {
        title: 'Angular',
        imagePath: require('@/assets/img/skills/frontend/angular.png')
      },
      {
        title: 'ReactJS',
        imagePath: require('@/assets/img/skills/frontend/react.png')
      },
      {
        title: 'TypeScript',
        imagePath: require('@/assets/img/skills/frontend/typescript.png')
      },
      {
        title: 'SCSS',
        imagePath: require('@/assets/img/skills/frontend/sass.png')
      },
      {
        title: 'PWA',
        imagePath: require('@/assets/img/skills/frontend/pwa.png')
      },
      {
        title: 'Flutter',
        imagePath: require('@/assets/img/skills/frontend/flutter.png')
      },
      {
        title: 'GraphQL',
        imagePath: require('@/assets/img/skills/frontend/graphql.png')
      },
      {
        title: 'Jest',
        imagePath: require('@/assets/img/skills/frontend/jest.png')
      },
      {
        title: 'Puppeteer',
        imagePath: require('@/assets/img/skills/frontend/puppeteer.png')
      },
    ]
  },
  {
    title: 'Back-End',
    skills: [
      {
        title: 'NodeJs',
        imagePath: require('@/assets/img/skills/backend/nodejs.png')
      },
      {
        title: 'Express',
        imagePath: require('@/assets/img/skills/backend/express.png')
      },
      {
        title: 'KoaJs',
        imagePath: require('@/assets/img/skills/backend/koajs.png')
      },
      {
        title: 'MongoDB',
        imagePath: require('@/assets/img/skills/backend/mongodb.png')
      },
      {
        title: 'MySQL',
        imagePath: require('@/assets/img/skills/backend/mysql.png')
      },
      {
        title: 'Firebase',
        imagePath: require('@/assets/img/skills/backend/firebase.png')
      }
    ]
  },
  {
    title: 'Cloud & CI/CD',
    skills: [
      {
        title: 'AWS',
        imagePath: require('@/assets/img/skills/cloud/aws.png')
      },
      {
        title: 'GCP',
        imagePath: require('@/assets/img/skills/cloud/gcp.png')
      },
      {
        title: 'Kubernetes',
        imagePath: require('@/assets/img/skills/cloud/kubernetes.png')
      },
      {
        title: 'Docker',
        imagePath: require('@/assets/img/skills/cloud/docker.png')
      },
      {
        title: 'Jenkins',
        imagePath: require('@/assets/img/skills/cloud/jenkins.png')
      }
    ]
  },
  {
    title: 'UX & Prototype',
    skills: [
      {
        title: 'Sketch',
        imagePath: require('@/assets/img/skills/ux/sketch.png')
      },
      {
        title: 'Zeplin',
        imagePath: require('@/assets/img/skills/ux/zeplin.png')
      },
      {
        title: 'Adobe XD',
        imagePath: require('@/assets/img/skills/ux/xd.png')
      },
      {
        title: 'Illustrator',
        imagePath: require('@/assets/img/skills/ux/illustrator.png')
      },
      {
        title: 'Figma',
        imagePath: require('@/assets/img/skills/ux/figma.png')
      },
      {
        title: 'Balsamiq',
        imagePath: require('@/assets/img/skills/ux/balsamiq.png')
      },
      {
        title: 'Invision',
        imagePath: require('@/assets/img/skills/ux/invision.png')
      }
    ]
  },
  {
    title: 'Design',
    skills: [
      {
        title: 'Photoshop',
        imagePath: require('@/assets/img/skills/design/photoshop.png')
      },
      {
        title: 'Premiere',
        imagePath: require('@/assets/img/skills/design/premiere.png')
      },
      {
        title: 'After Effects',
        imagePath: require('@/assets/img/skills/design/after-effects.png')
      }
    ]
  },
  {
    title: 'Project / Product Management',
    skills: [
      {
        title: 'Jira',
        imagePath: require('@/assets/img/skills/projectManagement/jira.png')
      },
      {
        title: 'Asana',
        imagePath: require('@/assets/img/skills/projectManagement/asana.png')
      },
      {
        title: 'Monday',
        imagePath: require('@/assets/img/skills/projectManagement/monday.png')
      },
      {
        title: 'Trello',
        imagePath: require('@/assets/img/skills/projectManagement/trello.png')
      }
    ]
  },
  {
    title: 'Agile Methods',
    skills: [
      {
        title: 'Scrum',
        imagePath: require('@/assets/img/skills/agileMethods/scrum.png')
      },
      {
        title: 'Kanban',
        imagePath: require('@/assets/img/skills/agileMethods/kanban.png')
      }
    ]
  },
];

export default {
  name: 'skillsSet',
  data: function () {
    return {
      PAGES,
      skillsSet: SKILLS_SET,

      // view options
      viewOptions: VIEW_OPTIONS,
      activeViewOption: VIEW_OPTIONS.BOXES,

      // list view
      skillsSetByList: [],
      searchInput: '',

      // Pagination
      pageNumber: 0,
      itemsPerPage: 10,
      isPrevPageActive: false,
      isNextPageActive: true,

      // Sorting
      currentSort: 'name',
      currentSortDirection: 'asc'
    }
  },
  components: {
    PageLayout,
    SkillBox
  },
  mounted() {
    // Show NProgress while images are loading
    NProgress.start();

    let imgs = document.images;
    let len = imgs.length;
    let counter = 0;

    [].forEach.call(imgs, function(img) {
      if(img.complete) {
        incrementCounter();
      }
      else {
        img.addEventListener('load', incrementCounter, false);
      }
    });

    function incrementCounter() {
      counter++;
      if(counter === len) {
        NProgress.done();
      }
    }
  },
  created() {
    this.skillsSetByList = this.prepareSkillsSetToListView(this.skillsSet);
  },
  methods: {
    prepareSkillsSetToListView(skillsSet) {
      let retVal = [];
      let skillItem;

      _.forEach(skillsSet, (subject) => {
        _.forEach(subject.skills, (skill) => {
          skillItem = {
            name: skill.title,
            imagePath: skill.imagePath,
            subject: subject.title
          };

          retVal.push(skillItem);
        });
      });

      retVal = _.orderBy(retVal, this.currentSort, this.currentSortDirection);

      return retVal;
    },
    onViewOptionChanged(viewOption) {
      this.activeViewOption = viewOption;

      // gtag event
      this.$gtag.event('viewOptionChanged', {
        'event_category': 'skillsSet',
        'event_label': viewOption
      })

    },
    //#region Pagination
      jumpToPage(page) {
        this.pageNumber = page - 1;
      },
      nextPage(){
        if(this.pageNumber + 1 < this.pageCount) {
          this.pageNumber++;
        }
      },
      prevPage(){
        if(this.pageNumber > 0) {
          this.pageNumber--;
        }
      },
    //#endregion
    
    //#region Sorting
      sortTable(column) {
        if(this.currentSort === column) {
          this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
        }
        else {
          this.currentSort = column;
          this.currentSortDirection = 'asc';
        }
      }
    //#endregion
  },
  computed: {
    filteredSkills() {
      let retVal = this.skillsSetByList;

      // Sorting
       retVal = _.orderBy(this.skillsSetByList, this.currentSort, this.currentSortDirection);

      // Search input
      if(this.searchInput != '') {
        retVal = _.filter(retVal, (skill) => {
          let isSubStringIncludesInSkillName = _.includes(_.lowerCase(skill.name), _.lowerCase(this.searchInput));
          let isSubStringIncludesInSubjectName = _.includes(_.lowerCase(skill.subject), _.lowerCase(this.searchInput));

          let isSubStringIncludes = isSubStringIncludesInSkillName || isSubStringIncludesInSubjectName;

          return isSubStringIncludes;
        })

        this.pageNumber = 0; // eslint-disable-line
      }

      this.filteredSkillsSize = _.size(retVal); // eslint-disable-line
      
      // Pagination
      if(this.pageCount === 1){
        this.isPrevPageActive = false; // eslint-disable-line
        this.isNextPageActive = false; // eslint-disable-line
      }

      let start = this.pageNumber * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      retVal = retVal.slice(start, end);

      return retVal;
    },
    pageCount(){
      let retVal = calcPagesNumber(this.filteredSkillsSize, this.itemsPerPage);

      if(this.searchInput !== '') {
        retVal = calcPagesNumber(this.filteredSkillsSize, this.itemsPerPage);
      }
      else {
        this.pageNumber = 0; // eslint-disable-line
      }

      return retVal;
    }
  },
  watch: {
    pageNumber() {
      if(this.pageNumber === 0) {
          this.isPrevPageActive = false;
          this.isNextPageActive = true;
        }
      else if(this.pageNumber === this.pageCount - 1){
        this.isPrevPageActive = true;
        this.isNextPageActive = false;
      }
      else if(this.pageCount === 1){
        this.isPrevPageActive = false;
        this.isNextPageActive = false;
      }
      else {
        this.isPrevPageActive = true;
        this.isNextPageActive = true;
      }
    }
  }
}

function calcPagesNumber(filteredSkillsSize, itemsPerPage) {
  let l = filteredSkillsSize;
  let s = itemsPerPage;

  let retVal = Math.ceil(l/s);

  return retVal;
}
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";

  .skills-set{
    .header-container{
      position: relative;
      width: 80%;

      .skills-set-view-options{
        position: absolute;
        top: 0;
        right: 0;

        .icon{
          filter: $filter-light-grey;

          &.active{
            filter: none;
          }
        }
      }
    }

    .skills-container{
      width: 80%;

      .boxes-view{
        h2{
          font-size: calc(1.0rem + 0.3vw);
          font-weight: 500;
          color: $dark-grey-d;
        }
        
        .boxes-view-content{
          flex-wrap: wrap;
          gap: 12px;
        }
      }

      .list-view{
        flex-direction: column-reverse;

        @include md {
          flex-direction: row;
        }

        .table-container{
          margin-right: 0;
          flex:5;

          @include md {
            margin-right: 40px;
          }

          .table-container-height{
            height: 420px;
            overflow: auto;
            text-align: left;
            position: relative;

            .no-result-found-container{
              position: absolute;
              top: calc(50% - 70px);
              left: calc(50% - 150px);

              .no-result-found{
                width: 300px;
                height: 140px;
                text-align: center;

                img{
                  width: 160px;
                  height: auto;
                }
              }
            }
          }
          
          table{
            min-width: 100%;
          }

          tr{
            height: 35px;
            max-height: 35px;
          }

          .header{
            font-weight: 500;
            height: 25px;

            th{
              border-bottom: 1px solid $dark-grey;
              width: 50%;
              min-width: 145px;
            }

            .sort{
              display: none;

              &.active-sort{
                display: inline-block;
              }

              &.sort-direction{
                transform: rotate(180deg);
              }
            }
          }

          .name-column{
            padding-right: 15px;

            @include md {
              padding-right: 5px;
            }
          }

          td{
            max-height: 35px;
            color: $dark-grey-l;

            .img-container{
              width: 40px;
              text-align: center;

              img{
                display: inline-block;
                max-width: 50px;
                max-height: 25px;
                width: auto;
                height: auto;
              }
            }

          }

          .pagination{
            border-top: 1px solid $light-grey;
            
            .pagination-icon{
              filter: $filter-light-grey;
              
              &.active{
                filter: $filter-dark-blue-grey;
                cursor: pointer;
              }
            }

            ul{
              .page{
                  text-align: center;
                  font-size: 14px;
                  line-height: 21px;
                  margin-left: 4px;
                  margin-right: 4px;

                &-active{
                  color: $green-l;
                  font-weight: 600;
                  cursor: default !important;
                  text-decoration: underline;
                }
              }
            }
          }
        }

        .search-input-container{
          flex: 2;
          width: 90%;

          .search-input{
            width: 100%;
            border-radius: 25px;
            border: 1px solid $light-grey;
            padding: 5px;
          }
        }

      }
    }
  }
</style>