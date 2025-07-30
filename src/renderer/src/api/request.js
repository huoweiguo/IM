import { useStore } from '../stores/store'

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(method, url, params) {
  switch (method) {
    case 'get':
      return window.electronAPI.get(url, params)
    case 'post':
      return window.electronAPI.post(url, params)
  }
}

// post请求封装
function POST(url, data) {
  return request('post', url, data)
}

// get请求封装
function GET(url, data) {
  return request('get', url, data)
}

function loginout() {
  const store = useStore()
  store.clear()
}

export { POST, GET, loginout }
