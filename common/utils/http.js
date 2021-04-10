import Request from '@/common/lib/request/index.js'
const getTokenStorage = () => {
  let token = ''
  try {
    token = uni.getStorageSync('token')
  } catch (e) {}
  return token
}
const http = new Request()
http.setConfig((config) => {
  /* 设置全局配置 */
  // config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest' 
  config.baseURL = 'http://localhost:8080'
  /* 根域名不同 */
  config.header = {
    ...config.header,
  }
  return config
})
http.interceptors.request.use((config) => {
  /* 请求之前拦截器。可以使用async await 做异步操作 */
  config.header = {
    ...config.header,
    source: 2,
    rxToken: getTokenStorage()
  }
  /*
 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
   return Promise.reject(config)
 }
 */
  return config
}, (config) => {
  return Promise.reject(config)
})
http.interceptors.response.use(async (response) => {
  /* 请求之后拦截器。可以使用async await 做异步操作  */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
  let {data} = response;
  console.info(data)
  // wx.showLoading({title: '玩命加载中...'})
  if (data.errorCode == 500) {
    // alert("系统繁忙，请稍后再试！");
    uni.showModal({
      content: '系统繁忙，请稍后再试',
      showCancel: false
    })
    return Promise.reject(response)
  } else if (!data.success) {
    uni.showModal({
      content: data.message || '系统繁忙，请稍后再试',
      showCancel: false
    })
    return Promise.reject(response)
  }
  return data;
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
  return Promise.reject(response)
})
export {
  http
}
