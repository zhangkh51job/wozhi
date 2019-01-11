/**
 * Created by yangjie on 2018/12/27.
 */
import Qs from 'qs'
import { StudyPointInterfaceUrl } from './config';

const xhr = new XMLHttpRequest();
var Ajax={
    get: function(url, data, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据
        url = StudyPointInterfaceUrl + url +'?'
        for(let key in data){
            url = url + (key+'='+data[key])+'&'
        }
        /*xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
         xhr.setRequestHeader("Accept", "application/json");*/
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据
                fn.call(this, xhr.responseText);
            }else{
                //alert(url+'接口报错！');
            }
        };
        xhr.onerror = function(){
            //alert(url+'接口报错！');
        };
        xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
        url = StudyPointInterfaceUrl + url;

        let urlData = '';
        for(let key in data){
            if(urlData == '')
                urlData = key + '=' + data[key];
            else
                urlData = urlData + '&' + key + '=' + data[key];
        }

        //xhr.open("POST", url, true);
        xhr.open("POST", url, true);

        // 添加http头，发送信息至服务器时内容编码类型
        //xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                let responseData = xhr.responseText, data;
                if(typeof responseData == 'string'){
                    data = JSON.parse(responseData);
                }else {
                    data = responseData;
                }

                fn.call(this, data);
            }else{
                //alert(url+'接口报错！');
            }
        };
        xhr.onerror = function(){
            //alert(url+'接口报错！');
        };


        //xhr.send( data );
        //xhr.open("POST", url+'?'+urlData, true);
        xhr.send( Qs.stringify(data) );
    }
}

export const _get = (req, cb) => {
    Ajax.get(req.url , req.data, cb);
};

// post
export const _post = (req, cb) => {
    Ajax.post(req.url , req.data, cb);
}

// post
/*export const _postWithBaseUrl = (req) => {
 urlAdjust(req);
 return axios({method: 'post', url: `/${req.url}`, data: req.data, baseURL: req.data.baseURL})
 }*/
