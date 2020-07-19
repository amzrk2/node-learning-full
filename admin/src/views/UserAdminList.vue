<template>
  <div class="category-list">
    <h2>管理员列表</h2>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/user-admin/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="removeCategory(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserAdminList',
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/rest/user_admin');
      this.items = res.data;
    },
    async removeCategory(row) {
      try {
        await this.$confirm(`此操作将永久删除 ${row.username}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        const res = await this.$http.delete(`/rest/user_admin/${row._id}`);
        if (res.status === 200) {
          this.$message({ type: 'success', message: '删除成功' });
          this.fetch();
        } else {
          this.$message({ type: 'error', message: '删除失败' });
        }
      } catch {
        this.$message({ type: 'warning', message: '已取消删除' });
      }
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>