<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getRankList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getRankList()
  },
  methods: {
    _getRankList() {
      getRankList(this.rankList.id).then(res => {
        if (res.data.code === ERR_OK) {
          console.log(res.data.songlist)
          this.songs = this._normalizeSongs(res.data.songlist)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let musicData = item.data
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  computed: {
    title() {
      return this.rankList.topTitle
    },
    bgImage() {
      return this.songs.length ? this.songs[0].image : ''
    },
    ...mapGetters(['rankList'])
  },
  components: {
    MusicList
  }
}
</script>

<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s linear;
}

.slide-enter {
  transform: translate3d(100%, 0, 0);
}
.slide-leave-to {
  transform: scale3d(0, 0, 0);
}
</style>

