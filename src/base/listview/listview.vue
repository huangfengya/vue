<template>
  <div class="listview">
    <ul class="all">
      <li v-for="group in singers" class="yangxin">
        <h2>{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" @click="selectItem(item)">
            <img :src="item.pic" alt="" class="pic">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="dh">
      <li v-for="(item, index) in shortcutList" @click="jump(index)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    singers: {
      type: Array,
      default: []
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    jump(index) {
      let jump = document.querySelectorAll('.yangxin')
      let top = jump[index].offsetTop - jump[0].offsetTop
      let ctop = document.getElementsByClassName('all')[0].scrollTop

      let step = Math.abs(ctop - top) / 20

      top > ctop ? smoothDown() : smoothUp()

      function smoothDown() {
        if (top > ctop) {
          ctop += step
          document.getElementsByClassName('all')[0].scrollTop = ctop
          setTimeout(smoothDown, 10)
        } else {
          document.getElementsByClassName('all')[0].scrollTop = ctop
        }
      }
      function smoothUp() {
        if (top < ctop) {
          ctop -= step
          document.getElementsByClassName('all')[0].scrollTop = ctop
          setTimeout(smoothUp, 10)
        } else {
          document.getElementsByClassName('all')[0].scrollTop = ctop
        }
      }
    }
  },
  computed: {
    shortcutList() {
      return this.singers.map(singer => {
        return singer.title.substr(0, 1)
      })
    }
  }
}
</script>

<style lang="less">
.listview {
  width: 80%;
  margin: 5%;
  overflow: hidden;
  .all {
    width: 86vw;
    height: 81vh;
    overflow-x: scroll;
    li {
      h2 {
        font-size: 18px;
        line-height: 35px;
      }
      li {
        display: flex;
        align-items: center;
        height: 40px;
        img {
          height: 35px;
        }
        span {
          font-size: 14px;
          padding-left: 25px;
        }
      }
    }
  }
}

.dh {
  position: fixed;
  right: 10px;
  top: 55%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 22px;
  }
}
</style>

