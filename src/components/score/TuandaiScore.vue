<template>
  <div>
    <!-- 将ScoreHeader 整合进来 -->
    <!--<ScoreHeader @yearChange="yearChange" @quaterChange="quaterChange" :currPanel="currPanel"></ScoreHeader>-->
    <div class="header">
      <span class="select-bar">
        <div class="year-select"
             @click="openSelectPanel()">
          {{currYear}}
          <i class="select-icon"></i>
        </div>
        <van-popup
                v-model="yearSelectPopShow"
                position="top"
                :overlay="true">
          <ul class="year-ul">
            <li v-for="n in yearColumns" @click="yearSelect(n)">
              {{n}}
            </li>
          </ul>
        </van-popup>
      </span>
      <div class="select-ct"  v-drag >
          <span v-for="n in tabss"
                :class="{active: currSelectTab ==n }"
                @click="quarterSelect(n)">
            {{ n }}
          </span>
      </div>
    </div>
    <div :class="{'tuandai-ct': hasOrganization}">
      <MyScore v-show="currPanel == 'myScore'"
               :year="currYear"
               :quater="currQuater"
               :pageData ="myScoreData"
               :departmentId ="currSelectOrgDepartmentId"
               :userId = "currUserId"
      >
      </MyScore>
      <OrgScore v-show="currPanel == 'orgScore'"
                :year="currYear"
                :quater="currQuater"
                :orgList ="orgList"
                @enterSelfScore="enterSelfScore"
                @departmentSelect="departmentSelect"
      >
      </OrgScore>
    </div>
    <div :class="{'btn-ct':true, orgScore: !hasOrganization}">
      <a
              @click="switchPanel('我的学分')"
              :class="{active: currPanel == 'myScore' }">
        我的学分
      </a>
      <a
              @click="switchPanel('组织学分')"
              :class="{active: currPanel == 'orgScore' }">
        组织学分
      </a>
    </div>
  </div>
</template>
<script>
  import MyScore from './MyScore.vue';
  import OrgScore from './OrgScore.vue';
  import ScoreHeader from './ScoreHeader.vue';

  import {getScore} from '../../api/score';
  import {getOrgScore, hasOrganization} from '../../api/organization'
  import {eventBus, MY_SCORE_SET, ORG_SCORE_SET, ORG_ID_SELECTED} from '../../utils/SibContaxt';

  import 'vant/lib/button/style';
  import Vue from 'vue';


  export default{
    name:'TuandaiScore',
    data(){
      return {
        tabss: ['全年', '一季度', '二季度', '三季度', '四季度'],
        currSelectTab: '全年',

        yearColumns:['2018', '2019'],

        currSelectOrgDepartmentId: 0,
        currUserId: 0,

        myScoreData: null,
        orgList:[/*{"userId":"daikaimin","userName":"戴凯敏","position":"高级内控经理","total":0,"avatar":"","scoreItem":[]},
          {"userId":"lizekai","userName":"李泽凯","position":"项目管理专员","total":0,"avatar":"","scoreItem":[]},
          {"userId":"wangzhihao2","userName":"王志豪","position":"CEO助理","total":0,"avatar":"","scoreItem":[]}*/],

        yearSelectPopShow: false,

        currPanel: 'myScore',
        currYear: '2019',
        currQuater:0,
        hasOrganization: false
      }
    },
    components:{
      MyScore,
      OrgScore,
      /*ScoreHeader*/
    },
    mounted(){
      /* 默认显示登陆者的信息 */
      this.currSelectOrgDepartmentId = 0;
      this.currUserId                  = 0;/*默认显示登陆者*/


      this.currQuater = Math.ceil( (new Date().getMonth() +1)/3 );
      this.currSelectTab = this.tabss[this.currQuater];

      this.adjustQuaterPostion(this.currQuater);
      this.sureOrganization();
      this.getScoreProxy();
    },
    methods:{
      switchPanel(text){
        if(text == '我的学分'){
          this.currPanel = 'myScore';
          this.getScoreProxy();
        }else if(text == '组织学分'){
          this.currPanel = 'orgScore';
          this.getOrgListScores();
        }
      },
      adjustQuaterPostion(quater){
        let el = document.querySelector('.select-ct');
        let offsetX = parseFloat( window.getComputedStyle(el, null)['left']);
        let width = parseFloat( window.getComputedStyle(el, null)['width']);
        if(quater == 4 && offsetX+ width > window.innerWidth){
          el.style.left = (window.innerWidth- width) + 'px';
        }
      },
      /* 整合进ScoreHeader组件 */
      openSelectPanel(){
        this.yearSelectPopShow = true;
      },
      sureOrganization(){
        let _this = this;
        hasOrganization().then(function(info){
          _this.hasOrganization = info.data.data;
        });
      },
      getScoreProxy(){
        let year = this.currYear,
          quarter = this.currQuater,
          deptId = this.currSelectOrgDepartmentId,
          userId = this.currUserId;

        let _this = this;
        getScore( {year,quarter,deptId,userId} ).then( (response) => {
          _this.myScoreData = response.data.data;
      }, (error) => {
          alert( error.toString() );
        })
      },
      getOrgListScores(){
        if( !this.currSelectOrgDepartmentId ) return;
        let year = this.currYear,
          quarter = this.currQuater,
          dept = this.currSelectOrgDepartmentId;

        let _this = this;
        getOrgScore({year, quarter, dept}).then(function(info){
//          eventBus.$emit(ORG_SCORE_SET, info);
          _this.orgList = info.data.data;
        })
      },
      yearSelect(n){
        this.currYear = n;
        this.yearSelectPopShow = false;

        if(this.currPanel == 'myScore'){
          this.getScoreProxy();
        }else{
          this.getOrgListScores();
        }
      },
      quarterSelect(n){
        this.currSelectTab = n;

        this.currQuater = this.tabss.indexOf(this.currSelectTab);

        if(this.currPanel == 'myScore'){
          this.getScoreProxy();
        }else{
          this.getOrgListScores();
        }
      },
      departmentSelect(id){
        this.currSelectOrgDepartmentId = Number(id);
        this.getOrgListScores();
      },
      enterSelfScore(obj){
        /* */
        this.currSelectOrgDepartmentId = Number(obj.deptId);
        this.currUserId = /*Number*/(obj.userId);
        this.currPanel = 'myScore';
        this.getScoreProxy();
      }
    }
  }
</script>
