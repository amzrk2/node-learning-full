<template>
  <div class="hero-edit">
    <h2>{{ id?'编辑':'新建' }}英雄 {{ id }}</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs :value="tabSelect" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="`${$http.defaults.baseURL}/upload`"
              :show-file-list="false"
              :on-success="afterUpload"
              with-credentials
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
              <el-option
                v-for="item of allItems"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.itemsDis" multiple>
              <el-option
                v-for="item of allItems"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.ueageTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能设置" name="skills">
          <el-button class="skill-add-btn" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-divider></el-divider>
          <el-row type="flex" class="skill-row">
            <!-- all skills -->
            <el-col
              class="skill-item"
              :md="12"
              v-for="(item, index) in model.skills"
              :key="`skill-${index}`"
            >
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="`${$http.defaults.baseURL}/upload`"
                  :show-file-list="false"
                  :on-success="(res) => { return afterSkillUpload(res, index) }"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="技能提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="handleSkillDelete(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" class="save-btn">保存</el-button>
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
      tabSelect: 'skills',
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
        skills: [],
        itemsAdv: [],
        itemsDis: [],
        ueageTips: ''
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
    afterSkillUpload(res, index) {
      console.log(res);
      if (this.model.skills[index]) {
        this.$set(this.model.skills[index], 'icon', res.url);
      }
    },
    handleSkillDelete(index) {
      if (index >= 0) {
        this.model.skills.splice(index, 1);
      }
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
.scores ::v-deep .el-form-item__content {
  margin-top: 10px;
}

.save-btn {
  margin-top: 1.5rem;
}

.skill-add-btn {
  margin-left: 5rem;
}

.skill-row {
  flex-wrap: wrap;
}

.skill-item {
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 1.5rem;
}
</style>