import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// pages
import AboutMe from './views/AboutMe.vue'
import WorkExperience from './views/WorkExperience.vue'
import SkillsSet from './views/SkillsSet.vue'
import Cv from './views/Cv.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/about-me',
      name: 'aboutMe',
      component: AboutMe
    },
    {
      path: '/work-experience',
      name: 'workExperience',
      component: WorkExperience
    },
    {
      path: '/skills-set',
      name: 'skillsSet',
      component: SkillsSet
    },
    {
      path: '/cv',
      name: 'cv',
      component: Cv
    },
    {
      // catch all 404
      path: "*",
      component: () => import("./views/404.vue")
      }
  ]
})
