<template>
  <div :class="{signin:true, signResultPage:gotoPanel=='SignInResult'}">
    <header v-if="coursesName">
      <h1>
        <div class="train-content">
          {{ coursesName  }}
        </div>
      </h1>
      <div class="train-time">
        ( {{ (signType=="signIn"?"签到":"签退") + "时间段：" + startTime + " - " + endTime }} )
      </div>
      <div class="trangle">
      </div>
    </header>
    <SignIn
            v-if="gotoPanel=='SignIn'"
            :data="signData"
            @signSuccess="signSuccess">
    </SignIn>
    <SignInResult
            v-if="gotoPanel=='SignInResult'"
            :data="signInResultData">
    </SignInResult>
  </div>
</template>
<script>
  import '../css/sign/sign.css';

  import {goToSignIn} from '../api/sign-api';
  import SignIn from './sign/SignIn.vue';
  import SignInResult from './sign/SignInResult.vue';
  import {InterfaceUrl} from '../api/config';

  export default {
    name: 'signHeader',
    data(){
      return {
        signType: '',
        startTime: '',
        endTime: '',
        coursesName: '',

        gotoPanel: '',

        signData: null,
        signInResultData: null,
      }
    },
    components:{
      SignIn,
      SignInResult,
    },
    mounted(){
      let _this = this;
      let programId = sessionStorage.getItem('programId'),
              isNeed = sessionStorage.getItem('isNeed'),
              laterTime = sessionStorage.getItem('laterTime');
//      alert(trainProId +' : '+isNeed +" : "+laterTime)
      false && goToSignIn(/*JSON.stringify*/({programId: programId, isNeed: isNeed, laterTime: laterTime}), function(data){
        data = data.data.returnData;
        /*data = {"returnCode":"200","returnData":{"laterTime":"30","signInId":"745d0ba9-1b6b-417c-aafa-36659e507f12","coursesName":"接口之持续集成","isNeed":"1","signType":"signOut","startTime":"2018-12-18 11:00:00","endTime":"2018-12-18 15:00:00","couldSignIn":"yes"},"returnMessage":"成功"};
        data = data.returnData;*/

        _this.signType = data.signType;
        _this.startTime = data.startTime;
        _this.endTime = data.endTime.split(' ')[1];
        _this.coursesName = data.coursesName;

        document.title = _this.signType=='signIn'?'签到':'签退';

        if(data.couldSignIn == "yes"){
          _this.gotoPanel = 'SignIn';
          _this.signData = {
            signType: data.signType,
            signInId: data.signInId
          };
        }else{
          _this.gotoPanel = 'SignInResult';
          _this.signInResultData = {
            signType: data.signType,
            result: data.couldSignIn/* befor || after */
          };
        }
      }, function(){

      })

      let signInQueryDto={programId: programId, isNeed: isNeed, laterTime: laterTime};
      true && $.ajax({
        url: (InterfaceUrl+"api/signIn/goToSignin"),
        data: JSON.stringify(signInQueryDto),
        dataType: 'json',
        type: "post",
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
          if(data.returnCode == '500'){
            alert(data.returnMessage);
            return;
          }
          data = data.returnData;
          /*let data = {"returnCode":"200","returnData":{"laterTime":"30","signInId":"745d0ba9-1b6b-417c-aafa-36659e507f12","coursesName":"接口之持续集成","isNeed":"1","signType":"signOut","startTime":"2018-12-18 11:00:00","endTime":"2018-12-18 15:00:00","couldSignIn":"yes"},"returnMessage":"成功"};
           data = data.returnData;*/

          _this.signType = data.signType;
          _this.startTime = data.startTime;
          _this.endTime = data.endTime.split(' ')[1];
          _this.coursesName = data.coursesName;

          document.title = _this.signType=='signIn'?'签到':'签退';

          if(data.couldSignIn == "yes"){
            _this.gotoPanel = 'SignIn';
            _this.signData = {
              signType: data.signType,
              signInId: data.signInId
            };
          }else{
            _this.gotoPanel = 'SignInResult';
            _this.signInResultData = {
              signType: data.signType,
              result: data.couldSignIn/* befor || after */
            };
          }
        },
        error:function (xhr, textStatus, errorThrown) {
        }});

    },
    methods:{
      signSuccess(){
        this.gotoPanel = 'SignInResult';
        this.signInResultData = {
          signType: this.signType,
          result: 'success'
        };
      }
    }
  }
</script>
