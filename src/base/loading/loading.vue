<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
  </div>
</template>

<style lang="less" scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  img {
    display: block;
  }
}
</style>

