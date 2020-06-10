import axios from 'axios'
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    let hasToken = window.sessionStorage.getItem('token')
    if (hasToken != undefined) {
      config.headers.Authorization = hasToken
    }
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // Do something before response is sent
    return response
  },
  error => {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axios
