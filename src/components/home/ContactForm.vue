<template>
  <div class="contact-form flex column layout-align-start-center m-auto" :class="{
      'sketch-mode': activeWorkFlowMode === workFlowModes.SKETCH.value,
      'wireframe-mode': activeWorkFlowMode === workFlowModes.WIREFRAME.value}">
    <div class="flex row m-b-5">
      <img src="@/assets/icons/chat.svg" alt="chat" class="contact-icon m-r-5">
      <p class="contact-form-title">Contact</p>
    </div>

    <form @submit.prevent="submit" >
      <input type="text" name="name" v-model="name" placeholder="Name" required class="contact-form-input no-outline m-b-10">
      <input type="email" name="email" v-model="email" placeholder="Email" required class="contact-form-input no-outline  m-b-10">
      <textarea name="message" v-model="message" placeholder="Message" required class="contact-form-input contact-form-textarea no-outline  m-b-10"></textarea>
      <div>
        <button type="submit" class="btn">Send</button>
        <loader :scale="0.7" v-if="isBusy === true"></loader>
      </div>

      <div class="confirmation-message m-t-5">
        <p v-if="isSuccessfullySent === true">Thanks! Your message has been successfully sent</p>
        <p v-if="isSuccessfullySent === false">Hmm.. The message has not been sent. Please try again</p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Loader from '../shared/Loader.vue'

import { WORK_FLOW_MODES } from "@/utils/constants";
import * as $repoManager from '../../utils/repoManager';

export default {
  name: 'ContactForm',
  data: () => {
    return {
      workFlowModes: WORK_FLOW_MODES,
      name: null,
      email: null,
      message: null,
      isSuccessfullySent: null,
      isBusy: false
    }
  },
  components: {
    Loader
  },
  created() {
  },
  methods: {
    async submit() {
      this.isSuccessfullySent = null;
      this.isBusy = true;
      if(this.name != null && this.email != null && this.message != null) {
        try{
          let response = await $repoManager.contactMessage.post(this.name, this.email, this.message);
          
          if(response != null) {
            this.name = null;
            this.email = null;
            this.message = null;
            this.isSuccessfullySent = true;
          }
          else {
            this.isSuccessfullySent = false;
          }
        }
        catch(e) {
          this.isSuccessfullySent = false;
        }

        this.isBusy = false;
      }
    }
  },
  computed: {
    ...mapState([
      'activeWorkFlowMode'
    ])
  }
}
</script>

<style scoped lang="scss">
  .contact-form{
    max-width: 450px;
    width: 75%;

    .contact-icon{
      padding-bottom: 5px;
      height: 20px; 
      filter: $filter-white;
      box-sizing: content-box;
      border-bottom: 2px solid $black;
    }

    .contact-form-title{}

    .contact-form-input{
      width: 95%;
      border: 1px solid $light-grey;
      padding: 5px;
    }

    .contact-form-textarea{
      height: 60px;
    }

    .confirmation-message{
      font-size: 14px;
    }

    //Sketch mode
    &.sketch-mode{
      .contact-icon{
        filter: none;
      }

      .contact-form-input{
        background: $note-book-sketch;
        border: 1px solid #d1d1d2;
        border-radius: 5px;
      }

      .btn{
        background: $note-book-sketch;
        color: $dark-grey;
        border: 1px solid #d1d1d2;
      }
    }

    //Wireframe mode
    &.wireframe-mode{
      .contact-icon{
        filter: none;
      }

      .contact-form-input{
        border: 1px solid $light-grey-d;
        border-radius: 5px;
      }

      .btn{
        background: $white;
        color: $dark-grey;
        border: 1px solid $light-grey-d;
      }
    }
  }
</style>
