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
  data() {
    return {
      heroData: {},
    };
  },
  methods: {
    async fetchHeroData() {
      const res = await this.$http.get(`/hero/${this.id}`);
      if (res.status === 200) {
        this.heroData = res.data;
      }
    },
  },
  activated() {
    this.fetchHeroData();
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 0.9rem;
}
</style>