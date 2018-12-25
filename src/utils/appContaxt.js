/**
 * Created by yangjie on 2018/12/17.
 */
export const showShareBtn = function(){
    var deviceType = sessionStorage.getItem('SystemName');
    try{
        if (deviceType == 'IOS') {
            window.webkit.messageHandlers.showShareBtn.postMessage('');
        } else if (deviceType == 'Android') {
            androidForJs.showShareBtn();
        } else {
            console.error('无法获取设备类型');
        }
    }catch (e){
        console.warn(e.message);
    }
}