<template>
  <footer class="flex row layout-align-center-space-around">
    <!-- My details -->
    <div class="flex column layout-align-start-space-between footer-section">
      <div class="m-auto">
        <div class="flex row m-b-10">
          <div class="footer-icon-container m-r-10">
            <img src="@/assets/icons/location.svg" alt="location" class="footer-icon">
          </div>
          <p>TLV, Israel</p>
        </div>
        <div class="flex row m-b-10">
          <div class="footer-icon-container m-r-10">
            <img src="@/assets/icons/phone.svg" alt="phone" class="footer-icon">
          </div>
          <p>+972-54-8080474</p>
        </div>
        <div class="flex row">
          <div class="footer-icon-container m-r-10">
            <img src="@/assets/icons/email.svg" alt="email" class="footer-icon">
          </div>
          <p>Postelnik@gmail.com</p>
        </div>
      </div>
    </div>

    <!-- Social -->
    <div class="flex column layout-align-center-center footer-section">
      <p class="m-b-15 social-title">Find me on</p>
      <div class="flex row layout-align-center-center">
        <div class="footer-icon-container m-r-10">
          <img src="@/assets/icons/linkedin.svg" alt="linkedin" class="footer-icon">
        </div>
        <div class="footer-icon-container m-r-10">
          <img src="@/assets/icons/github.svg" alt="github" class="footer-icon">
        </div>
        <div class="footer-icon-container m-r-10">
          <img src="@/assets/icons/facebook.svg" alt="facebook" class="footer-icon">
        </div>
        <div class="footer-icon-container">
          <img src="@/assets/icons/instagram.svg" alt="instagram" class="footer-icon">
        </div>
      </div>
    </div>

    <!-- Contact form -->
    <div class="footer-section">
      <contact-form></contact-form>
    </div>
  </footer>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'

export default {
  name: 'ContactFooter',
  components: {
    ContactForm
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  footer{
    height: 300px;
    background: rgb(53,92,125);
    background: linear-gradient(180deg, rgba(53,92,125,1) 0%, rgba(108,91,123,1) 48%, rgba(192,108,132,1) 100%);
    border-bottom: 5px solid $dark-grey;
    color: $white;
    text-align: center;

    .footer-section{
      width: 30%;
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
        border-bottom: $white solid 2px;
      }
    }

    .footer-icon-container{
      width: 25px;

      .footer-icon{
        height: 22px; 
        filter: $filter-white;
      }
    }
  }
</style>
