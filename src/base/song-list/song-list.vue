<template>
  <div class="song-list">
    <ul>
      <li v-for="(song, index) in songs" @click="select(song, index)">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer} · ${song.album}`
    },
    select(song, index) {
      this.$emit('select', song, index)
    }
  }
}
</script>

<style lang="less" scoped>
.song-list {
  width: 100%;
  padding: 20px 15px 30px 0px;
  .content {
    padding: 0px 20px;
    .name {
      font-size: 14px;
      line-height: 25px;
    }
    .desc {
      font-size: 14px;
      line-height: 25px;
      color: #666;
    }
  }
}
</style>

