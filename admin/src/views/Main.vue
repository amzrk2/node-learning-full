<template>
  <el-container class="main-container">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246); overflow-x: hidden;">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>系统管理
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/user-admin/create">新建管理员</el-menu-item>
            <el-menu-item index="/user-admin/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <template v-if="userdata.username">
          <el-button type="text" @click="handleExit">注销</el-button>
          <span class="username">{{ userdata.username }}</span>
        </template>
        <el-button type="text" v-else @click="$router.push('/login')">请先登录</el-button>
      </el-header>

      <el-main>
        <router-view :key="$route.path" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Main',
  data() {
    return {
      userdata: {
        username: '',
        userid: '',
      },
    };
  },
  methods: {
    handleExit() {
      this.userdata = { username: '', userid: '' };
      this.$store.commit('modUserData', this.userdata);
      Cookies.remove('token');
      this.$router.push('/login');
    },
  },
  async mounted() {
    // 获取用户信息回显数据
    const res = await this.$http.post('/user');
    this.userdata.username = res.data.username;
    this.userdata.userid = res.data._id;
    this.$store.commit('modUserData', this.userdata);
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.main-container {
  height: 100vh;
}

.username {
  margin-left: 1rem;
}
</style>