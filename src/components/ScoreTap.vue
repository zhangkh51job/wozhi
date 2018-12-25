<template>
  <div>
    <ul class="tap-ul" :style="{display:isShowTuanDai?'block':'none'}">
      <li>
        <span
                @click="switchPanel('团贷网')"
                :class="{active: currShowPanel=='tudandai'}">
          团贷网
        </span>
      </li>
      <li>
        <span
                @click="switchPanel('集团')"
                :class="{active: currShowPanel=='group'}">
          集团
        </span>
      </li>
    </ul>
    <div>
      <TuandaiScore
              v-if="currShowPanel=='tudandai' && isShowTuanDai">
      </TuandaiScore>
      <GroupScore
              v-if="currShowPanel=='group'">
      </GroupScore>
    </div>
  </div>
</template>
<script>
  import '../css/score/scores.debug.css';
//  import '../css/score/scores.css';
  import TuandaiScore from './score/TuandaiScore.vue'
  import GroupScore from './score/GroupScore.vue'
  import {isTuanDaiMember} from '../api/score';
  import {StudyPointInterfaceUrl} from '../api/config';

  export default{
    name:'ScoreTap',
    data(){
      return {
        currShowPanel: '',
        isShowTuanDai: false
      }
    },
    components:{
      TuandaiScore,
      GroupScore
    },
    mounted(){
      /*let reqData = {
        "Ip": "",
        "SystemName": "",
        "Version": "1.0.0",
        Token: sessionStorage.getItem('Token') ? sessionStorage.getItem('Token') : "ddddddd",//liuhao
        UserId: sessionStorage.getItem('UserId') ? sessionStorage.getItem('UserId') : "6A67A284578BD33E",
        "MethodName": "",
        "Data": '',
        baseURL: StudyPointInterfaceUrl
      };
      isTuanDaiMember(reqData).then((info) => {
        this.isShowTuanDai = !info.data.Data.IsHaveDefualtScore;/!* true表示是集团的， false表示是团贷网的 *!/
      this.currShowPanel = this.isShowTuanDai == false?'group':'tudandai';
      })*/
      this.isShowTuanDai = (sessionStorage.getItem('scoreIndex-isShowTuanDai'))== 'true'?true:false;
//      this.isShowTuanDai = this.$route.query.isShowTuanDai;
      this.currShowPanel = this.isShowTuanDai == false?'group':'tudandai';
    },
    methods:{
      switchPanel(text){
        this.currShowPanel = text== '团贷网'? 'tudandai' : 'group';
      }
    }
  }
</script>

