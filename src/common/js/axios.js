import axios from 'axios'

export default function Axios(url, param, method) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      params: param
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
