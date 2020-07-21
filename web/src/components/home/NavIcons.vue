<template>
  <div class="nav font-sm text-center">
    <div class="nav-icons color-bg-white d-flex flex-wrap">
      <div class="nav-icon">
        <i class="spirit blz"></i>
        <span>爆料站</span>
      </div>
      <div class="nav-icon">
        <i class="spirit gsz"></i>
        <span>故事站</span>
      </div>
      <div class="nav-icon">
        <i class="spirit zbsc"></i>
        <span>周边商城</span>
      </div>
      <div class="nav-icon">
        <i class="spirit tyf"></i>
        <span>体验服</span>
      </div>
      <div class="nav-icon">
        <i class="spirit xrzq"></i>
        <span>新人专区</span>
      </div>
      <div class="nav-icon">
        <i class="spirit rycc"></i>
        <span>荣耀·传承</span>
      </div>
      <div class="nav-icon">
        <i class="spirit wzyd"></i>
        <span>王者营地</span>
      </div>
      <div class="nav-icon">
        <i class="spirit gzh"></i>
        <span>公众号</span>
      </div>
    </div>
    <div class="nav-sh">
      <i class="spirit sq"></i>
      <span>收起</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavIcons'
};
</script>

<style lang="scss" scoped>
.nav-icons {
  margin-top: 0.25rem;

  .nav-icon {
    flex-basis: 25%;
    width: 25vw;
    height: 1rem;
    margin: 0.2rem 0;
    position: relative;

    i {
      margin-top: 0.15rem;
    }

    span {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0.05rem;
    }

    // 4 的倍数个不加右边框
    &:not(:nth-child(4n)) {
      border-right: 1px solid map-get($colors, 'border');
    }
  }
}

.nav-sh {
  height: 0.6rem;
  line-height: 0.6rem;
  background-color: #f9f9f9;

  span {
    margin-left: 0.05rem;
  }
}
</style>