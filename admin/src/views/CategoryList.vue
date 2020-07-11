<template>
  <div class="category-list">
    <h2>分类列表</h2>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="300px"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('categories');
      this.items = res.data;
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>