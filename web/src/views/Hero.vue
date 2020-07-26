<template>
  <div class="hero color-bg-bg">
    <top-bar />
    <div class="content"></div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';

export default {
  name: 'Hero',
  props: {
    id: String,
  },
  components: { TopBar },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 0.9rem;
}
</style>