<template>
  <div class="recommend">
    <div class="banner">
      <slider :listImg="listImg"></slider>
    </div>
    <div class="hotSong">
      <h1>热门歌单</h1>
      <ul class="list">
        <li class="Hot_s" v-for="item in hotSong">
          <div class="list_media">
            <img :src="item.picUrl" alt="">
            <span>{{suki(item.accessnum)}}</span>
          </div>
          <div class="list_info">
            <p v-text="item.songListDesc"></p>
            <p v-text="item.songListAuthor"></p>
          </div>
        </li>
      </ul>
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
        }
      })
    },
    suki(num) {
      return (Number(num) / 10000).toFixed(1) + '万'
    }
  },

  components: {
    Slider
  }
}
</script>

<style lang="less">
.hotSong {
  margin-top: 20px;
  h1 {
    text-align: center;
    font-size: 20px;
    line-height: 30px;
  }
  .list {
    width: 100%;
    overflow: hidden;
    li {
      float: left;
      width: 47%;
      margin: 2% 1.5%;
      background: snow;
      .list_media {
        position: relative;
        width: 100%;
        img {
          width: 100%;
        }
        span {
          position: absolute;
          font-size: 14px;
          color: snow;
          bottom: 10px;
          left: 10px;
        }
      }
      .list_info {
        padding: 0px 5px;
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          line-height: 22px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
