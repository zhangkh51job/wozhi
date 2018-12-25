<template>
  <div>
    <!--<header>
      <h1><div class="train-content">{{ coursesName  }}</div></h1>
      <div class="train-time">( {{ (signType=="signIn"?"签到":"签退") + "时间段：" + startTime + " - " + endTime }} )</div>
      <div class="trangle"></div>
    </header>-->
    <main>
      <h1 class="title">
        <i class="signin-icon" :class="{'signout-icon': data.signType == 'signOut'}"></i>
        <label>
          请填写{{(data.signType=="signIn"?"签到":"签退")}}信息
        </label>
      </h1>
      <div>
        <input type="text" placeholder="请输入工号" v-model="staffno" :class="{'input-disable':isInApp}">
      </div>
      <div>
        <input type="text" placeholder="请输入姓名" v-model="userName" :class="{'input-disable':isInApp}">
      </div>
      <div>
        <input type="button"  :value="data.signType=='signIn'?'签到':'签退'" @click="signOperate">
      </div>
    </main>
    <!--<div class="panel-ct" v-show="false">
      <div class="panel">
        <h1 class="title">签退失败</h1>
        <div class="content">工号和他人重复</div>
        <div class="close">关闭</div>
      </div>
    </div>-->
    <van-dialog
      v-model="dialogShow"
      :title="dialogTitle"
      :message="dialogMsg"
      :showConfirmButton="false"
      :showCancelButton="true"
      cancel-button-text="关闭"
    ></van-dialog>

  </div>

</template>
<script>

  import api from '../../api/index2';
  import Vue from 'vue'
  import  Dialog from 'vant/lib/dialog';
  import 'vant/lib/dialog/style';
  import  Toast from 'vant/lib/toast';
  import 'vant/lib/toast/style';
  import  Icon from 'vant/lib/icon';
  import 'vant/lib/icon/style';

  Vue.use(Toast).use(Dialog).use(Icon);


  export default {
    name: 'SignIn',
    props:{
      data:{
        type: Object
      }
    },
    components: {
      Dialog,
      Toast,
      Icon
    },
    data(){
      return {
        /*signType: '',
         startTime: '',
         endTime: '',
         coursesName: '',*/
        dialogTitle: '',
        dialogMsg: '',
        dialogShow: false,

        userName:'',
        staffno:'',

        isInApp: false
      }
    },
    beforeCreate(){
    },
    created(){
    },
    beforeMount(){
//      this.signType = sessionStorage.getItem('signType');
      this.userName = sessionStorage.getItem('userName') || '';
      this.staffno = sessionStorage.getItem('staffno') || '';
    },
    mounted(){
      this.isInApp = navigator.userAgent.match(/wozhiColleage/gi);
    },
    methods: {
      signOperate(){
        /*this.dialogShow = true;
         this.dialogTitle = '失败';
         this.dialogMsg = '打发第三方';
         return;*/
        let signInId = this.data.signInId,
                signType = this.data.signType,
                userName = this.userName,
                staffno = this.staffno;

        if(!this.userName){
          Toast({
            duration: 2000,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'warn',
            message: '姓名不能为空'
          });
          return;
        }else if(!this.staffno){
          Toast({
            duration: 2000,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'warn',
            message: '工号不能为空'
          });
          return;
        }

        sessionStorage.setItem('signUserName', this.userName);

        let _this = this;
        api.signin(JSON.stringify({
          signInId,
          signType,
          userName: _this.userName,
          "staffno": _this.staffno
        }), function (data) {
          if(!data.data || !data.data.returnCode) return;
          if (data.data.returnCode == 200) {
            _this.$emit('signSuccess');
          } else {
            _this.dialogShow = true;
            _this.dialogTitle = (_this.data.signType == 'signIn' ?'签到':'签退')+'失败';
            _this.dialogMsg = data.data.returnMessage;
          }
        })
      }
    }
  }
</script>
<style>
  .signin{/*background: url("../../assets/signIn/bg.png") left bottom no-repeat;*/width: 100%;height: 100%;background-size: 100% auto;position: relative;padding: .4rem;}

</style>
