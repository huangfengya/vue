import Axios from 'common/js/axios'
import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
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

export function search(query, page, zhida) {
  const url = 'qq/soso/fcgi-bin/search_for_qq_cp'

  const param = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    w: query,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    format: 'jsonp',
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: 1511964574390
  })

  return jsonp(url, param, options)
}
