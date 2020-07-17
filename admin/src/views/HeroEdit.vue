<template>
  <div class="hero-edit">
    <h2>{{ id?'编辑':'新建' }}英雄 {{ id }}</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="`${$http.defaults.baseURL}/upload`"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item of allHeroCategories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="scores" label="难度">
        <el-rate :max="9" v-model="model.scores.difficult" show-score></el-rate>
      </el-form-item>
      <el-form-item class="scores" label="技能">
        <el-rate :max="9" v-model="model.scores.skills" show-score></el-rate>
      </el-form-item>
      <el-form-item class="scores" label="攻击">
        <el-rate :max="9" v-model="model.scores.attack" show-score></el-rate>
      </el-form-item>
      <el-form-item class="scores" label="生存">
        <el-rate :max="9" v-model="model.scores.survive" show-score></el-rate>
      </el-form-item>
      <el-form-item label="顺风出装">
        <el-select v-model="model.itemsAdv" multiple>
          <el-option v-for="item of allItems" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="逆风出装">
        <el-select v-model="model.itemsDis" multiple>
          <el-option v-for="item of allItems" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'HeroEdit',
  props: {
    id: String
  },
  data() {
    return {
      allHeroCategories: [],
      allItems: [],
      model: {
        name: '',
        title: '',
        categories: [],
        avatar: '',
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        itemsAdv: [],
        itemsDis: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post('/rest/heroes', this.model);
      }
      console.log(res);
      this.$router.push('/heroes/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data); // 防止二级对象为 undefined
    },
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    async fetchAllHeroCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.allHeroCategories = res.data;
    },
    async fetchAllItems() {
      const res = await this.$http.get(`/rest/items`);
      this.allItems = res.data;
    }
  },
  mounted() {
    // 获取分类数据
    this.fetchAllHeroCategories();
    // 获取装备数据
    this.fetchAllItems();
    // 若为编辑页面而不是新建页面
    if (this.id) {
      this.fetch();
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .el-select {
    width: 50%;
  }
}

.scores ::v-deep .el-form-item__content {
  margin-top: 10px;
}
</style>