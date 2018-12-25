/**
 * Created by yangjie on 2018/9/27.
 */
const dealParamStr = function(paraString){
    paraString=paraString.split('#')[0].split("&");
    let paraObj = {}, i, j;
    for (i = 0; j = paraString[i]; i++) {
        var key = j.substring(0, j.indexOf("="));
        var val = j.substring(j.indexOf("=") + 1, j.length);
        paraObj[key] = val;
        sessionStorage.setItem(key, decodeURI(val));
    }
}
const setSessiongStorgeData = function () {
    let url = location.href;
    let paraStrs = url.split("?");
    paraStrs && paraStrs.forEach(function(item){
        dealParamStr(item);
    });

    /*let paraString = url.substring(url.indexOf("?") + 1, url.length);

     paraString=paraString.split('#')[0].split("&");
     let paraObj = {}, i, j;
     for (i = 0; j = paraString[i]; i++) {
     var key = j.substring(0, j.indexOf("="));
     var val = j.substring(j.indexOf("=") + 1, j.length);
     paraObj[key] = val;
     sessionStorage.setItem(key, decodeURI(val));
     }*/
}
setSessiongStorgeData();