<template>
  <div class="article">
    <div class="article-info d-flex">
      <i class="spirit article-back" @click="goBack"></i>
      <h1 class="font-md">{{ articleData.title }}</h1>
      <span class="font-xs">{{ articleData.createdAt | date }}</span>
    </div>
    <div class="article-content"></div>
    <div class="article-about"></div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'Article',
  props: {
    id: String,
  },
  filters: {
    date(val) {
      if (val) {
        return dayjs(val).format('YYYY-MM-DD');
      } else {
        return '1970-01-01';
      }
    },
  },
  data() {
    return {
      articleData: {
        title: '',
        createdAt: '',
        body: '',
      },
    };
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },
    async fetchArticleData() {
      const res = await this.$http.get(`/article/${this.id}`);
      if (res.status === 200) {
        this.articleData = res.data;
      }
    },
  },
  mounted() {
    this.fetchArticleData();
  },
};
</script>

<style lang="scss" scoped>
.article {
  position: relative;
}

.article-info {
  height: 0.8rem;

  .article-back {
    position: absolute;
    width: 0.2rem;
    left: 0.2rem;
    top: 0;
    bottom: 0;
  }

  h1 {
    display: block;
    flex: 1 1 auto;
    margin: 0 0.2rem 0 0.65rem;
    line-height: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: block;
    flex: 0 0 auto;
    margin-right: 0.3rem;
    line-height: 0.8rem;
  }
}
</style>