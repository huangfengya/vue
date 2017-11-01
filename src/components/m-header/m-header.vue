<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Music</h1>
    <router-link tag="div" class="mine" to='/user'>
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.bg-image(@url) {
  background-image: url("@{url}@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url('{url}@3x.png')
  }
}

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: rgba(255, 205, 49, 0.5);
  font-size: 0px;
  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    .bg-image(logo);
  }
}
</style>

