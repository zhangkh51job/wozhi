<template>
  <div class="page score-page" v-if="pageData">
    <div class="rank-ct">
      <div class="total-rank-ct">
        <div class="total-rank-bg">
          <div class="total-rank-num">
            {{pageData.TotalRank}}
          </div>
          <p>
            总排名
          </p>
          <p>
            打败
            <i class="total-rank-rate">
              {{pageData.TotalPer}}
            </i>
          </p>
        </div>
      </div>
      <ul class="rank-list">
        <li class="li-quarter">
          <div class="num">
            {{pageData.QuarterRank}}
          </div>
          <p>季排名</p>
          <p>打败{{pageData.QuarterPer}}</p>
        </li>
        <li class="li-month">
          <div class="num">
            {{pageData.MonthRank}}
          </div>
          <p>月排名</p>
          <p>打败{{pageData.MonthPer}}</p>
        </li>
        <li class="rank-list-no-bg li-day">
          <div class="num">
            {{pageData.DayRank}}
          </div>
          <p>日排名</p>
          <p>打败{{pageData.DayPer}}</p>
        </li>
      </ul>
    </div>
    <div class="score-ct">
      <ul class="group-score-list">
        <li>
          <div>
            <div class="total-score">
              {{pageData.TotalScore}}
            </div>
            <p>总学分</p>
            <div class="mark total-score-mark"></div>
          </div>
        </li>
        <li class="rank-list-no-bg">
          <div>
            <div class="month-score">
              {{pageData.MonthScore}}
            </div>
            <p>月度分</p>
            <div class="mark month-score-mark"></div>
          </div>
        </li>
      </ul>
      <div class="score-detail-ct">
        <div class="score-item">
          <span class="signin-ct">
            <label>签到学分：</label>
            <i>
              {{pageData.SignScore}}
            </i>
          </span>
          <span class="signin-month-ct">
            <label>月度签到分：</label>
            <i>
              {{pageData.MonthSignScore}}
            </i>
          </span>
        </div>
        <div class="score-item">
          <span class="course-ct">
            <label>课程学分：</label>
            <i>
              {{pageData.CourseScore}}
            </i>
          </span>
          <span class="course-month-ct">
            <label>月度课程分：</label>
            <i>
              {{pageData.MonthCourseScore}}
            </i>
          </span>
        </div>
        <div class="score-item">
          <span class="others-ct">
            <label>其他学分：</label>
            <i>
              {{pageData.OtherScore}}
            </i>
          </span>
          <span class="others-month-ct">
            <label>月度其他分：</label>
            <i>
              {{pageData.MonthOtherScore}}
            </i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getGroupScore} from '../../api/net-api'
  export default{
    name: 'GroupScore',
    data(){
      return {
        pageData: null
      }
    },
    mounted(){
      let _this = this;
      getGroupScore({
        "Ip": "",
        "MethodName": "",
        SystemName: sessionStorage.getItem('SystemName') ? sessionStorage.getItem('SystemName') : "IOS",
        AppKey:sessionStorage.getItem('AppKey') ? sessionStorage.getItem('AppKey') : "E64E0F12-070F-4CEA-ADAB-F83F05D62C91",
        UserId: sessionStorage.getItem('UserId') ? sessionStorage.getItem('UserId') : '884DFD92740A67C8',//"3C27A48733B47D41353DA74B05E03902",//chenmin
        Token: sessionStorage.getItem('Token') ? sessionStorage.getItem('Token') : "ddddddd",//liuhao
        Version: sessionStorage.getItem('Version') ? sessionStorage.getItem('Version') : "1.0.0",
        ts: new Date().getTime()//时间戳 防止缓存后台响应
        ,baseURL: 'http://xyapi.ipaison.xyz'
      }/*).then(*/, function(data){
        _this.pageData = data.Data;
      }, function(error){
        /*_this.pageData = {"TotalRank":665,"TotalPer":"91%","QuarterRank":348,"QuarterPer":"95%","MonthRank":325,"MonthPer":"95%","DayRank":41,"DayPer":"99%","TotalScore":860,"SignScore":820,"CourseScore":40,"OtherScore":0,"MonthScore":0,"MonthSignScore":0,"MonthCourseScore":0,"MonthOtherScore":0};*/
        alert('请求错误！');
      })
    }
  }
</script>
