<template>
  <div class="article">
    <div class="article-info d-flex">
      <i class="spirit article-back" @click="goBack"></i>
      <h1 class="font-md">{{ articleData.title }}</h1>
      <span class="font-xs">{{ articleData.createdAt | date }}</span>
    </div>
    <div class="article-content font-xl">
      <div v-html="articleData.body"></div>
    </div>
    <div class="article-about">
      <div class="about-title">
        <img src="../assets/lin.png" />
        <h2>相关资讯</h2>
      </div>
      <div class="about-info">
        <router-link
          class="news-line font-lg"
          v-for="(item, index) of articleData.related"
          :key="`list-item-${index}`"
          :to="`/article/${item._id}`"
        >
          <span class="news-title">{{ item.title }}</span>
          <span class="news-date font-sm color-grey">{{ item.createdAt | date }}</span>
        </router-link>
      </div>
    </div>
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
        title: '正在加载文章信息',
        createdAt: '1970-01-01',
        body: '',
      },
    };
  },
  watch: {
    id() {
      this.fetchArticleData();
    },
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
  activated() {
    this.fetchArticleData();
  },
};
</script>

<style lang="scss" scoped>
.article {
  min-height: 100vh;
}

.article-info {
  height: 0.8rem;
  position: relative;
  border-bottom: 1px solid map-get($colors, 'grey');

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

.article-content {
  padding: 0 0.4rem;
  line-height: 2;

  ::v-deep img {
    max-width: 100%;
  }
}

.article-about {
  min-height: 5vh;

  .about-title {
    display: flex;
    align-items: center;
    margin-left: 0.45rem;
    margin-top: 1rem;

    img {
      display: block;
      width: 0.48rem;
      height: 0.48rem;
    }

    h2 {
      margin: 0;
      padding: 0.1rem;
      color: rgb(0, 112, 192);
      font-size: map-get($font-sizes, 'xl');
    }
  }
}

.about-info {
  margin: 0.2rem 0.45rem 0 0.45rem;
  padding-bottom: 1rem;

  a {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.2rem;
  }
}
</style>