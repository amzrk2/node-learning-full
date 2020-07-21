<template>
  <div class="card color-bg-white">
    <div class="card-header font-xl d-flex flex-a-center">
      <i :class="cardData.icon"></i>
      <span>{{ cardData.title }}</span>
      <div class="flex-grow"></div>
      <i class="spirit dots"></i>
    </div>
    <div class="card-body">
      <div class="card-nav text-center">
        <ul class="d-flex flex-j-between">
          <li class="nav-item active">
            <a href="/link1">
              <span>链接1</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="/link2">
              <span>链接2</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="/link3">
              <span>链接3</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="card-content">
        <swiper class="card-swiper">
          <swiper-slide>1</swiper-slide>
          <swiper-slide>1</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
        </swiper>
      </div>
      <slot>卡片无内容</slot>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'SlotCard',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  /**
   * data: {
   *   title: 卡片标题
   *   icon: 卡片图标类
   * }
   */
  props: {
    cardData: {
      type: Object,
      required: true
    } // 卡片数据对象
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 0.3rem;
  margin-top: 0.25rem;

  // 卡片头
  .card-header {
    padding-bottom: 0.25rem;
    border-bottom: 1px solid map-get($colors, 'border');

    span {
      margin-left: 0.1rem;
    }
  }

  .card-body {
    margin-top: 0.25rem;
  }

  .card-nav {
    .nav-item {
      a {
        padding: 0.05rem 0;
        border-bottom: 3px solid transparent;
      }
      // active 选项高亮
      &.active a {
        padding: 0.05rem 0;
        color: map-get($colors, 'primary');
        border-bottom: 3px solid map-get($colors, 'primary');
      }
    }
  }

  .card-content {
    margin-top: 0.5rem;
  }
}
</style>