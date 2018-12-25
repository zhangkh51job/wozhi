<template>
    <div class="score-tip-ct">
        <h4 class="title">秘籍目录</h4>
        <div class="score-tip-content">
            <div class="tip-item" v-for="(n, index) in tipDatas" @click="swithShow(n)">
                <div class="tip-item-header">
                    {{(index+1)}}、{{n.title}}
                    <i class="arrow" :class="{'arrow-up':n.isShow}"></i>
                </div>
                <div :class="{'tip-item-detail':true, show:n.isShow}" >
                    <!--{{n.details}}-->
                    <div v-html="n.details"></div>
                    <p v-if="n.img && n.img.className=='tip-item-table'">
                        <img src="../assets/score/table.png" class="tip-item-table">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'ScoreTip',
        data(){
            return {
                tipDatas:[
                    {
                        title: '什么是学分制？',
                        details: '学分制作为团贷网的一种学习管理制度，是推动公司向学习型组织转型的制度保障。其基本特点是：以学分作为员工学习的计量单位，以取得必要的最低学分（90分）作为年度考核的标准。',
                        isShow: false
                    },
                    {
                        title: '如何获取学分？',
                        details: '根据团贷网《学分制实施方案》，员工参加各种线下学习活动均可获得相应学分，线下学习活动包括：参加培训、自主学习、技能竞赛、学习分享、知识库建设。',
                        isShow: false,
                        img:{
                            src: '../assets/score/table.png',
                            className: 'tip-item-table'
                        }
                    },
                    {
                        title: '学分考核标准是如何？',
                        details: `
                        1、学分考核周期为当年1月1日—12月31日；<br/>
                        2、年度学分满分为150分，年度学分考核标准值为90分，其中每季度所修最低学分不得低于20分；<br/>
                        3、年度内部培训必修课完成学分占标准学分比例不得低于50%，内部培训选修课学分完成占标准学分比例不得高于30%；<br/>
                        4、对于当年入职的新员工，按实际在职天数折算年度学分考核标准值。
                        `,
                        isShow: false
                    },
                    {
                        title: '学分结果如何应用？',
                        details: '学分结果应用包括“奖”和“惩”两部分，“奖”包括学分兑换礼物、现金奖励、加薪券、优先评优、优先晋升晋级等；“罚”包括通报提醒、绩效限评、以讲代学等。',
                        isShow: false
                    },
                    {
                        title: '学分如何到导入系统？',
                        details: '中心、部门、个人学习活动需进行学分登记，可联系所属中心政委申请登记；集团、公司层面学习活动需进行学分登记，由培训管理部统一进行登记导入。',
                        isShow: false
                    }
                ]
            }
        },
        methods:{
            swithShow(obj){
                obj.isShow = !obj.isShow;
            }
        }
    }
</script>
<style>
    .score-tip-ct{text-align: left;}
    .score-tip-ct .title{
        font-size: 0.50667rem;
        padding-left: 0.4rem;
        padding-top: 0.66667rem;}
    .score-tip-ct .score-tip-content{
        padding-top: 0.37333rem;
        padding-left: 0.4rem;
    }

    .score-tip-ct .tip-item{
        border-bottom: 1px solid #e6e6e6;
    }
    .score-tip-ct .tip-item-header{
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;
        font-size: 0.4rem;
        margin-top: 0.53333rem;
        margin-bottom: 0.41333rem;
    }
    .score-tip-ct .tip-item-detail{
        margin-right: 0.4rem;
        word-break: break-all;
        color: #999999;
        font-size: 0.34667rem;
        line-height: 0.58667rem;
        margin-bottom: 0.53333rem;
        display: none;;
    }
    .score-tip-ct .arrow{
        order: 1;
        display: inline-block;
        width: 0.33333rem;
        height: 0.18667rem;
        margin-right: 0.4rem;
        background-image: url("../assets/score/arrow-down.png");
        background-size: 100% 100%;
    }
    .score-tip-ct .arrow-up{
        background-image: url("../assets/score/arrow-up.png");
    }
    .score-tip-ct .tip-item-table{
        width: 9.2rem;
        height: 15.16rem;
        margin-top: 0.66667rem;
    }
    .score-tip-ct .show{
        display: block;
    }
</style>