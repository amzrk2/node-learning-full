<template>
  <div>
    <top-bar />
    <div class="nav color-bg-primary">
      <ul class="navbar d-flex color-white font-md text-center">
        <li class="flex-grow">
          <router-link to="/" class="d-flex flex-j-center flex-a-center">
            <span>首页</span>
          </router-link>
        </li>
        <li class="flex-grow">
          <router-link to="/strategy" class="d-flex flex-j-center flex-a-center">
            <span>攻略中心</span>
          </router-link>
        </li>
        <li class="flex-grow">
          <router-link to="/match" class="d-flex flex-j-center flex-a-center">
            <span>赛事中心</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';

export default {
  name: 'Main',
  components: { TopBar }
};
</script>

<style lang="scss" scoped>
.nav {
  margin-top: 1rem;
  height: 0.9rem;
}

.navbar {
  height: 100%;
  margin: 0;

  li {
    height: 100%;
    flex-basis: 33.3333%;

    a {
      width: 100%;
      height: 100%;

      span {
        padding: 0.05rem 0;
        border-bottom: 3px solid transparent;
      }

      &.router-link-exact-active span {
        padding: 0.05rem 0;
        border-bottom: 3px solid #fff;
      }
    }
  }
}
</style>