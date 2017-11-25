import {
  mapGetters
} from 'vuex'

export const playListMixin = {
  computed: {
    ...mapGetters(['playList'])
  },
  mounted() {
    this.handlePlay(this.playList)
  },
  activated() {
    this.handlePlay(this.playList)
  },
  methods: {
    handlePlay() {
      throw new Error('component must implement handlePlaylist method')
    }
  },
  watch: {
    playList(newVal) {
      this.handlePlay(newVal)
    }
  }
}
