<template>
  <div class="home">
    <ad-swiper />
    <nav-icons />
  </div>
</template>

<script>
import AdSwiper from '@/components/home/AdSwiper.vue';
import NavIcons from '@/components/home/NavIcons.vue';

export default {
  name: 'Home',
  components: {
    AdSwiper,
    NavIcons
  }
};
</script>

<style lang="scss" scoped>
</style>