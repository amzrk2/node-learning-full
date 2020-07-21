<template>
  <div class="home">
    <ad-swiper />
    <nav-icons />
    <slot-list-card title="新闻资讯" icon="spirit xw" :card-data="newsData">
      <!-- 获取名为 list 的插槽上绑定的数据并决定显示这些数据的方式 -->
      <template v-slot:list="{ data }">
        <div
          class="news-line font-lg"
          v-for="(item, index) of data.list"
          :key="`list-item-${index}`"
        >
          <span class="news-tag color-grey">[{{ item.tag }}]</span>
          <span class="news-divid">|</span>
          <span class="news-title">{{ item.title }}</span>
          <span class="news-date font-sm color-grey">{{ item.date }}</span>
        </div>
      </template>
    </slot-list-card>
    <slot-list-card title="英雄列表" icon="spirit hero" :card-data="heroData"></slot-list-card>
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
      newsData: [
        {
          category: '热门',
          list: [
            {
              tag: '公告',
              title: '7月21日全服不停机更新公告',
              date: '07/20'
            },
            {
              tag: '活动',
              title: '这是一个活动，参与活动赢取礼物',
              date: '07/20'
            }
          ]
        },
        {
          category: '新闻',
          list: [
            {
              tag: '新闻',
              title: '游戏周年庆道具设计大赛现已开启！',
              date: '07/16'
            },
            {
              tag: '新闻',
              title: '某公司X某游戏 大手笔赠送上百个手办、永久皮肤！',
              date: '07/14'
            }
          ]
        },
        {
          category: '公告',
          list: [
            {
              tag: '公告',
              title: '7月21日部分安卓机型某技能显示异常问题说明',
              date: '07/21'
            },
            {
              tag: '公告',
              title: '【夏日重逢，召回好友】活动异常问题说明',
              date: '07/20'
            }
          ]
        }
      ]
    };
  }
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