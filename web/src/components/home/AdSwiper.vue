<template>
  <swiper class="home-swiper" :options="swiperOptions">
    <swiper-slide>
      <img src="/mock/images/swiper.jpeg" />
    </swiper-slide>
    <swiper-slide>
      <img src="/mock/images/swiper.jpeg" />
    </swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <div class="home-swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'AdSwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        pagination: {
          el: '.home-swiper-pagination'
        },
        autoplay: false
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.home-swiper {
  height: 42.5vw;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .home-swiper-pagination {
    position: absolute;
    z-index: 10;
    text-align: right;
    bottom: 0.2rem;
    padding-right: 0.2rem;
    --swiper-theme-color: #{map-get($colors, 'swiper')};

    ::v-deep .swiper-pagination-bullet {
      border-radius: 25%;

      &:not(.swiper-pagination-bullet-active) {
        background-color: map-get($map: $colors, $key: 'white');
        opacity: 1;
      }
    }
  }
}
</style>