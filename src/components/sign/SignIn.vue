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

  import {signin} from '../../api/sign-api';
  import Vue from 'vue'
  import  Dialog from 'vant/lib/dialog';
  import 'vant/lib/dialog/style';
  import  Toast from 'vant/lib/toast';
  import 'vant/lib/toast/style';
  import  Icon from 'vant/lib/icon';
  import 'vant/lib/icon/style';
  import {InterfaceUrl} from '../../api/config';

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
      validateInput(){
        if(!this.staffno){
          Toast({
            duration: 2000,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'warn',
            message: '工号不能为空'
          });
          return false;
        }
        if(!/^(\w){2}\-[0-9]{1,}$/.test( this.staffno )){
          this.dialogShow = true;
          this.dialogTitle = '工号不符合规则';
          this.dialogMsg = `1、前两位必须是字母；<br>
                           2、第三位必须是中划线“-”；<br>
                          3、第四位起必须是数字，至少有一个数字；<br>
                          (工号示例：TD-8888)`;
          return false;
        }
        if(!this.userName){
          Toast({
            duration: 2000,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'warn',
            message: '姓名不能为空'
          });
          return false;
        }
        return true;
      },
      signOperate(){
        /*this.dialogShow = true;
         this.dialogTitle = '失败';
         this.dialogMsg = '打发第三方';
         return;*/
        if(!this.validateInput()) return;

        let signInId = this.data.signInId,
                signType = this.data.signType,
                userName = this.userName,
                staffno = this.staffno;

        sessionStorage.setItem('signUserName', this.userName);

        let _this = this;
        false && signin(JSON.stringify({
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

        let signInQueryDto={
          signInId,
          signType,
          userName: _this.userName,
          "staffno": _this.staffno
        };
        $.ajax({
          url: (InterfaceUrl+"api/signInfo/signin"),
          data: JSON.stringify(signInQueryDto),
          dataType: 'json',
          type: "post",
          contentType: 'application/json;charset=utf-8',
          success: function (data) {
            if(!data || !data.returnCode) return;
            if (data.returnCode == 200) {
              _this.$emit('signSuccess');
            } else {
              _this.dialogShow = true;
              _this.dialogTitle = (_this.data.signType == 'signIn' ?'签到':'签退')+'失败';
              _this.dialogMsg = data.returnMessage;
            }
          },
          error:function (xhr, textStatus, errorThrown) {
          }});


      }
    }
  }
</script>
<style>
  .signin{/*background: url("../../assets/signIn/bg.png") left bottom no-repeat;*/width: 100%;height: 100%;background-size: 100% auto;position: relative;padding: .4rem;}
  .van-dialog__message--has-title{text-align: left;}
</style>
