<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.image" alt="">
        </div>
        <div class="top">
          <div class="back" @click="back">隐</div>
          <h1 class="title" v-text="currentSong.name"></h1>
          <h2 class="subtitle" v-text="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-A">
            <div class="cd_wrapper">
              <div class="cd">
                <img :src="currentSong.image" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <span class="model">模</span>
          <span class="prev">上</span>
          <span class="stop">播</span>
          <span class="next">下</span>
          <span class="favor">喜</span>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen">
        <div class="mini-song" @click="open()">
          <div class="mini-img">
            <img :src="currentSong.image" alt="">
          </div>
          <div class="mini-sing">
            <p class="title" v-text="currentSong.name"></p>
            <p class="singer" v-text="currentSong.singer"></p>
          </div>
        </div>
        <div class="list">
          <p>表</p>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  },
  computed: {
    ...mapGetters(['fullScreen', 'playList', 'currentSong'])
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    }
  }
}
</script>


<style lang="less" scoped>
.player {
  .normal-player {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 99999;
    .background {
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      filter: blur(5px);
      img {
        position: absolute;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .top {
      position: absolute;
      width: 100%;
      height: 10vh;
      .back {
        position: absolute;
        padding: 5px;
        width: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 50%;
        background: snow;
        z-index: 9;
      }
      .title {
        position: absolute;
        width: 100%;
        left: 0px;
        text-align: center;
        line-height: 30px;
        color: #fff;
      }
      .subtitle {
        position: absolute;
        width: 100%;
        top: 5vh;
        left: 0px;
        line-height: 30px;
        text-align: center;
        color: #eee;
      }
    }
    .middle {
      position: absolute;
      top: 10vh;
      right: 0px;
      bottom: 10vh;
      left: 0px;
      .middle-A {
        .cd_wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20% auto 0px;
          width: 270px;
          height: 270px;
          border-radius: 50%;
          background: radial-gradient(#fff 0%, #000 90%, snow 93%, #000 96%, #ccc 99%, #000 100%);
          .cd {
            width: 90%;
            height: 90%;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      display: flex;
      right: 0px;
      left: 0px;
      bottom: 0px;
      height: 10vh;
      background: lightgrey;
      span {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        border-right: 1px dotted #333;
        color: #d09a0a;
        &:last-child {
          border-right: none;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s ease;
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translateY(-100px);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player {
    position: fixed;
    width: 100%;
    height: 10vh;
    left: 0px;
    bottom: 0px;
    background: #eee;
    z-index: 999999;
    .mini-song {
      float: left;
      height: 100%;
      display: flex;
      align-items: center;
      .mini-img {
        height: 80%;
        padding-left: 5vw;
        img {
          height: 100%;
        }
      }
      .mini-sing {
        padding-left: 5vw;
        p {
          font-size: 14px;
          line-height: 25px;
          &:last-child {
            color: #333;
          }
        }
      }
    }
    .list {
      float: right;
      display: flex;
      height: 10vh;
      width: 10vh;
      align-items: center;
      justify-content: center;
      p {
        padding: 10px;
      }
    }
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all .3s linear;
    }
    &.mini-enter,
    &.mini-mini-to {
      opacity: 0;
    }
  }
}
</style>
