<template>
  <div class="intro">
    <el-container direction="vertical">
      <el-row class="line">
        <el-col :span="24">
          <span class="title">node-learning-full 后台</span>
        </el-col>
      </el-row>
      <el-row v-if="userdata.username">
        <el-col :span="24">
          <div>欢迎回来</div>
          <div>用户：{{ userdata.username }}</div>
          <div>ID：{{ userdata.userid }}</div>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24">
          <el-button type="text" @click="$router.push('/login')">请先登录管理员账户</el-button>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  computed: {
    userdata() {
      return {
        username: this.$store.state.userdata.username,
        userid: this.$store.state.userdata.userid
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.intro {
  text-align: center;
}

.title {
  font-size: 2rem;
}

.line {
  margin-bottom: 2rem;
}
</style>