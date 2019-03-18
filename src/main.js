// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import './utils/flexible';


//import "./css/sign/sign.css"
import './utils/flexible';
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/sessions';
import './directives/Drag';
import './test';

Vue.config.productionTip = false;

import {  Popup, DatetimePicker, Toast, Picker  }  from 'vant';
Vue.use(Popup).use(DatetimePicker).use(Toast).use(Picker);

/*import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)*/

/* 模拟app拼接过来数据 */
//sessionStorage.setItem('deptId', "0");
//sessionStorage.setItem('userId', "F2A0A07BE94A452183909B1CDA6AA942");

const startRun = function(){
    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        router,
        components: { App },
        template: '<App/>'
    })
};
const appendScript = function(src){
    let scriptDom = document.createElement('script');
    /*scriptDom.addEventListener('load', function(){
        startRun();
    });*/
    scriptDom.onreadystatechange= function () {
        if (this.readyState == 'complete')
            startRun();
        scriptDom.onreadystatechange = scriptDom.onload =null;
    }
    scriptDom.onload= function(){
        startRun();
        scriptDom.onreadystatechange = scriptDom.onload =null;
    }
    scriptDom.type = 'text/javascript';
    scriptDom.src = src;

    document.querySelector('head').appendChild(scriptDom);
};
appendScript("//g.alicdn.com/sj/lib/zepto/zepto.min.js");


