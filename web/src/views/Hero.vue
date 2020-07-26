<template>
  <div class="hero color-bg-bg">{{ id }}</div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    id: String,
  },
};
</script>

<style lang="scss" scoped>
</style>