<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      fontSize: 50,
    };
  },
  mounted() {
    this.updateFontSize();
    // 监听屏幕宽度变化
    window.onresize = () => {
      this.updateFontSize();
    };
  },
  methods: {
    // 获取屏幕宽度并计算比例字体大小
    updateFontSize() {
      let curWidth = document.body.clientWidth;
      if (curWidth > 0) {
        this.fontSize = curWidth / 7.5;
      }
      document.documentElement.style.fontSize = `${this.fontSize}px`;
    },
  },
};
</script>