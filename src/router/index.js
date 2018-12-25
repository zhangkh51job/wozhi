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
    {
      path: '/scoreCheck',
      name: 'ScoreCheck',
      component: () => import('../components/ScoreTap'),
        meta:{title: '学分查询'}
    },
    {
      path: '/scoreDetail',
      name: 'ScoreDetail',
      component: () => import('../components/ScoreDetail'),
      meta:{title: '学分明细'}
    },
    {
      path: '/scoreIndex',
      name: 'ScoreIndex',
      component: () => import('../components/ScoreIndex'),
      meta:{title: '学分系统'}
    },
    {
      path: '/scoreTip',
      name: 'ScoreTip',
      component: () => import('../components/ScoreTip'),
      meta:{title: '学分向导'}
    },
    {
      path: '/studyPoint',
      name: 'StudyPoint',
      component: () => import('../components/StudyPoint'),
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
