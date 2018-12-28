<template>
    <div class="score-index-ct" :style="{visibility: isLoaded?'visible':'hidden'}">
        <header>
            <img src="../assets/score/header-bg.png">
        </header>
        <div class="index-item-ct">
            <a class="index-item index-score-check" href="#/scoreCheck" @click="checkScore">
                <img src="../assets/score/index-icon1.png">
                <div>
                    <span>学分查询</span>
                    <p>查询个人及组织学分</p>
                </div>
            </a>
            <a class="index-item index-score-tip" href="#/scoreTip">
                <img src="../assets/score/index-icon2.png">
                <div>
                    <span>学分秘籍</span>
                    <p>学分管理规则</p>
                </div>
            </a>
            <a class="index-item index-sore-hope">
                <img src="../assets/score/index-icon3.png">
                <div>
                    <span>敬请期待</span>
                    <p>更多功能敬请期待</p>
                </div>
            </a>
        </div>
        <footer>
            <img src="../assets/score/bottom-bg.png">
        </footer>
    </div>
</template>
<script>
    import {isTuanDaiMember} from '../api/net-api.js';
    //    import {StudyPointInterfaceUrl} from '../api/config';
    export default{
        name: 'ScoreIndex',
        data(){
            return {
                isShowTuanDai: false,
                isLoaded: false
            }
        },
        mounted(){
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
            /*isTuanDaiMember(reqData/!*).then(*!/, function(info){
                _this.isShowTuanDai = !info.Data.IsHaveDefualtScore;/!* true表示是集团的， false表示是团贷网的 *!/*/
                _this.currShowPanel = _this.isShowTuanDai == false?'group':'tudandai';
                /* 暂时不显示 */
                _this.isShowTuanDai = false;
                sessionStorage.setItem('scoreIndex-isShowTuanDai', _this.isShowTuanDai)
                if(_this.isShowTuanDai==false){
                    _this.$router.replace({
                        path: "/scoreCheck",
                        query: {
                            isShowTuanDai: _this.isShowTuanDai
                        }
                    })
                }else{
                    _this.isLoaded = true;
                    document.title = '学分系统';
                }
           /* })*/

        },
        methods:{
            checkScore(){
                let _this = this;
                _this.$router.push({
                    path: "/scoreCheck",
                    query: {
                        isShowTuanDai: _this.isShowTuanDai
                    }
                })
            }
        }
    }
</script>
<style>
    .score-index-ct header{height: 2.26667rem;text-align: center;margin-bottom: .72rem;}
    .score-index-ct header img, .score-index-ct footer img{width: auto;height: 100%;z-index: 1}

    .score-index-ct .index-item{
        width: 8.4rem;
        height: 3.28rem;
        margin: 0 auto;
        margin-top: 0.53333rem;
        display: -ms-flexbox;
        display: flex;
        background-blend-mode: normal, normal;
        border-radius: 10px;
        text-decoration: none;;
    }
    .score-index-ct .index-item>div{text-align: left;}
    .score-index-ct .index-item span{
        display: inline-block;
        color: #fff;
        font-size: 0.56rem;
        margin-top: 0.9rem;
    }
    .score-index-ct .index-item p{
        font-size: 0.32rem;
        margin-top: 0.23333rem;
        color: rgba(255, 255, 255, 0.8);
    }
    .score-index-ct .index-score-check{
        background-image: -webkit-linear-gradient(135deg, #458ef6 0%, #5ab2f9 100%), -webkit-linear-gradient(#e8e8e8, #e8e8e8);
        background-image: -o-linear-gradient(135deg, #458ef6 0%, #5ab2f9 100%), -o-linear-gradient(#e8e8e8, #e8e8e8);
        background-image: linear-gradient(-45deg, #458ef6 0%, #5ab2f9 100%), linear-gradient(#e8e8e8, #e8e8e8);
        box-shadow: 0 5px 10px #b2cdf3;
        -webkit-box-shadow: 0 5px 10px #b2cdf3;
    }
    .score-index-ct .index-score-check>img{
        width: 1.85333rem;
        height: 1.96rem;
        margin-left: 1.10667rem;
        margin-top: 0.66667rem;
        margin-right: 0.92rem;
    }

    .score-index-ct .index-score-tip{
        background-image: -webkit-linear-gradient(135deg, #f4ba0b 0%, #f4d26c 100%), -webkit-linear-gradient(#e8e8e8, #e8e8e8);
        background-image: -o-linear-gradient(135deg, #f4ba0b 0%, #f4d26c 100%), -o-linear-gradient(#e8e8e8, #e8e8e8);
        background-image: linear-gradient(-45deg, #f4ba0b 0%, #f4d26c 100%), linear-gradient(#e8e8e8, #e8e8e8);
        -webkit-box-shadow: 0 5px 10px #f3dc97;
        box-shadow: 0 5px 10px #f3dc97;
    }
    .score-index-ct .index-score-tip>img{
        width: 1.46667rem;
        height: 1.65333rem;
        margin-left: 1.26667rem;
        margin-top: 0.81333rem;
        margin-right: 1.14667rem;
    }

    .score-index-ct .index-sore-hope{
        background-color: #f0f0f0;
    }
    .score-index-ct .index-sore-hope>img{
        width: 1.85333rem;
        height: 1.8rem;
        margin-left: 1.10667rem;
        margin-top: 0.81333rem;
        margin-right: 1.02667rem;
    }
    .score-index-ct .index-sore-hope span{
        color: #999;
    }
    .score-index-ct .index-sore-hope p{
        color: #ccc;
    }
    .score-index-ct footer{
        position: absolute;
        left: 0;
        right: 0;
        z-index: -1;
        bottom: 0;
        height: 3.14667rem;
    }

</style>