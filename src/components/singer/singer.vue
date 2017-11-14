<template>
  <div>
    歌手
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'

const HOT_NAME = '热门'
const HOT_SINGER_LENGTH = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = res.data.list
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.foreach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            pic: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].push()
      })
    }
  }
}
</script>

<style lang="less">

</style>

