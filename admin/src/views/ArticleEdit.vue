<template>
  <div class="category-edit">
    <h2>{{ id?'编辑':'新建' }}文章 {{ id }}</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="分类">
        <el-select v-model="model.category" filterable>
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
      <el-form-item label="文章内容">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  name: 'ArticleEdit',
  props: {
    id: String,
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      categories: [],
      editorOption: {
        // Some Quill options...
      },
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
        message: '保存成功',
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      // 文件对象上传至 file，对应 multer 接受图片的 FromData 字段
      formData.append('file', file);
      try {
        const res = await this.$http.post('/upload', formData);
        Editor.insertEmbed(cursorLocation, 'image', res.data.url);
        resetUploader();
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted() {
    this.fetchCategories();
    if (this.id) {
      this.fetch();
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-select {
    width: 50%;
  }
}
</style>