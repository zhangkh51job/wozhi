import { InterfaceUrl } from './config'

// const baseURL = config.baseURL;
// const baseURL = '/';
let currInterfaceUrl = '';
const axios = require('axios').create({
  baseURL: InterfaceUrl,            //api请求的baseURL
  timeout: 0,
  //withCredentials: true, // 允许跨域 cookie
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  contentType: "application/json",
  maxContentLength: 2000,
  transformResponse: [function (data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = {};
    }
    if (data.status === 403) {

    }
    return data;
  }]
})

const urlAdjust = (req) => {
  req.url = req.url.replace(/\/ding/g, '')
}
// get
export const _get = (req) => {
  urlAdjust(req);
  return axios.get(req.url, {params: req.data})
  //return axios({method: 'get', url: `/${req.url}`, params: req.data})
}

// post
export const _post = (req) => {
  urlAdjust(req);
  return axios({method: 'post', url: `/${req.url}`, data: req.data})
}

//patch
export const _put = (req) => {
  urlAdjust(req);
  return axios({method: 'put', url: `/${req.url}`, data: req.data})
}

//delete
export const _delete = (req) => {
  urlAdjust(req);
  return axios({method: 'delete', url: `/${req.url}`, data: req.data})
}

//post and no withCredentials
export const _postNoWithCredentials = (req) => {
  urlAdjust(req);
  return axios({method: 'post', url: `/${req.url}`, data: req.data, withCredentials:false})
}

// post
export const _postWithBaseUrl = (req) => {
  urlAdjust(req);
  return axios({method: 'post', url: `/${req.url}`, data: req.data, baseURL: req.data.baseURL})
}
