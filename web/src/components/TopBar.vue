<template>
  <div class="topbar color-bg-dark">
    <div class="topbar-wrapper d-flex">
      <img src="../assets/logo.png" />
      <div class="topbar-title">
        <h1 class="color-white font-md">王者荣耀</h1>
        <p class="color-white font-xxs">团队成就更多</p>
      </div>
      <div class="flex-grow"></div>
      <div class="download color-bg-primary">
        <a
          class="download-btn text-center font-sm"
          href="//pvp.qq.com/zlkdatasys/mct/d/play.shtml"
        >立即下载</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar'
};
</script>

<style lang="scss" scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 1rem;
  z-index: 20;
  display: block;
  padding: 0.1875rem 0.4rem;
}

.topbar-wrapper {
  height: 100%;
  width: 100%;

  img {
    display: block;
    width: 0.65rem;
  }
}

.topbar-title {
  padding-left: 0.2rem;

  h1 {
    font-weight: 400;
    margin: 0;
  }

  p {
    margin-top: 0.1rem;
    color: #666;
  }
}

.download {
  border-radius: 0.05rem;
  width: 1.35rem;
  height: 0.55rem;

  a {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 0.55rem;
  }
}
</style>