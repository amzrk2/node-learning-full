<template>
  <div class="card color-bg-white">
    <div class="card-header font-xl d-flex flex-a-center">
      <i :class="icon"></i>
      <span>{{ title }}</span>
      <div class="flex-grow"></div>
      <i class="spirit dots"></i>
    </div>
    <div class="card-body">
      <slot>卡片无内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlotCard',
  props: {
    title: String, // 卡片标题
    icon: String // 卡片图标
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 0.3rem;
  margin-top: 0.25rem;

  // 卡片头
  .card-header {
    padding-bottom: 0.25rem;
    border-bottom: 1px solid map-get($colors, 'border');

    span {
      margin-left: 0.1rem;
    }
  }

  .card-body {
    margin-top: 0.25rem;
  }
}
</style>