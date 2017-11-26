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
  height: 6vh;
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
    background-size: 30px 32px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: 18px;
  }
  .mine {
    position: absolute;
    top: 0px;
    right: 0px;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: #ffcd32;
    }
  }
}
</style>
