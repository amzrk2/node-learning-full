<template>
  <slot-card :title="title" :icon="icon">
    <div class="card-nav text-center">
      <ul class="d-flex flex-j-between">
        <li
          v-for="(item, index) of cardData"
          :key="`tag-${index}`"
          :class="['nav-item', { active: index === curTag }]"
        >
          <a @click="handleSlideClick(index)">
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="card-content">
      <swiper class="card-swiper" ref="cardSwiper" @slide-change="handleSlideChange">
        <swiper-slide v-for="(item, index) of cardData" :key="`slide-${index}`">
          <!-- 将 item 数据绑定在名为 list 的插槽上 -->
          <slot name="list" :data="item"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </slot-card>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import SlotCard from '@/components/SlotCard.vue';

export default {
  name: 'SlotListCard',
  components: {
    Swiper,
    SwiperSlide,
    SlotCard,
  },
  directives: {
    swiper: directive,
  },
  props: {
    title: String, // 卡片标题
    icon: String, // 卡片图标
    cardData: Array, // 卡片数据
  },
  data() {
    return {
      curTag: 0,
    };
  },
  methods: {
    // 滑动切换
    handleSlideChange() {
      if (this.$refs.cardSwiper && this.$refs.cardSwiper.$swiper) {
        let index = this.$refs.cardSwiper.$swiper.activeIndex || 0;
        this.curTag = index;
      }
    },
    // 点击切换
    handleSlideClick(index) {
      if (this.$refs.cardSwiper && this.$refs.cardSwiper.$swiper) {
        this.$refs.cardSwiper.$swiper.slideTo(index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-nav {
  .nav-item {
    a {
      padding: 0.05rem 0;
      border-bottom: 3px solid transparent;
      cursor: pointer;
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
</style>