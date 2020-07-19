<template>
  <div class="login">
    <el-card class="login-card" header="管理员登录">
      <el-form @submit.native.prevent="handleLogin">
        <el-form-item label="用户名">
          <el-input v-model="model.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" />
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post('/login', this.model);
      try {
        Cookies.set('token', res.data.token, { sameSite: 'lax', expires: 7 });
      } catch (e) {
        console.error('Failed to write Cookies', e);
      }
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  margin-top: 5rem;
  width: 90%;
  max-width: 30rem;
}

.login-btn {
  margin-top: 2rem;
  margin-bottom: 1rem;

  ::v-deep .el-button {
    width: 100%;
  }
}
</style>