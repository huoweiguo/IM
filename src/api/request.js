import axios from "axios";
import { getItem, setItem } from "../ui/util/storageHelper";

const BASE_URL = 'http://119.3.154.38:8803'


function request(type, url, data) {
  let promise = new Promise((resolve, reject) => {
    let postData = data;

    axios({
      url: BASE_URL + url,
      data: postData,
      method: type,
      header: {
        "content-type": "application/json",
        'token': getItem('app_token'),
      },
      success: function (res) {
        // if (res.data.code == 445) {
        //   setItem('app_token', '');
        // }

        resolve(res.data);
      },
      error: function (e) {
        reject("网络出错");
      },
    });
  });
  return promise;
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
  setItem('app_token', '');
}

export { POST, GET, loginout }
