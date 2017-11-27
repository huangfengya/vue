import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCELIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CUREEN_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_RANK_LIST](state, list) {
    state.rankList = list
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  }
}

export default mutations
