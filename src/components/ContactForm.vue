<template>
  <div class="contact-form flex column layout-align-start-center m-auto">
    <div class="flex row m-b-5">
      <img src="@/assets/icons/chat.svg" alt="chat" class="contact-icon m-r-5">
      <p class="contact-form-title">Contact</p>
    </div>

    <form @submit.prevent="submit" >
      <input type="text" name="name" v-model="name" placeholder="Name" class="contact-form-input no-outline m-b-10">
      <input type="email" name="email" v-model="email" placeholder="Email" class="contact-form-input no-outline  m-b-10">
      <textarea name="message" v-model="message" placeholder="Message" class="contact-form-input contact-form-textarea no-outline  m-b-10"></textarea>
      <button type="submit" class="btn">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  data: () => {
    return {
      name: null,
      email: null,
      message: null
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .contact-form{
    min-width: 200px;
    width:60%;

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
      width: 100%;
      border: 1px solid $light-grey;
      padding: 5px;
    }

    .contact-form-textarea{
      height: 60px;
    }
  }
</style>
