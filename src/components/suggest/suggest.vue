<template>
  <div class="suggest" v-show="result.length" ref="nimei">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <p class="name" v-html="getDisplayName(item)"></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { filterSinger } from 'common/js/song'
import { playListMixin } from 'common/js/mixin'

const TYPE_SINGER = 'singer'

export default {
  mixins: [playListMixin],
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: []
    }
  },
  methods: {
    _search() {
      search(this.query, this.page, this.showSinger).then(res => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        ret = ret.concat(data.song.list)
      }
      return ret
    },
    getIconClass(item) {
      return item.type === TYPE_SINGER ? 'icon-singer' : 'icon-music'
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.songname} - ${filterSinger(item.singer)}`
      }
    },
    handlePlay(playList) {
      const height = playList.length > 0 ? '73vh' : ''
      this.$refs.nimei.style.height = height
    }
  },
  watch: {
    query() {
      this._search()
    }
  }
}
</script>

<style lang="less" scoped>
.suggest {
  height: 82vh;
  overflow-x: hidden;
  overflow-y: scroll;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
    }
    .icon {
      padding-right: 20px;
      [class^="icon-"] {
        display: block;
        width: 25px;
        height: 25px;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .icon-singer {
        background-image: url("./singer.png");
      }
      .icon-music {
        background-image: url("./music.png");
      }
    }
    .name {
      flex: 1;
      font-size: 15px;
      color: #ff366d;
      overflow: hidden;

      line-height: 40px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

