import axios from 'axios';
import { getItem, setItem } from '../ui/util/storageHelper';

const BASE_URL = 'http://119.3.154.38:8803';

function request(type, url, data) {
    return axios({
        url: BASE_URL + url,
        method: type,
        data: type === 'get' ? null : data,
        params: type === 'get' ? data : null,
        headers: {
            'content-type': 'application/json',
            token: getItem('apptoken') || '',
        },
    })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            return Promise.reject('网络出错');
        });
}

// post请求封装
function POST(url, data) {
    return request('post', url, data);
}

// get请求封装
function GET(url, data) {
    return request('get', url, data);
}

export { POST, GET };
