<template>
  <div>
      排行
  </div>
</template>

<script>
import { getRank } from 'api/rank'
import { ERR_OK } from 'api/config'

export default {
  created() {
    this._getRank()
  },
  methods: {
    _getRank() {
      getRank().then(res => {
        if (res.data.code === ERR_OK) {
          console.log(res.data.data.topList)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">

</style>

