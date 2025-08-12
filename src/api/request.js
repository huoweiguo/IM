import axios from 'axios';
import { getItem, setItem } from '../ui/util/storageHelper';

const BASE_URL = 'http://119.3.154.38:8803';

function request(type, url, cdata) {
    let data = {};
    let params = {};
    if (type === 'get' || type === 'delete') {
        params = cdata;
    } else {
        data = cdata;
    }
    return axios({
        url: BASE_URL + url,
        method: type,
        data,
        params,
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

// delete请求封装
function DELETE(url, data) {
    return request('delete', url, data);
}

// put请求封装
function PUT(url, data) {
    return request('put', url, data);
}

export { POST, GET, DELETE, PUT };
