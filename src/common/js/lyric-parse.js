const timeReg = /\[(\d{2,})&#58;(\d{2,})&#46;(\d{2,3})\](.*?)&#10;/g

const infoMap = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by'
}

export default class Lyric {
  constructor(lrc) {
    this.lrc = lrc
    this.lines = []
    this.info = {}

    this._initLines()
    this._initInfo()
  }

  _initLines() {
    const allLrc = this.lrc
    while (1) {
      let res = timeReg.exec(allLrc)
      if (!res) break
      if (!res[4]) continue
      this.lines.push({
        time: res[1] * 60 * 1000 + res[2] * 1000 + res[3] * 10,
        txt: res[4]
      })
    }
  }

  _initInfo() {
    const allLrc = this.lrc
    for (let tag in infoMap) {
      let infoReg = new RegExp(`\\[${infoMap[tag]}&#58;(.*?)\\]&#10;`, 'i')
      let res = infoReg.exec(allLrc)
      if (!res) continue
      this.info[tag] = res[1] || ''
    }
  }
}
