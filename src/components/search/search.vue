<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <h1 class="title">热门搜索</h1>
      <ul>
        <li class="item" v-for="item in hotkey" @click="addQuery(item)" v-text="item.k"></li>
      </ul>
    </div>
    <div class="search-res">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import Suggest from 'components/suggest/suggest'

export default {
  data() {
    return {
      hotkey: [],
      query: ''
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    _getHotKey() {
      getHotKey().then(res => {
        if (res.data.code === ERR_OK) {
          this.hotkey = res.data.data.hotkey.slice(0, 10)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addQuery(item) {
      this.$refs.searchBox.setQuery(item)
    },
    onQueryChange(query) {
      this.query = query
    }
  },
  components: {
    SearchBox,
    Suggest
  }
}
</script>

<style lang="less">
.search {
  height: 88vh;
  .shortcut-wrapper {
    padding: 0 4vh;
    .title {
      font-size: 18px;
      line-height: 30px;
      padding: 4px 0;
    }
    .item {
      float: left;
      font-size: 16px;
      padding: 5px 8px;
      border-radius: 3px;
      background: #ccc;
      margin: 0px 8px 16px 0;
    }
  }
}
</style>

