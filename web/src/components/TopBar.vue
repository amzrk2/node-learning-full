<template>
  <div class="spirit topbar">
    <div class="topbar-wrapper d-flex">
      <a class="spirit logo-small" href="/"></a>
      <div class="topbar-title">
        <h1 class="color-white font-md">王者荣耀</h1>
        <p class="color-white font-xxs">团队成就更多</p>
      </div>
      <div class="flex-grow"></div>
      <div class="download">
        <a class="spirit download" href="//pvp.qq.com/zlkdatasys/mct/d/play.shtml"></a>
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
  height: 0.9rem;
  z-index: 20;
  display: block;
  padding: 0.1375rem 0.3rem;
}

.topbar-wrapper {
  height: 100%;
  width: 100%;
}

.topbar-title {
  padding-left: 0.2rem;

  h1 {
    font-weight: 400;
    margin: 0;
  }

  p {
    margin-top: 0.1rem;
    color: map-get($colors, 'grey');
  }
}

.download a {
  margin-top: 0.05rem;
}
</style>