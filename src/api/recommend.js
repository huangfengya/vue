import axios from 'common/js/axios'
import {
  commonParams
} from './config'

export function getRecommend() {
  const url = 'qq/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const param = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return axios(url, param, 'GET')
}
