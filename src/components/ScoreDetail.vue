<template>
  <div class="score-detail-ct">
    <div class="search-detail-ct" >
      <i class="search-icon"></i><input type="text" class="search" placeholder="搜索：培训课程名称"  @input="localSearch">
    </div>
    <ul class="score-detail-list" v-show="!!details">
      <li v-for="obj in details" @click="switchDevelop(obj)" :style="{'padding-bottom':obj.isShow?'0px':''}">
        <h1 class="title">
          <!--课程名称课程名称课程名称课程名称...-->
          {{obj.studyContent}}
          <span>
            <span :class="{'add-score':(obj.score >= 0), 'minus-score':(obj.score < 0)}">{{obj.score>= 0?('+'+obj.score):('-'+obj.score)}}分</span><i class="down-icon"></i>
          </span>
        </h1>
        <div class="score-date-name" :style="{'padding-bottom':obj.isShow?'18px':''}">
          <span>{{ obj.startDate }}</span>
          <span>{{ obj.studyType == 1?'培训必修课':obj.studyType == 2?'培训选修课':obj.studyType == 3?'自主学习':obj.studyType == 4?'技能竞赛':obj.studyType == 5?'学习分享':obj.studyType == 6?'知识库建设':'知识库建设' }}</span>
        </div>
        <!-- :style="{display:obj.isShow?block:none}" -->
        <div class="detail-item-develop" v-show="obj.isShow">
          <div class="item-develop-item"><span>是否出勤</span><span>{{ obj.attendance === 0 ? '是' : obj.attendance === 1 ? '否' : '无需考勤' }}</span></div>
          <div class="item-develop-item"><span>培训时长</span><span>{{ parseInt(obj.duration) }}小时</span></div>
          <div class="item-develop-item"><span>考核成绩</span><span>{{ obj.examResults }}</span></div>
        </div>
      </li>
    </ul>
    <div class="no-detail-data" v-show="!details.length">
      <img src="../assets/score/no-search-result.png">
    </div>
    <div class="filter-btn-ct open-filter-btn-ct">
      <a class="filter-btn" @click="openFilterPanel">筛选</a>
    </div>
    <van-popup v-model="filterPanelShow" position="top" :overlay="true">
      <div class="filter-panel">
        <div class="filter-title">项目类型</div>
        <!--<ul class="filter-list" v-show="filterTypes && filterTypes.length">
          <li class="filter-item" v-for="n in filterTypes" @click="typeSelect(n)" :class="{active: currFilterTypesSelect.indexOf(n) != -1}">{{n.desc}}</li>
        </ul>-->
        <div class="type-container">
          <ul v-for="(item, index) in filterTypesByDoms">
            <li v-for="items in item" @click="typeSelect(items)" :class="{active: currFilterTypesSelect.indexOf(items) != -1}">{{items.desc}}</li>
          </ul>
        </div>
        <!--<div class="filter-list" v-show="!!filterTypes">
          <div class="filter-group" v-for="n in filterTypesLenth2">
            <div class="filter-item" v-for="m < 3 && (n*3 +m) < filterTypesLenth">{{ filterTypes[ n*3 +m] }}</div>
          </div>
        </div>-->
        <div class="filter-title">日期</div>
        <div class="date-filter-ct">
          <span class="filter-item date-select" @click="openDatePanel('开始日期')">
            <!--{{new Date(startDate).getFullYear() +'-'+(new Date(startDate).getMonth()+1)+'-'+new Date(startDate).getDate())}}-->
            {{startDateText}}
          </span>
          <span class="cut-off-line"></span>
          <span class="filter-item date-select" @click="openDatePanel('结束日期')">
            <!--{{new Date(endDate).getFullYear() +'-'+(new Date(endDate).getMonth()+1)+'-'+new Date(endDate).getDate())}}-->
            {{endDateText}}
          </span>
        </div>
      </div>
      <div class="filter-btn-ct">
        <a class="sure-btn" @click="filterCourse">筛选</a><a class="cancel-btn" @click="cancelFilter">取消</a>
      </div>
    </van-popup>
    <van-popup v-model="dateSelectShow" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        @cancel="cancelDateSelect"
        @confirm="confirmDateSelect"
      />
    </van-popup>
  </div>
</template>
<script>
  import 'vant/lib/popup/style';
  import 'vant/lib/toast/style';
  import 'vant/lib/datetime-picker/style';
  import '../css/score/scoreDetail.debug.css';
//  import '../css/score/scoreDetail.css';
  import {filterScore, studyType} from '../api/score';
  import { Toast  } /*as usedVant*/  from 'vant';

  let thisPageUserId, thisPageDeptId;

  export default{
    name: 'ScoreDetail',
    data(){
      return {
        filterPanelShow: false,
        dateSelectShow: false,

        currentDate: (new Date()),
        currDateSelect: '开始日期',
        startDate: (new Date()),
        startDateText: '',
        endDate: (new Date()),
        endDateText: '',

        filterTypes: [],
        filterTypesByDoms: [],

        filterTypesLenth: 0,
        filterTypesLenth2: 0,

        currFilterTypesSelect: [],

        detailSource: [],
        details: [
        ]
      }
    },
    /*components:{
      DatetimePicker
    },*/
    mounted(){
      // 获取学分列表
      let _this = this;
      let begDate = this.$route.query.begDate,
        /* 默认查询开始日期在十年前到当前日期 */
      endDate = this.$route.query.endDate;
      let deptId = thisPageUserId = this.$route.query.deptId || 0;
      let userId = thisPageDeptId = this.$route.query.userId || 0;

      this.runFilter({
        deptId,
        userId,
        begDate, /*(startDate.getFullYear() + '-' + (startDate.getMonth()+1)+ '-' + startDate.getDate() + ' 00:00:00')*/
        endDate /*(currDate.getFullYear() + '-' + (currDate.getMonth()+1)+ '-' +currDate.getDate() + ' 23:59:59')*/
        ,studyType: this.$route.query.studyType ? [this.$route.query.studyType] : ''
      }, function(data){
        data = data.data.data;
        data.forEach(function(item){
          item.isShow = false;
          if(item.studyContent.length > 14){
            item.studyContent = item.studyContent.slice(0, 14) + '...';
          }
        });
        _this.detailSource = _this.details = data;
      });

      studyType().then((data) => {
        _this.filterTypes = data.data.studyType;
        _this.getFilterTypesByDom()
        /*_this.filterTypesLenth = _this.filterTypes.length;
        _this.filterTypesLenth2 = Math.round( _this.filterTypes.length/3 );*/
      });

      let test = new Date();
      console.log( test.toLocaleString() )
    },
    methods:{
      runFilter(data,callback){
        filterScore(
          data
        ).then((response) => {
          callback(response)
        });
      },
      localSearch(e){
        let key = e.target.value;
        let searchs = [];
        this.detailSource.forEach(function(item){
          if(item.studyContent.indexOf(key) != -1){
            searchs.push(item)
          }
        })
        this.details = searchs;
      },
      getFilterTypesByDom(){
        this.filterTypesByDoms = [];
        let rank = 3, row = Math.ceil( this.filterTypes.length/rank );
        for(let i = 0;i < row;i++){
          this.filterTypesByDoms[i] = [];
          for(let j = 0;j < rank;j++){
            if( this.filterTypes.length > i*3 +j){
              this.filterTypesByDoms[i].push( this.filterTypes[i*3 +j]);
            }else
              break;
          }
        }
      },
      switchDevelop(obj){
        obj.isShow = !obj.isShow;
      },
      openFilterPanel(){
        this.filterPanelShow = true;
      },
      openDatePanel(text){
        this.dateSelectShow = true;
        this.currDateSelect = text;
      },
      cancelDateSelect(){
        this.dateSelectShow = false;
      },
      cancelFilter(){
        this.filterPanelShow = false;
      },
      filterCourse(){

        let _this = this;

        if(_this.endDateText < _this.startDateText){
          Toast('结束日期少于开始日期,请重新选择结束日期！');
          return;
        }
        if(_this.currFilterTypesSelect.length < 1){
          Toast('请至少选择一种筛选类型！');
          return;
        }
        let queryStudyType = [], item;
        for(let i = 0;i < this.currFilterTypesSelect.length;i++){
          item = this.currFilterTypesSelect[i];
          for(let j = 0;j< this.filterTypes.length;j++){
            if( item.desc == this.filterTypes[j].desc){
              queryStudyType.push(this.filterTypes[j].key);
              break;
            }
          }
        }

        this.runFilter({
          deptId: thisPageDeptId,
          userId: thisPageUserId,
          begDate: _this.startDateText + ' 00:00:00',
          endDate: _this.endDateText + ' 23:59:59',
          studyType: queryStudyType.length ? queryStudyType : ''
        }, function(data){
          data.data.data.forEach(function(item){
            item.isShow = false;
            if(item.studyContent.length > 14){
              item.studyContent = item.studyContent.slice(0, 14) + '...';
            }
          });
          _this.detailSource = _this.details = data.data.data;
        });
        this.filterPanelShow = false;
      },
      confirmDateSelect(obj, obj2, obj3){
        this.dateSelectShow = false;
        if(this.currDateSelect == '开始日期'){
          this.startDateText  = this.currentDate.getFullYear() + '-' + (this.currentDate.getMonth()+1)+ '-' + this.currentDate.getDate() ;
        }else {
          this.endDateText  = this.currentDate.getFullYear() + '-' + (this.currentDate.getMonth()+1)+ '-' + (this.currentDate.getDate());
        }
      },
      typeSelect(n){
//        obj.isSelect = !obj.isSelect;
        let index = this.currFilterTypesSelect.indexOf(n);
        if( index == -1 ){
          this.currFilterTypesSelect.push(n);
        }else{
          this.currFilterTypesSelect.splice(index, 1);
        }
      }
    }
  }
</script>
