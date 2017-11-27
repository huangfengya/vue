<template>
  <div class="search-box">
    <i class="icon-search">
      <img src="./search.png" alt="">
    </i>
    <input type="text" v-model="query" class="box" placeholder="请输入要查找的歌手或歌名">
    <i v-show="query" @click="clear" class="icon-dismiss">
      <img src="./close.png" alt="">
    </i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.$watch('query', newQuery => {
      this.$emit('query', newQuery)
    })
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(item) {
      this.query = item.k
    }
  }
}
</script>


<style lang="less" scoped>
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: #ededed;
  i {
    display: block;
    img {
      height: 20px;
    }
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 25px;
    font-size: 16px;
    color: #666;
    outline: none;
    border: none;
    padding: 0 5px;
    border-radius: 3px;
    color: #000;
  }
}
</style>

