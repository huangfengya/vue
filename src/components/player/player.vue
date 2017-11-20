<template>
  <div class="player" v-show="playList.length>0">
    <div class="normal-player" v-show="fullScreen">我是播放器</div>
    <div class="mini-player" v-show="!fullScreen"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['fullScreen', 'playList'])
  }
}
</script>


<style lang="less">
.player {
  .normal-player {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: #fff;
    z-index: 99999;
  }
  .mini-player {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 10vh;
    left: 0px;
    bottom: 0px;
    background: #eee;
    z-index: 999999;
  }
}
</style>
