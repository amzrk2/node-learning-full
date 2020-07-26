<template>
  <div class="hero color-bg-bg">
    <top-bar />
    <div class="content">
      <div class="banner">
        <span class="title font-sm">{{ heroData.title }}</span>
        <span class="name font-xxl">{{ heroData.name }}</span>
        <span class="categories font-sm">{{ heroData.categories }}</span>
        <div class="scores font-sm">
          <span class="difficult">
            难度
            <i>{{ heroData.scores.difficult }}</i>
          </span>
          <span class="skills">
            技能
            <i>{{ heroData.scores.skills }}</i>
          </span>
          <span class="attack">
            攻击
            <i>{{ heroData.scores.attack }}</i>
          </span>
          <span class="survive">
            生存
            <i>{{ heroData.scores.survive }}</i>
          </span>
        </div>
      </div>
      <div class="skills">
        <div class="skill-tab">
          <div
            :class="['skill-icon', { active: index === activeSkill }]"
            v-for="(item, index) of heroData.skills"
            :key="`icon-${item._id}`"
            @click="activeSkill = index"
          >
            <img :src="item.icon" />
          </div>
        </div>
        <div
          class="skill-content"
          v-show="index === activeSkill"
          v-for="(item, index) of heroData.skills"
          :key="`content-${item._id}`"
        >
          <span class="skill-name">{{ item.name }}</span>
          <span class="skill-des">{{ item.description }}</span>
          <span class="skill-tips">小提示：{{ item.tips }}</span>
        </div>
      </div>
      <div class="items">
        <span class="font-xl">顺风出装</span>
        <div class="items-wrapper font-xs">
          <div class="item" v-for="item of heroData.itemsAdv" :key="`item-adv-${item._id}`">
            <img :src="item.icon" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="items">
        <span class="font-xl">逆风出装</span>
        <div class="items-wrapper font-xs">
          <div class="item" v-for="item of heroData.itemsDis" :key="`item-adv-${item._id}`">
            <img :src="item.icon" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
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
      activeSkill: 0,
      heroData: {
        title: '',
        name: '',
        categories: '',
        scores: { difficult: 0, skills: 0, attack: 0, survive: 0 },
        skills: [],
        itemsAdv: [],
        itemsDis: [],
      },
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

.items {
  background-color: map-get($colors, 'white');
  margin-top: 0.3rem;

  & > span {
    font-weight: bold;
    padding: 0 0.3rem;
    line-height: 1rem;
  }

  .items-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 0 0.3rem 0;

    img {
      display: block;
      width: 70%;
      margin: 0 auto 0.2rem auto;
      border-radius: 50%;
    }
  }
}

div.skills {
  background-color: map-get($colors, 'white');

  .skill-tab {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.4rem;
    padding: 0.4rem;

    img {
      display: block;
      width: 100%;
    }
  }

  .skill-icon {
    border-radius: 50%;
    border: 0.05rem solid transparent;

    &.active {
      border: 0.05rem solid map-get($colors, 'primary');
    }
  }

  .skill-content {
    padding: 0 0.2rem 0.2rem 0.2rem;

    .skill-name {
      display: block;
      font-size: 0.3rem;
      font-weight: bold;
    }

    .skill-des {
      display: block;
      margin-top: 0.3rem;
    }

    .skill-tips {
      display: block;
      margin-top: 0.3rem;
      color: map-get($colors, 'grey');
    }
  }
}

.banner {
  height: 50vw;
  position: relative;
  color: map-get($colors, 'white');
  background-color: #636363;

  & > span {
    position: absolute;
    left: 0.3rem;
    right: 0.3rem;
  }

  .title {
    bottom: 1.45rem;
  }

  .name {
    bottom: 0.96rem;
  }

  .categories {
    bottom: 0.65rem;
  }

  .scores {
    position: absolute;
    bottom: 0.3rem;
    left: 0.3rem;
    right: 0.3rem;

    i {
      font-style: normal;
      display: inline-block;
      width: map-get($font-sizes, 'md');
      height: map-get($font-sizes, 'md');
      text-align: center;
      border-radius: 50%;
    }

    & > span:nth-child(1) i {
      background-color: #7f5300;
    }
    & > span:nth-child(2) i {
      background-color: #1f3695;
    }
    & > span:nth-child(3) i {
      background-color: #781a16;
    }
    & > span:nth-child(4) i {
      background-color: #33332c;
    }
  }
}
</style>