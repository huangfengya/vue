<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title"></h1>
    <div class="bg-image">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgImg: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>
