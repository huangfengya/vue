<template>
  <div class="recommend">
    <div class="banner">
      <slider :listImg="listImg"></slider>
    </div>
  </div>
</template>

<script>
import { getRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'base/slider/slider'

export default {
  data() {
    return {
      listImg: [],
      hotSong: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.data.code === ERR_OK) {
          this.listImg = res.data.data.slider
          this.hotSong = res.data.data.songList
          console.log(this.hotSong)
        }
      })
    }
  },

  components: {
    Slider
  }
}
</script>

<style lang="less">

</style>
