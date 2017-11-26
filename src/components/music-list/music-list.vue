<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back">返</i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" :style="bgImg">
      <div class="play" @click="random">随机播放</div>
    </div>
    <div class="songlist" ref="songList">
      <song-list :songs="songs" @select="selectItem"></song-list>
    </div>
  </div>
</template>

<script>
import SongList from 'base/song-list/song-list'
import { mapActions } from 'vuex'
import { playListMixin } from 'common/js/mixin'

export default {
  mixins: [playListMixin],
  props: {
    bgImage: {
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
  },
  methods: {
    back() {
      this.$router.back()
    },
    selectItem(song, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    random() {
      this.randomPlay({ list: this.songs })
    },
    handlePlay(playList) {
      const height = playList.length > 0 ? '50vh' : ''
      this.$refs.songList.style.height = height
    },
    ...mapActions(['selectPlay', 'randomPlay'])
  },
  computed: {
    bgImg() {
      return `background-image: url(${this.bgImage})`
    }
  },
  components: {
    SongList
  }
}
</script>

<style lang="less" scoped>
.music-list {
  position: fixed;
  width: 100%;
  top: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 999;
  .back {
    position: absolute;
    left: 0px;
    top: 0px;
    padding: 3px;
    line-height: 20px;
    z-index: 9999;
    i {
      display: block;
      width: 26px;
      line-height: 26px;
      text-align: center;
      border-radius: 50%;
      background: snow;
    }
  }
  .title {
    position: absolute;
    width: 100%;
    line-height: 25px;
    top: 0px;
    text-align: center;
    color: snow;
    z-index: 99;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 40vh;
    background-repeat: no-repeat;
    background-size: cover;
    .play {
      position: absolute;
      width: 64px;
      padding: 5px 8px;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      border: 1px solid #fff;
      border-radius: 5px;
      color: #fff;
    }
  }
  .songlist {
    width: 100%;
    height: 60vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
