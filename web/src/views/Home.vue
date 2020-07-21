<template>
  <div class="home">
    <ad-swiper />
    <nav-icons />
    <slot-card :card-data="cardData1">啊啊啊</slot-card>
    <slot-card :card-data="cardData2">不不不</slot-card>
  </div>
</template>

<script>
import AdSwiper from '@/components/home/AdSwiper.vue';
import NavIcons from '@/components/home/NavIcons.vue';
import SlotCard from '@/components/SlotCard.vue';

export default {
  name: 'Home',
  components: {
    AdSwiper,
    NavIcons,
    SlotCard
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