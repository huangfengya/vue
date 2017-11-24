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
              <div class="cd" :class="addCla">
                <img :src="currentSong.image" alt="">
              </div>
            </div>
          </div>
          <div class="middle-B" v-if="currentLyric">
            <p v-for="(lrc,index) in currentLyric.lines" :class="{'lyric': currentLineNum === index}" v-html="lrc.txt"></p>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l" v-text="format(currentTime)"></span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onPercentChange"></progress-bar>
            </div>
            <span class="time time-r" v-text="format(currentSong.duration)"></span>
          </div>
          <div class="operators">
            <span class="model" @click="changeMode" v-text="PlayMode"></span>
            <span class="prev" @click="prev">上</span>
            <span class="stop" @click="togglePlaying" v-text="state"></span>
            <span class="next" @click="next">下</span>
            <span class="favor">喜</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen">
        <div class="mini-song" @click="open">
          <div class="mini-img">
            <img :src="currentSong.image" alt="">
          </div>
          <div class="mini-sing">
            <p class="title" v-text="currentSong.name"></p>
            <p class="singer" v-text="currentSong.singer"></p>
          </div>
        </div>
        <div class="list">
          <progress-circle :percent="percent">
            <p class="stop_mini" v-text="state" @click.stop="togglePlaying"></p>
          </progress-circle>
          <p>表</p>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="timeUpdate" @ended="ended"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ProgressBar from 'base/progress-bar/progress-bar'
import ProgressCircle from 'base/progress-circle/progress-circle'
import { playMode } from 'common/js/config'
import { shuffer } from 'common/js/util'
import Lyric from 'common/js/lyric-parse'

export default {
  data() {
    return {
      state: '停',
      songReady: false,
      currentTime: 0,
      PlayMode: '顺',
      currentLyric: null,
      currentLineNum: 0
    }
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    togglePlaying() {
      this.setPlayingState(!this.playing)
    },
    prev() {
      if (!this.songReady) return

      let index = this.currentIndex - 1
      if (index < 0) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }

      this.songReady = false
    },
    next() {
      if (!this.songReady) return

      let index = this.currentIndex + 1
      if (index >= this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = true
    },
    ended() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
    timeUpdate(e) {
      this.currentTime = e.target.currentTime

      if (!this.currentLyric.lines) return
      for (let i = 0; i < this.currentLyric.lines.length; i++) {
        if (this.currentLyric.lines[i].time > this.currentTime * 1000 | 0) {
          this.currentLineNum = !i ? 0 : i - 1
          break
        }
      }
    },
    format(interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)

      let list = null
      if (this.mode === playMode.random) {
        list = shuffer(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this._resetCurrentIndex(list)
      this.setPlayList(list)
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    _resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    onPercentChange(percent) {
      this.$refs.audio.currentTime = this.currentSong.duration * percent
      if (!this.playing) this.togglePlaying()
    },
    _getLyric() {
      this.currentSong._getLyric().then((res) => {
        this.currentLyric = new Lyric(res.data.lyric)
        console.log(this.currentLyric)
      })
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING',
      setCurrentIndex: 'SET_CUREEN_INDEX',
      setMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    })
  },
  computed: {
    addCla() {
      return this.playing ? 'play' : 'play pause'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters(['fullScreen', 'playList', 'currentSong', 'playing', 'currentIndex', 'mode', 'sequenceList'])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) return

      this.$nextTick(() => {
        this.$refs.audio.play()
        this._getLyric()
      })
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        if (newPlaying) {
          audio.play()
          this.state = '停'
        } else {
          audio.pause()
          this.state = '播'
        }
      })
    },
    mode(m) {
      this.$nextTick(() => {
        if (m === playMode.sequence) {
          this.PlayMode = '顺'
        } else if (m === playMode.loop) {
          this.PlayMode = '循'
        } else {
          this.PlayMode = '随'
        }
      })
    }
  },
  components: {
    ProgressBar,
    ProgressCircle
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
    background: #fff;
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
            &.play {
              animation: rotate 20s linear forwards infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
          }
        }
      }
      .middle-B {
        position: absolute;
        bottom: 8vh;
        height: 20vh;
        width: 100%;
        overflow: scroll;
        p {
          text-align: center;
          font-size: 14px;
          line-height: 25px;
          color: snow;
          &.lyric {
            color: #ff366d;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      right: 0px;
      left: 0px;
      bottom: 0px;
      height: 15vh;
      .progress-wrapper {
        display: flex;
        align-items: center;
        height: 2vh;
        width: 90%;
        margin: 0 auto;
        .time {
          font-size: 14px;
          padding: 5px;
          color: #fff;
          &.time-l {
            float: left;
          }
          &.time-r {
            float: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
          margin: 0 auto;
        }
      }
      .operators {
        position: absolute;
        height: 10vh;
        width: 100%;
        bottom: 0px;
        display: flex;
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
      .stop_mini {
        position: absolute;
        top: -2px;
        left: -1px;
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

@keyframes rotate {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}
</style>
