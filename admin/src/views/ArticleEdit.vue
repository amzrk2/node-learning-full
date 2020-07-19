<template>
  <div class="category-edit">
    <h2>{{ id?'编辑':'新建' }}文章 {{ id }}</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="分类">
        <el-select v-model="model.category">
          <el-option
            v-for="item of categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ArticleEdit',
  props: {
    id: String
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post('/rest/articles', this.model);
      }
      console.log(res);
      this.$router.push('/articles/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    }
  },
  mounted() {
    this.fetchCategories();
    if (this.id) {
      this.fetch();
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-select {
    width: 50%;
  }
}
</style>