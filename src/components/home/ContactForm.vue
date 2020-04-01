<template>
  <div class="contact-form flex column layout-align-start-center m-auto">
    <div class="flex row m-b-5">
      <img src="@/assets/icons/chat.svg" alt="chat" class="contact-icon m-r-5">
      <p class="contact-form-title">Contact</p>
    </div>

    <form @submit.prevent="submit" >
      <input type="text" name="name" v-model="name" placeholder="Name" required class="contact-form-input no-outline m-b-10">
      <input type="email" name="email" v-model="email" placeholder="Email" required class="contact-form-input no-outline  m-b-10">
      <textarea name="message" v-model="message" placeholder="Message" required class="contact-form-input contact-form-textarea no-outline  m-b-10"></textarea>
      <button type="submit" class="btn">Send</button>
      
      <div class="confirmation-message m-t-5">
        <p v-if="isSuccessfullySent === true">Thanks! Your message has been successfully sent</p>
        <p v-if="isSuccessfullySent === false">Hmm.. Message has not been sent. Please try again later</p>
      </div>
    </form>
  </div>
</template>

<script>
import * as $repoManager from '../../utils/repoManager';

export default {
  name: 'ContactForm',
  data: () => {
    return {
      name: null,
      email: null,
      message: null,
      isSuccessfullySent: null
    }
  },
  created() {
  },
  methods: {
    async submit() {
      this.isSuccessfullySent = null;
      if(this.name != null && this.email != null && this.message != null) {
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
    }
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
    .contact-form-title{

    }

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

  }
</style>
