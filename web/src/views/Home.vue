<template>
  <div class="home">
    <ad-swiper />
    <nav-icons />
    <slot-list-card :card-data="cardData1"></slot-list-card>
    <slot-list-card :card-data="cardData2"></slot-list-card>
  </div>
</template>

<script>
import AdSwiper from '@/components/home/AdSwiper.vue';
import NavIcons from '@/components/home/NavIcons.vue';
import SlotListCard from '@/components/SlotListCard.vue';

export default {
  name: 'Home',
  components: {
    AdSwiper,
    NavIcons,
    SlotListCard
  },
  data() {
    return {
      cardData1: {
        title: '新闻资讯',
        icon: 'spirit xw'
      },
      cardData2: {
        title: '英雄列表',
        icon: 'spirit hero'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>