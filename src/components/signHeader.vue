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
  import api from '../api/index2';

  import SignIn from './sign/SignIn.vue';
  import SignInResult from './sign/SignInResult.vue';

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
      SignInResult
    },
    mounted(){
      let _this = this;
      let programId = sessionStorage.getItem('programId'),
              isNeed = sessionStorage.getItem('isNeed'),
              laterTime = sessionStorage.getItem('laterTime');
//      alert(trainProId +' : '+isNeed +" : "+laterTime)
      api.goToSignin(JSON.stringify({programId: programId, isNeed: isNeed, laterTime: laterTime}), function(data){
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
