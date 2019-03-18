import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/sign',
      component: () => import('../components/signHeader'),
      children: [
        {
          path: '/signIn',
          name: 'signInPage',
          component: () => import('../components/sign/SignIn'),
          meta:{title: '签到'}
        },
        {
          path: '/signInResult',
          name: 'SignInResultPage',
          component: () => import('../components/sign/SignInResult'),
          meta:{title: '签退'}
        }
      ]
    },
    /*{
      path: '/scoreCheck',
      name: 'ScoreCheck',
      component: () => import('../components/ScoreTap'),
        meta:{title: '学分系统'}
    },*/
    {
      path: '/scoreDetail',
      name: 'ScoreDetail',
      //component: () => import('../components/ScoreDetail'),
        component: resolve => require(['@/components/ScoreDetail'], resolve),
      meta:{title: '学分明细'}
    },
{
    path: '/scoreIndex',
    name: 'ScoreIndex',
    //component: () => import('../components/ScoreIndex'),
    component: resolve => require(['@/components/ScoreIndex'], resolve),
    children: [
  {
    path: 'scoreWrap',
    name: 'scoreWrap',
    //component: () => import('../components/ScoreWrap'),
    component: resolve => require(['@/components/ScoreWrap'], resolve),
  children: [
    {
      path: '',
      name: 'ScoreGuide',
      //component: () => import('../components/score/ScoreGuide'),
      component: resolve => require(['@/components/score/ScoreGuide'], resolve),
  meta:{title: '我的学分'}
    },
    {
      path: 'tuandaiScoreCheck',
      name: 'tuandaiScoreCheck',
      //component: () => import('../components/score/TuandaiScore'),
      component: resolve => require(['@/components/score/TuandaiScore'], resolve),
  meta:{title: '学分查询'}
},
  {
    path: 'scoreGuide',
        name: 'ScoreGuide',
      //component: () => import('../components/score/ScoreGuide'),
    component: resolve => require(['@/components/score/ScoreGuide'], resolve),
      meta:{title: '学分系统'}
  },
      ]
},

      {
          path: 'tuandaiScoreCheck',
          name: 'tuandaiScoreCheck',
          //component: () => import('../components/score/TuandaiScore'),
  component: resolve => require(['@/components/score/TuandaiScore'], resolve),
          meta:{title: '签到查询'}
      }
    ]
  //meta:{title: '学分系统'}
  },
    {
      path: '/scoreTip',
      name: 'ScoreTip',
      //component: () => import('../components/ScoreTip'),
        component: resolve => require(['@/components/ScoreTip'], resolve),
      meta:{title: '学分向导'}
    },
    {
      path: '/studyPoint',
      name: 'StudyPoint',
      //component: () => import('../components/StudyPoint'),
        component: resolve => require(['@/components/StudyPoint'], resolve),
      meta:{title: '学点详情'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export default router
