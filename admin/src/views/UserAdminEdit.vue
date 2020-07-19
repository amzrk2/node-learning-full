<template>
  <div class="category-edit">
    <h2>{{ id?'编辑':'新建' }}管理员 {{ id }}</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserAdminEdit',
  props: {
    id: String
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/user_admin/${this.id}`, this.model);
      } else {
        res = await this.$http.post('/rest/user_admin', this.model);
      }
      console.log(res);
      this.$router.push('/user-admin/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/user_admin/${this.id}`);
      this.model = res.data;
    }
  },
  mounted() {
    if (this.id) {
      this.fetch();
    }
  }
};
</script>