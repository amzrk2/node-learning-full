<template>
  <div class="category-edit">
    <h2>{{ id?'编辑':'新建' }}广告位 {{ id }}</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button class="skill-add-btn" @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-divider></el-divider>
        <el-row type="flex" class="skill-row">
          <!-- all items -->
          <el-col
            class="skill-item"
            :md="12"
            v-for="(item, index) in model.items"
            :key="`skill-${index}`"
          >
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="`${$http.defaults.baseURL}/upload`"
                :show-file-list="false"
                :on-success="(res) => { return afterItemUpload(res, index) }"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="skill-delete"
                size="small"
                type="danger"
                @click="handleItemDelete(index)"
              >删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdEdit',
  props: {
    id: String
  },
  data() {
    return {
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post('/rest/ads', this.model);
      }
      console.log(res);
      this.$router.push('/ads/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data); // 防止二级对象为 undefined
    },
    afterItemUpload(res, index) {
      console.log(res);
      if (this.model.items[index]) {
        this.$set(this.model.items[index], 'image', res.url);
      }
    },
    handleItemDelete(index) {
      if (index >= 0) {
        this.model.items.splice(index, 1);
      }
    }
  },
  mounted() {
    if (this.id) {
      this.fetch();
    }
  }
};
</script>

<style lang="scss" scoped>
.skill-row {
  flex-wrap: wrap;
}

.skill-delete {
  margin-left: 5rem;
}
</style>