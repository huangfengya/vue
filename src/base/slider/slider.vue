<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="str in listImg">
        <a :href="str.linkUrl">
          <img :src="str.picUrl" alt="">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  props: ['listImg'],

  mounted() {
    this.lunbo()
  },

  methods: {
    lunbo() {
      /* eslint-disable no-unused-vars */
      var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        slidesPerView: 2,
        centeredSlides: true,
        coverflow: {
          rotate: 0,
          depth: 500
        },
        speed: 300,
        observer: true,
        // autoplay: 3000,
        loop: true,
        pagination: '.swiper-pagination',
        // autoplayDisableOnInteraction: false,
        paginationClickable: true
      })
    }
  }
}
</script>

<style lang="less">
.swiper-container {
  .swiper-wrapper {
    .swiper-slide {
      width: 100%;
      a {
        display: block;
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

