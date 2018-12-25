<template>
    <div v-if="pageData" :class="{'study-point-page':true, 'study-point-page-show':pageShow}">
        <h1 class="title">{{pageData.Title?pageData.Title:'没有标题，用于测试'}}</h1>
        <p class="subtitle">
            <span class="publisher">{{pageData.Publisher?pageData.Publisher:'我知学院'}}</span>
            <time class="time" :datetime="pageData.PublishTime">{{pageData.PublishTime}}</time>
        </p>
        <div>
            <img :src="pageData.Img">
        </div>
        <div class="audio-ct" v-if="pageData.AudioUrl">
            <audio id="audioId"
                   :src="pageData.AudioUrl"
                   loop preload="auto"
                   @canplay="audioCanPlay"
                   @loadedmetadata="loadedmetadata"
                   @timeupdate="playProgress">
            </audio>
            <!--<mpvoice frameborder="0" class="" :src="pageData.AudioUrl" isaac2="1" low_size="627.39" source_size="627.4" high_size="2457.07" name="第56期：拖延症的自我修养" play_length="314000" voice_encode_fileid="MzU2NzA3MjY4M18xMDAwMDQ0OTU="></mpvoice>-->
            <div class="Audio">
                <div :class="{'icon-btn':true, 'icon-play':!audioPause, 'icon-pause':audioPause}" @click="switchPlay"></div>
                <div class="audio-info">
                    <div class="audio-name">{{pageData.AudioName}}</div>
                    <div class="audio-origin">来自我知学院</div>
                    <div class="progress-ct" @mousedown="mouseDown">
                        <div class="progress-bg"></div>
                        <div class="progress-play" id="progress" ></div>
                        <span class="progress-button" v-drag2 ></span>
                    </div>
                    <div class="auto-time-ct">
                        <span class="played-time">{{autoCurrTimeFormat}}</span>
                        <span class="audio-time" id="audioTime">{{audioDurationFormat}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-html="pageData.Content" class="content"></div>
        <van-popup v-model="isInWeiXin" position="top" :overlay="true">
            <img src="../assets/score/guide_tips.png">
        </van-popup>
        <div class="page-bottom" v-if="notInWoZhiColleage">
            <img src="../assets/score/logo.png">
            <span class="name">我知学院APP</span>
            <a class="open-btn" @click="openPointPage">打开</a>
        </div>
    </div>
</template>
<script>
    import '../css/score/study-point.css';
    import {Dialog} from 'vant';
    import 'vant/lib/dialog/style';
    import {getStudyPointDetail} from '../api/score';
    import {eventBus} from '../utils/SibContaxt';
    import {showShareBtn} from '../utils/appContaxt';
    import {androidDownLoadUrl, iosDownLoadUrl, StudyPointInterfaceUrl} from '../api/config';
    import Vue from 'vue';

    Vue.use(Dialog);

    export default{
        name: 'StudyPoint',
        data(){
            return {
                pageData: null,
                audioPause: true,

                autoCurrTimeFormat: '00:00',
                audioDuration: 0,
                audioDurationFormat: '',

                audioInterval:0,
                pageShow: false,
                notInWoZhiColleage: false,
                isInWeiXin: false
            }
        },
        beforeMount(){
            /* 适配学点内容 */
            document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=1.0')
        },
        mounted(){
            let _this = this;
            eventBus.$on('drag2Start', function(){
                document.querySelector('#audioId').pause();
            });
            eventBus.$on('drag2End', function(){
                _this.gotoPlayPosition();
            });
            let reqData = {
                "Ip": "",
                "SystemName": "",
                "Version": "1.0.0",
                Token: sessionStorage.getItem('Token') ? sessionStorage.getItem('Token') : "ddddddd",//liuhao
                UserId: sessionStorage.getItem('UserId') ? sessionStorage.getItem('UserId') : "6A67A284578BD33E",
                "MethodName": "",
                "Data": sessionStorage.getItem('SubjectId') ? sessionStorage.getItem('SubjectId') : "63baf3fc-ab22-4551-9aa9-3d81cd5d3d50",
                baseURL: StudyPointInterfaceUrl
            };
            getStudyPointDetail(reqData).then((info) => {
                this.pageData = info.data.Data;
                this.flexiblePage()
            })
            this.notInWoZhiColleage = !navigator.userAgent.match(/wozhiColleage/gi);
        },
        methods:{
            checkVariable(){
//                showShareBtn();
                let _this = this;
                if (navigator.userAgent.match(/wozhiColleage/gi)){
                 showShareBtn();
                 }else if (navigator.userAgent.match(/MicroMessenger/ig)){
                 this.isInWeiXin = true;
                 }else {
                    let _this = this;
                    Dialog.confirm({
                        title: '提示',
                        message: '是否打开我知APP'
                    }).then(() => {
                        _this.openPointPage();
                    }).catch(() => {
                    });
                }
            },
            openPointPage(){
                if (navigator.userAgent.match(/MicroMessenger/ig)){
                    this.isInWeiXin = true;
                }else{
                    let nowTime = new Date().valueOf();
                    let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
                    setTimeout(function(){
                        /* let launchTime = new Date().valueOf() - nowTime;
                         if(launchTime < 28){ */    //28是调试估算出来的打开本地app基本需要的时间
                        if(isAndroid){
                            window.location =  androidDownLoadUrl;
                        }else{
                            window.location =  iosDownLoadUrl;
                        }
                        /* }*/
                    },200);
                    //自己定义的scheme协议
                    window.location="wzc://xy.ipaison.cn/colleage-mobile/web/dist/index.html#/studyPoint?SubjectId="+(sessionStorage.getItem('SubjectId') ? sessionStorage.getItem('SubjectId') : "63baf3fc-ab22-4551-9aa9-3d81cd5d3d50");
                }
            },
            flexiblePage(){
                let _this = this;
                setTimeout(function(){
                    _this.pageShow = true;
                }, 350);
                setTimeout(function(){
                    _this.checkVariable();
                }, 1000)
            },
            switchPlay(){
                this.audioPause = !this.audioPause;
//                alert(this.audio.hasOwnProperty('pause'))
                let audioDom = document.querySelector('#audioId');
                if(this.audioPause){
                    audioDom.pause();
                }else{
                    audioDom.play();
                }
            },
            loadedmetadata(e){
                this.audioDuration = e.target.duration;
                this.audioDurationFormat = this.timeFormat(this.audioDuration);
            },
            mouseDown(e){
                let totalW = parseFloat( window.getComputedStyle(document.querySelector('.progress-ct'), null)['width']);
                let btnW = parseFloat( window.getComputedStyle(document.querySelector('.progress-button'), null)['width']);
                let posPecent = e.offsetX/(totalW- btnW/2);

                let audioDom = document.querySelector('#audioId');
                audioDom.currentTime = posPecent*audioDom.duration;
                this.playProgress();
                audioDom.play();
                this.audioPause = false;
            },
            playProgress(){
                let audioDom = document.querySelector('#audioId');
                this.autoCurrTimeFormat = this.timeFormat(audioDom.currentTime);
                let autoCurrPlayPosition = Math.abs( audioDom.currentTime / audioDom.duration * 100 );
                let playPos = document.querySelector('.progress-button');
                let posStr = autoCurrPlayPosition+'%';
                playPos.style.left = `calc(${posStr} - 0.4rem)`;
                document.querySelector('#progress').style.width = posStr;
            },
            gotoPlayPosition(){
                let totalW = parseFloat( window.getComputedStyle(document.querySelector('.progress-ct'), null)['width']);
                let btnW = parseFloat( window.getComputedStyle(document.querySelector('.progress-button'), null)['width']);
                let currPos = parseFloat( window.getComputedStyle(document.querySelector('.progress-button'), null)['left']);
                let posPecent = currPos/(totalW- btnW/2);

                let audioDom = document.querySelector('#audioId');
                audioDom.currentTime = posPecent*audioDom.duration;
                this.playProgress();
                audioDom.play();
                this.audioPause = false;
            },
            audioCanPlay(){
                /* 不支持timeupdate事件时备用 */
                /*this.audioInterval = setInterval(() => {
                 /!* this.audioWidth = this.add(this.audioWidth, step)*!/
                 let audioDom = document.querySelector('#audioId');
                 this.autoCurrTimeFormat = this.timeFormat(audioDom.currentTime);
                 let autoCurrPlayPosition = Math.abs( audioDom.currentTime / audioDom.duration * 100 );
                 let playPos = document.querySelector('.progress-button');
                 playPos.style.left = "calc((autoCurrPlayPosition+'%') - 0.4rem)";
                 document.querySelector('#progress').style.width = autoCurrPlayPosition+'%';
                 }, 1000)*/
            },
            timeFormat(num){
                if(num <= 0) return '00:00';
                num = num << 0;
                let hour = Math.floor(num/3600),
                        minute = Math.floor((num - hour*3600)/60),
                        second = num - hour*3600 - 60*minute;
                var str = '';
                if(hour){
                    if(hour < 10)
                        str += '0'+hour;
                    else str += hour;
                }
                if(minute < 10){
                    if(str){
                        str += ':0'+ minute;
                    }else{
                        str += '0'+ minute;
                    }
                }else{
                    str += minute;
                }
                if(second < 10){
                    str += ':0'+ second;
                }else{
                    str += ':'+second;
                }
                return str;
            }
        }
    }
</script>