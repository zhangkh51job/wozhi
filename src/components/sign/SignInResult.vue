<template>
  <div>
    <!--<header>
      <h1><div class="train-content">{{}}</div></h1>
      <div class="train-time">(签到时间段：{{'2018-11-10 09:00 - 10:00'}})</div>
      <div class="trangle"></div>
    </header>-->
    <main style="padding-top: 40px;">
      <div class="block" v-if="data.result=='success'">
        <img src="../../assets/signIn/signIn-success.png" >
        <div class="sign-info">
          {{data.signType=='signOut'?'签退成功':'签到成功'}}
        </div>
        <div class="sign-tip">
          <i class="name">{{userName}}</i>{{ data.signType=='signOut'? '已签退' : '已签到' }}
        </div>
        <!--<div>
          签错了?<a>点击纠正</a>
        </div>-->
      </div>
      <!-- 没有签退还没开始的状态 -->
      <div class="block" v-else-if="data.result=='befor'">
        <img src="../../assets/signIn/not-beginning.png">
        <div class="sign-info">
          {{data.signType=='signOut'?'签退':'签到'}}还没有开始哦
        </div>
        <div class="sign-tip">
          先去玩耍一会儿吧
        </div>
      </div>
      <div class="block" v-else-if="data.result=='after'">
        <img src="../../assets/signIn/signIn-end.png">
        <div class="sign-info">
          {{data.signType=='signOut'?'签退':'签到'}}已经结束
        </div>
        <div class="sign-tip">
          如有疑问，可与组织者联系
        </div>
      </div>
    </main>
  </div>
</template>
<script>

  export default {
    name: 'SignInResult',
    props:{
      data:{
        type: Object
      }
    },
    data(){
      return{
        userName: ''
      }
    },
    beforeMount(){
      /*this.info = this.$route.query.info;
      this.msg = this.$route.query.msg;
      this.result = this.$route.query.result;*/
    },
    mounted(){
      this.userName = sessionStorage.getItem('signUserName') ||  '';
    }

  }
</script>
<style>

</style>
