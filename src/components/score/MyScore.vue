<template>
  <div class="myScore">
    <!--<div class="header">
      <span class="select-bar">
        <div class="year-select" @click="openSelectPanel()">{{currYear}}<i class="select-icon"></i></div>
        <van-popup v-model="yearSelectPopShow" position="top" :overlay="true">
          <ul class="year-ul">
            <li v-for="n in yearColumns" @click="yearSelect(n)">{{n}}</li>
          </ul>
        </van-popup>
        &lt;!&ndash;<div class="select-panel" v-show="isSelectOpen">
          <div>2018</div>
          <div>2017</div>
        </div>&ndash;&gt;
      </span>
      <div class="select-ct"  v-drag >
          <span v-for="n in tabss" :class="{active: currSelectTab ==n }" @click="quarterSelect(n)">
            {{ n }}
          </span>
      </div>
    </div>-->
    <div class="score-content" v-if="pageData">
      <div class="score-detail">
        <div>你好，{{pageData.userName}}</div>
        <div>
          {{quater==0?year+'年':quater==1?'1月-3月':quater==2?'4月-6月':quater==3?'7月-9月':quater==4?'10月-12月':'10月-12月'}} 获得学分
        </div>
        <div class="score-ct">
          <span class="score-num">
            {{pageData.total}}
          </span>
          <span class="score-prefix">分</span>
        </div>
      </div>
      <div class="score-title">
        <i class="mark"></i>项目学分统计
        <a class="score-detail-url" @click="checkScoreDetail">明细</a>
      </div>
      <ul class="score-list">
        <li v-for="n in pageData.scoreItem" @click="checkScoreDetail(n)">
          <label>{{n.studyTypeName}}</label><i>{{n.score}}分</i>
        </li>
      </ul>
      <div class="score-tip">
        <i class="score-tip-icon"></i><span>系统仅能查看近两年的学分情况</span>
      </div>
    </div>
  </div>
</template>
<script>
  import 'vant/lib/tab/style';
  import 'vant/lib/tabs/style';
  import Vue from 'vue';
  import { Tabs, Tab } from 'vant';
  import {getScore, filterScore} from '../../api/score';

  import {transformTime} from '../../utils/DateUtil'
  import {eventBus, MY_SCORE_SET} from '../../utils/SibContaxt';

  /* username 通过APP拼接过来 */

  export default{
    name: 'MyScore',
    props:{
      pageData:{
        type: Object
      },
      departmentId:{
        type: Number,
        default: 0
      },
      userId:{
        type: Number,
        default: 0
      },
      year:{
        type: String,
        default: '2018'
      },
      quater: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        username: '张先生',
        duration: '1月 - 3月',

        total:0,
        scoreItem: []

      }
    },
    components: {},
    mounted(){
      /*let _this = this;
      eventBus.$on(MY_SCORE_SET, function(data){
        data = data.data;
        _this.username = data.userName;
        _this.total = data.total;
        _this.scoreItem = data.scoreItem;
      })*/
    },
    methods:{
      checkScoreDetail(n){
        let {begDate, endDate} = transformTime(this.year, this.quater)

        let _this = this;
        let userId;
        this.$router.push({
          path: "/scoreDetail",
          query: {
            deptId: (_this.departmentId) || 0,
            userId: (_this.userId) || 0,
            begDate,
            endDate,
            studyType: (n&&n.studyType)?n.studyType:''
          }
        })
      }

    }
  }
</script>
<style>

</style>
