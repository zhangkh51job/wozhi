<template>
  <div>
    <ul
            class="tap-ul"
            :style="{display:isShowTuanDai?'block':'none'}"
    >
      <li>
        <span
                @click="switchPanel('团贷网')"
                :class="{active: currShowPanel == 'CURR_SHOW_TUANDAI_DETAIL_PANEL' }">
          团贷网
        </span>
      </li>
      <li>
        <span
                @click="switchPanel('集团')"
                :class="{ active: currShowPanel == 'CURR_SHOW_GROUP_DETAIL_PANEL' }">
          集团
        </span>
      </li>
    </ul>
    <router-view
            v-if="currShowPanel == 'CURR_SHOW_TUANDAI_DETAIL_PANEL' ">
    </router-view>
    <!--<div>-->
      <!--<TuandaiScore
              v-if="currShowPanel == 'CURR_SHOW_TUANDAI_DETAIL_PANEL' && isShowTuanDai">
      </TuandaiScore>-->
      <!--<ScoreIndex
              :isLoaded="isLoaded"
              v-if="currShowPanel == 'CURR_SHOW_TUANDAI_SCORE_GUIDE' && isShowTuanDai && !isEnterScoreDetail"
              @enterScoreDetail="enterScoreDetail"
      >
      </ScoreIndex>-->
      <GroupScore
              v-if="currShowPanel == 'CURR_SHOW_GROUP_DETAIL_PANEL' ">
      </GroupScore>
    <!--</div>-->
  </div>
</template>
<script>
  require('../css/score/scores.debug.css');

//  import '../css/score/scores.debug.css';
//  import '../css/score/scores.css';
  import TuandaiScore from './score/TuandaiScore.vue';
  import GroupScore from './score/GroupScore.vue';
  import ScoreGuide from './score/ScoreGuide.vue';

//  import {isTuanDaiMember} from '../api/score';
  import {isTuanDaiMember} from '../api/net-api.js';
  import {StudyPointInterfaceUrl} from '../api/config';


  export default{
    name:'ScoreIndex',
    data(){
      return {
        isLoaded: false,

        currShowPanel: '',
        isShowTuanDai: false,
        isEnterScoreDetail: false
      }
    },
    components:{
      TuandaiScore,
      GroupScore,
      ScoreGuide
    },
    mounted(){

      this.pickShowPanel();

    },
    methods:{
      switchPanel(text){
        this.currShowPanel = text == '集团'?
                'CURR_SHOW_GROUP_DETAIL_PANEL' : 'CURR_SHOW_TUANDAI_DETAIL_PANEL' ;
      },
      /*enterScoreDetail(){
        this.isEnterScoreDetail = true;
        this.currShowPanel = 'CURR_SHOW_TUANDAI_DETAIL_PANEL';
        /!*this.currShowPanel = this.isShowTuanDai == false ?
                'CURR_SHOW_GROUP_DETAIL_PANEL' : this.isEnterScoreDetail ? 'CURR_SHOW_TUANDAI_DETAIL_PANEL' : 'CURR_SHOW_TUANDAI_SCORE_GUIDE';*!/
        /!* 点击回退按钮能进入学分规则界面 *!/
        this.$router.push({
          path: "/scoreTap/tuandaiScoreCheck"
        })
      },*/
      pickShowPanel(){
        let reqData = {
          "Ip": "",
          "SystemName": "",
          "Version": "1.0.0",
          Token: sessionStorage.getItem('Token') ? sessionStorage.getItem('Token') : "ddddddd",//liuhao
          UserId: sessionStorage.getItem('UserId') ? sessionStorage.getItem('UserId') : "6A67A284578BD33E",
          "MethodName": "",
          "Data": ''/*,
           baseURL: StudyPointInterfaceUrl*/
        };
        let _this = this;
        isTuanDaiMember(reqData/*).then(*/, function(info){
          _this.isShowTuanDai = !info.Data.IsHaveDefualtScore;/* true表示是集团的， false表示是团贷网的 */
          /* 暂时不显示 */
          /*_this.isShowTuanDai = false;*/

          /*_this.currShowPanel = _this.isShowTuanDai == false ?
                  'CURR_SHOW_GROUP_DETAIL_PANEL' : this.isEnterScoreDetail ? 'CURR_SHOW_TUANDAI_DETAIL_PANEL' : 'CURR_SHOW_TUANDAI_SCORE_GUIDE';*/

          if(_this.isShowTuanDai == false){
            _this.currShowPanel = 'CURR_SHOW_GROUP_DETAIL_PANEL';

          }else{
            _this.isLoaded = true;
            _this.currShowPanel = 'CURR_SHOW_TUANDAI_DETAIL_PANEL';
            _this.$router.push({
              path: "/scoreIndex/scoreWrap"
            })
          }
        })
      }
    }
  }
</script>

