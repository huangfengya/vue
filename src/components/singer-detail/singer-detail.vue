<template>
  <transition name="slide">
    <div class="singer-detail">
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      song: []
    }
  },
  created() {
    this._getDetail()
    this._normalizeSongs()
    console.log(this.singer)
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.song = this._normalizeSongs(res.data.list)
          console.log(this.song)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        console.log(item)
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  }
}
</script>

<style lang="less">
.singer-detail {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s;
}

.slide-enter,
.slide-leave {
  transform: translate3d(100%, 0, 0)
}
</style>
