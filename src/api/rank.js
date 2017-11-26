import Axios from 'common/js/axios'
import {
  commonParams
} from './config'

export function getRank() {
  const url = 'qq/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const param = Object.assign({}, commonParams, {
    uin: 0,
    format: 'json',
    platform: 'h5'
  })

  return Axios(url, param, 'GET')
}

export function getRankList(id) {
  const url = 'qq/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const param = Object.assign({}, commonParams, {
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: id
  })

  return Axios(url, param, 'GET')
}
