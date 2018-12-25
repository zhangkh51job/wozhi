import axios from 'axios';
let http = axios.create({
  // baseURL: '',
  //withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  /*transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]*/
});

function apiAxios(method, url, params, response, errorback) {
  http({
    method: method,
    url: url,
    data: method === 'POST'  ? params : null,
    params: method === 'GET' || method === 'DELETE' || method === 'PUT' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    errorback(err);
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
    /*let paramsUrl = '';
    for(let key in params){
      paramsUrl += (paramsUrl==''?'':'&') + key +'='+ params[key];
    }
    url = url+ '?' + paramsUrl;
    axios.get(url)
      .then(function(response){
        console.log(response);
      })
      .catch(function(err){
        console.log(err);
      });*/
  },
  post: function (url, params, response, errorback) {
    return apiAxios('POST', url, params, response, errorback)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
