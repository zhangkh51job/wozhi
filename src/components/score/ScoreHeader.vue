<template>
  <div class="header">
      <span class="select-bar">
        <div class="year-select" @click="openSelectPanel()">{{currYear}}<i class="select-icon"></i></div>
        <van-popup v-model="yearSelectPopShow" position="top" :overlay="true">
          <ul class="year-ul">
            <li v-for="n in yearColumns" @click="yearSelect(n)">{{n}}</li>
          </ul>
        </van-popup>
      </span>
    <div class="select-ct"  v-drag >
          <span v-for="n in tabss" :class="{active: currSelectTab ==n }" @click="quarterSelect(n)">
            {{ n }}
          </span>
    </div>
  </div>
</template>
<script>
  import {getScore, filterScore} from '../../api/score';
  import {getOrgScore} from '../../api/organization'
  import {eventBus, MY_SCORE_SET, ORG_SCORE_SET, ORG_ID_SELECTED} from '../../utils/SibContaxt';

  /* 以后 ScoreHeader整合进TuandaiScore中 */
  export default{
    name: 'ScoreHeader',
    props:{
      currPanel:{
        type: String,
        default: 'myScore'
      }
    },
    data(){
      return {
        tabss: ['全年', '一季度', '二季度', '三季度', '四季度'],
        currSelectTab: '全年',

        yearColumns:['2018', '2019'],
        currYear: '2019',

        currSelectOrgDepartmentId: 0,

        yearSelectPopShow: false,
      }
    },
    mounted(){
      this.getScoreProxy();
      eventBus.$on(ORG_ID_SELECTED,(id) => {
        this.currSelectOrgDepartmentId = id;
      this.getOrgListScores();
    });
    },
    methods: {
      /* 稍后，再将header组件提取出来 */
      openSelectPanel(){
        this.yearSelectPopShow = true;
      },

      getScoreProxy(){
        let year = this.currYear,
          quarter = this.tabss.indexOf(this.currSelectTab),
          deptId = this.$route.query.deptId || 0,
          userId = this.$route.query.userId || 0;

        var _this = this;
        getScore( {year,quarter,deptId,userId} ).then( (response) => {
          eventBus.$emit(MY_SCORE_SET, response);
      }, (error) => {
          alert( error.toString() );
        })
      },
      getOrgListScores(){
        if( !this.currSelectOrgDepartmentId ) return;
        let year = this.currYear,
          quarter = this.tabss.indexOf( this.currSelectTab), dept = this.currSelectOrgDepartmentId;

        getOrgScore({year, quarter, dept}).then(function(info){
          eventBus.$emit(ORG_SCORE_SET, info);
        })
      },
      yearSelect(n){
        this.currYear = n;
        this.yearSelectPopShow = false;
        this.$emit('yearChange', n);
        this.getScoreProxy();
        this.getOrgListScores();
      },
      quarterSelect(n){
        this.currSelectTab = n;

        let quarter = this.tabss.indexOf(this.currSelectTab);

        this.$emit('quaterChange', quarter);
//        if(this.currPanel == 'myScore'){
        this.getScoreProxy();
//        }else{
        this.getOrgListScores();
//        }
      }
    }
  }
</script>
