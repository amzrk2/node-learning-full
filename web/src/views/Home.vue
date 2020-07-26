<template>
  <div class="home">
    <ad-swiper />
    <nav-icons />
    <slot-list-card title="新闻资讯" icon="spirit xw" :card-data="newsData">
      <!-- 获取名为 list 的插槽上绑定的数据并决定显示这些数据的方式 -->
      <template v-slot:list="{ data }">
        <div
          class="news-line font-lg"
          v-for="(item, index) of data.newsList"
          :key="`list-item-${index}`"
        >
          <span class="news-tag color-grey">[{{ item.category.name }}]</span>
          <span class="news-divid">|</span>
          <span class="news-title">{{ item.title }}</span>
          <span class="news-date font-sm color-grey">{{ item.createdAt | date }}</span>
        </div>
      </template>
    </slot-list-card>
    <slot-list-card title="英雄列表" icon="spirit hero"></slot-list-card>
  </div>
</template>

<script>
import AdSwiper from '@/components/home/AdSwiper.vue';
import NavIcons from '@/components/home/NavIcons.vue';
import SlotListCard from '@/components/SlotListCard.vue';
import dayjs from 'dayjs';

export default {
  name: 'Home',
  components: {
    AdSwiper,
    NavIcons,
    SlotListCard,
  },
  data() {
    return {
      newsData: [],
    };
  },
  filters: {
    date(val) {
      if (val) {
        return dayjs(val).format('MM/DD');
      } else {
        return '00/00';
      }
    },
  },
  methods: {
    async fetchNewsData() {
      const res = await this.$http.get('/news/list');
      if (res.status === 200) {
        const data = res.data;
        // 非热门分类统一设置分类显示名
        data.forEach((cat) => {
          if (cat.name !== '热门') {
            cat.newsList.forEach((article) => {
              article.category = {};
              article.category.name = cat.name;
            });
          }
        });
        // 确保顺序显示，理论上应由后端给出最新数据
        data.forEach((cat) => {
          cat.newsList.sort((a, b) => {
            let dateA = new Date(a.createdAt).getTime();
            let dateB = new Date(b.createdAt).getTime();
            // 大到小排列
            if (dateA < dateB) {
              return 1;
            } else if (dateA > dateB) {
              return -1;
            } else {
              return 0;
            }
          });
        });
        this.newsData = data;
      }
    },
  },
  mounted() {
    this.fetchNewsData();
  },
};
</script>

<style lang="scss" scoped>
.news-line {
  display: flex;

  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }

  .news-tag {
    flex: 0 0 auto;
  }
  .news-divid {
    flex: 0 0 auto;
    margin: 0 0.1rem;
  }
  .news-title {
    flex: 1 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .news-date {
    flex: 0 0 auto;
    margin-left: 0.2rem;
  }
}
</style>