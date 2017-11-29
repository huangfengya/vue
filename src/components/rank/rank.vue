<template>
  <div class="rank">
    <div class="rank-show" ref="rankShow">
      <loading v-if="!topList.length"></loading>
      <div class="scroll-hidden"></div>
      <div class="rank-item" v-for="item in topList" @click="topRank(item)">
        <img :src="item.picUrl" alt="">
        <div class="item-list">
          <h1 v-text="item.topTitle"></h1>
          <p v-for="(list, index) in item.songList">
            {{index + 1}}、<span v-text="list.songname"></span> - {{list.singername}}
          </p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRank } from 'api/rank'
import { ERR_OK } from 'api/config'
import Loading from 'base/loading/loading'
import { mapMutations } from 'vuex'
import { playListMixin } from 'common/js/mixin'

export default {
  mixins: [playListMixin],
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getRank()
  },
  methods: {
    _getRank() {
      getRank().then(res => {
        if (res.data.code === ERR_OK) {
          this.topList = res.data.data.topList
        }
      }).catch(err => {
        console.log(err)
      })
    },
    topRank(item) {
      this.$router.push({
        path: `rank/${item.id}`
      })
      this.setTopList(item)
    },
    handlePlay(playList) {
      const height = playList.length > 0 ? '73vh' : ''
      this.$refs.rankShow.style.height = height
    },
    ...mapMutations({
      setTopList: 'SET_RANK_LIST'
    })
  },
  components: {
    Loading
  }
}
</script>

<style lang="less">
.rank-show {
  position: relative;
  height: 83vh;
  padding: 5vh 3vh 0;
  overflow-y: scroll;
  overflow-x: hidden;
  .rank-item {
    height: 100px;
    display: flex;
    align-items: center;
    margin-bottom: 3vh;
    background: snow;
    img {
      display: block;
      height: 100%;
    }
    .item-list {
      height: 100%;
      width: 66%;
      padding-left: 15px;
      h1 {
        line-height: 30px;
      }
      p {
        width: 100%;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        color: #999;
        span {
          color: #333;
        }
      }
    }
  }
}
</style>

