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

Vue.config.productionTip = false;

import {  Popup, DatetimePicker, Toast, Picker  }  from 'vant';
Vue.use(Popup).use(DatetimePicker).use(Toast).use(Picker);

/*import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)*/

/* 模拟app拼接过来数据 */
sessionStorage.setItem('deptId', "0");
//sessionStorage.setItem('userId', "F2A0A07BE94A452183909B1CDA6AA942");

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })

