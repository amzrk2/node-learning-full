<template>
  <div>
    <top-bar />
    <nav-bar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'Main',
  components: { TopBar, NavBar }
};
</script>

<style lang="scss" scoped>
</style>