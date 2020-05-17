<template>
  <footer class="flex row layout-align-center-space-around p-y-15" :class="{
      'sketch-mode': activeWorkFlowMode === workFlowModes.SKETCH.value,
      'wireframe-mode': activeWorkFlowMode === workFlowModes.WIREFRAME.value}">
    
    <!-- My details -->
    <div class="footer-section flex column layout-align-center-center p-y-15">
      <div class="m-auto">
        <div class="flex row m-b-10">
          <div class="footer-icon-container m-r-10">
            <img src="@/assets/icons/location.svg" alt="location" class="footer-icon">
          </div>
          <p>TLV, Israel</p>
        </div>
        <a :href="EMAIL.value" target="_blank" class="flex row m-b-10">
          <div class="footer-icon-container m-r-10">
            <img src="@/assets/icons/email.svg" alt="email" class="footer-icon">
          </div>
          <p>{{EMAIL.label}}</p>
        </a>
        <a :href="PHONE_NUMBER.value" class="flex row m-b-10">
          <div class="footer-icon-container m-r-10">
            <img src="@/assets/icons/phone.svg" alt="phone" class="footer-icon">
          </div>
          <p>{{PHONE_NUMBER.label}}</p>
        </a>
      </div>
    </div>

    <!-- Social -->
    <div class="footer-section social flex column layout-align-center-center p-y-15">
      <p class="m-b-15 social-title">Find me on</p>
      <div class="flex row layout-align-center-center">
        <a href="https://www.linkedin.com/in/ido-postelnik/" target="_blank" class="footer-icon-container m-r-10">
          <img src="@/assets/icons/linkedin.svg" alt="linkedin" class="footer-icon">
        </a>
        <a href="https://github.com/ido-postelnik" target="_blank" class="footer-icon-container m-r-10">
          <img src="@/assets/icons/github.svg" alt="github" class="footer-icon">
        </a>
        <a href="https://www.facebook.com/ido.postelnik" target="_blank" class="footer-icon-container m-r-10">
          <img src="@/assets/icons/facebook.svg" alt="facebook" class="footer-icon">
        </a>
        <a href="https://www.instagram.com/ido.postelnik/" target="_blank" class="footer-icon-container">
          <img src="@/assets/icons/instagram.svg" alt="instagram" class="footer-icon">
        </a>
      </div>
    </div>

    <!-- Contact form -->
    <div class="footer-section p-y-15">
      <contact-form></contact-form>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex';

import { WORK_FLOW_MODES, EMAIL, PHONE_NUMBER } from "@/utils/constants";
import ContactForm from './ContactForm.vue'

export default {
  name: 'ContactFooter',
  data: () => {
    return {
      workFlowModes: WORK_FLOW_MODES,
      EMAIL,
      PHONE_NUMBER
    };
  },
  components: {
    ContactForm
  },
  methods: {
  },
  computed: {
    ...mapState([
      'activeWorkFlowMode'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
  footer{
    height: 300px;
    background: rgb(73,121,127);
    background: linear-gradient(180deg, #546e7a 0%, #455a64 100%);
    border-bottom: 5px solid $dark-grey;
    color: $white;
    text-align: center;
    height: auto;
    flex-wrap: wrap;

    @include md {
      flex-wrap: nowrap;
    }

    .footer-section{
      width: 100%;
      min-height: 150px;

      &.social{
        width: 150px;
        border-top: 1px solid #789396;
        border-bottom: 1px solid #789396;

        @include md {

          width: 100%;
          border: 0;
        }
      }

      a{
        color: $white;
      }
    }

    .social-title{
      position: relative;

      &::after{
        content: "";
        position: absolute;
        bottom: -5px;
        left: 50%;
        width: 40px;
        margin-left: -20px;
        border-bottom: 1px solid $white;
      }
    }

    .footer-icon-container{
      width: 25px;

      .footer-icon{
        height: 22px; 
        filter: $filter-white;
      }
    }

    //Sketch mode
    &.sketch-mode{
      background: rgba($note-book-sketch, 0.5);
      color: $dark-grey;

      .footer-section{
        a{
          color: $dark-grey;
        }
      }

      .social-title{
        &::after{
          content: "";
          border-bottom: $dark-grey solid 2px;
        }
      }

      .footer-icon-container{
        .footer-icon{
          filter: none;
        }
      }
    }

    //Wireframe mode
    &.wireframe-mode{
      background: $light-grey !important;
      color: $dark-grey;

      .footer-section{
        a{
          color: $dark-grey;
        }
      }

      .social-title{
        &::after{
          content: "";
          border-bottom: $dark-grey solid 2px;
        }
      }

      .footer-icon-container{
        .footer-icon{
          filter: none;
        }
      }
    }
  }
</style>
