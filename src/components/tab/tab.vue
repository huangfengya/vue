<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.tab {
  display: flex;
  height: 6vh;
  line-height: 44px;
  font-size: 14px;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding-bottom: 5px;
      color: rgba(0, 0, 0, 0.5);
    }
    &.router-link-active {
      .tab-link {
        color: lavender;
        border-bottom: 2px solid rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>

