<template>
  <div>
    <!--<div class="header">
      <span class="select-bar">
        <div class="year-select" @click="openSelectPanel()">{{currYear}}<i class="select-icon"></i></div>
        <van-popup v-model="yearSelectPopShow" position="top" :overlay="true">
          <ul class="year-ul">
            <li v-for="n in yearColumns" @click="yearSelect(n)">{{n}}</li>
          </ul>
        </van-popup>
      </span>
      <div class="select-ct" v-drag >
          <span v-for="n in tabss" :class="{active: currSelectTab ==n }"  @click="quarterSelect(n)">
            {{ n }}
          </span>
      </div>
    </div>-->
    <div class="search-ct" @click="popColumn">
      <input type="text" class="search" placeholder="请选择中心组织架构" :value="searchVal"><i class="search-icon"></i>
    </div>
    <ul class="search-list" v-if="orgList && orgList.length">
      <li v-for="n in orgList" class="search-item" @click="checkItemScore(n)">
        <span class="item-create" v-if="!n.avatar">{{n.userName.slice(n.userName.length-2, n.userName.length)}}</span>
        <img class="item-create" :src="n.avatar" v-else="n.avatar">
        <div class="item-info">
          <span class="item-name">{{n.userName}}</span>
          <span class="item-job">{{n.position}}</span>
        </div>
        <span class="item-score">{{n.total}}分</span>
      </li>
    </ul>
    <div class="search-no-data" v-show="!orgList || !orgList.length">
      <img src="../../assets/score/orgazation-tip_03.png">
    </div>
    <div class="score-tip orgScore-tip" v-show="orgList && orgList.length">
      <i class="score-tip-icon"></i><span>系统仅能查看近两年的学分情况</span>
    </div>

    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker
        :columns="departmentKeys"
        :loading="isLoadOrgData"
        :show-toolbar="true"
        title="请选择中心组织架构"
        @cancel="cancelSelect"
        @confirm="confirmSelect" />
    </van-popup>

  </div>
</template>
<script>
  import 'vant/lib/popup/style';
  import 'vant/lib/picker/style';

  import {getOrganizationList} from '../../api/organization'
  import {transformTime} from '../../utils/DateUtil'
  import {eventBus, ORG_SCORE_SET, ORG_ID_SELECTED} from '../../utils/SibContaxt';

  export default{
    name: 'OrgScore',
    props:{
      orgList:{
        type: Array
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
        departments: [],
        departmentKeys: [],
        isSelectOpen: false,
        show: false,
        searchVal: '',

        isLoadOrgData: true
      }
    },
    mounted(){
      /*this.orgList = [{"userId":"daikaimin","userName":"戴凯敏","position":"高级内控经理","total":0,"avatar":"","scoreItem":[]},
        {"userId":"lizekai","userName":"李泽凯","position":"项目管理专员","total":0,"avatar":"","scoreItem":[]},
        {"userId":"wangzhihao2","userName":"王志豪","position":"CEO助理","total":0,"avatar":"","scoreItem":[]}];*/
      /*eventBus.$on(ORG_SCORE_SET, function(info){
        _this.orgList = info.data;
      })*/
    },
    methods:{
      popColumn(){
        this.show = true;
        if(!this.departments || this.departments.length == 0){
          let _this = this;
          getOrganizationList().then(function(info){
            _this.departments = info.data.data;
            _this.departments.forEach(function(itme){
              _this.departmentKeys.push( itme.name );
              _this.isLoadOrgData = false;
            })
          });
        }
      },
      /*getOrgListScores(){
        let year = this.currYear,
          quarter = this.tabss.indexOf( this.currSelectTab), dept;
        let _this = this;
        this.departments.forEach(function(item){
          if(_this.searchVal == item.name){
            dept = item.deptId;
            return false;
          }
        });
        getOrgScore({year, quarter, dept}).then(function(info){
          _this.orgList = info.data;
        })
      },*/
      checkItemScore(obj){
        let _this = this, dept;
        this.departments.forEach(function(item){
          if(_this.searchVal == item.name){
            dept = item.deptId;
            return false;
          }
        });
        /*let {begDate, endDate} = transformTime(this.year, this.quater);
        this.$router.push({
          path: "/scoreCheck",
          query: {
            deptId: dept,
            userId: obj.userId,
            begDate,
            endDate,
            studyType: ''
          }
        })*/
        this.$emit('enterSelfScore', {userId: obj.userId, deptId: dept});
      },
      cancelSelect(){
        this.show = false;
      },
      confirmSelect(picker, value, index){
        this.searchVal = picker;
        this.show = false;

        let _this = this;
        this.departments.forEach(function(item){
          if(_this.searchVal == item.name){
            /* 被选中的部门 */
//            Selected_Org.selected = item.deptId;
            _this.$emit('departmentSelect', item.id)
            return false;
          }
        });
      }
    }
  }
</script>
