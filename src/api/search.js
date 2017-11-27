import Axios from 'common/js/axios'
import {
  commonParams
} from './config'

export function getHotKey() {
  const url = 'qq/splcloud/fcgi-bin/gethotkey.fcg'

  const param = Object.assign({}, commonParams, {
    platform: 'h5',
    g_tk: 1098627169,
    needNewCode: 1
  })

  return Axios(url, param, 'GET')
}
