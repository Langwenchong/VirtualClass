import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Welcome from '@/components/Welcome/Welcome.vue'
import login from '@/components/Welcome/login.vue'
import register from '@/components/Welcome/register.vue'
import forget from '@/components/Welcome/forget.vue'
import DashBoard from '@/components/DashBoard/DashBoard.vue'
import Recommend from '@/components/DashBoard/Recommend/Recommend.vue'
// import Discussion from '@/components/DashBoard/Discussion/Discussion.vue'
import Account from '@/components/DashBoard/Account/Account.vue'
import self from '@/components/DashBoard/Account/self.vue'
import editself from '@/components/DashBoard/Account/editself.vue'
import CourseIndex from '@/components/DashBoard/Recommend/Course/CourseIndex.vue'
import chart from '@/components/DashBoard/Recommend/Course/chart.vue'
import radar from '@/components/DashBoard/Recommend/Course/radar.vue'
import CourseList from '@/components/DashBoard/Recommend/Course/CourseList.vue'
import CourseSettings from '@/components/DashBoard/Recommend/Course/CourseSettings.vue'
import SearchResult from '@/components/DashBoard/SearchResult.vue'
import log from '@/components/DashBoard/Recommend/Course/log.vue'
import Calendar from '@/components/DashBoard/Recommend/Course/Calendar.vue'
import Mind from '@/components/DashBoard/Recommend/Course/Mind.vue'
// import Comment from '@/components/DashBoard/Comment/index.vue'
import TopicList from '@/components/DashBoard/Recommend/Discussion/TopicList.vue'
import TopicEditor from '@/components/DashBoard/Recommend/Discussion/TopicEditor.vue'
import Topicbbs from '@/components/DashBoard/Recommend/Discussion/Topicbbs.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      // redirect: '/login',
      alias: '/Welcome/login',
      component: Welcome,
      children: [{
        path: '/',
        name: 'root',
        component: login
      }, ]
    },
    {
      path: '/Welcome',
      // redirect: '/Welcome/login',
      // alias: '/Welcome/login',
      name: 'Welcome',
      component: Welcome,
      children: [{
          path: '/login',
          name: 'login',
          component: login
        },
        {
          path: 'register',
          name: 'register',
          component: register
        },
        {
          path: 'forget',
          name: 'forget',
          component: forget
        }
      ]
    },
    {
      path: '/DashBoard',
      name: 'DashBoard',
      component: DashBoard,
      children: [{
          path: 'SearchResult',
          name: 'SearchResult',
          component: SearchResult,
        },
        {
          path: 'Recommend',
          name: 'Recommend',
          component: Recommend
        },
        {
          path: 'CourseSettings',
          name: 'CourseSettings',
          component: CourseSettings
        },
        {
          path: 'Calendar',
          name: 'Calendar',
          component: Calendar
        },
        {
          path: 'Mind',
          name: 'Mind',
          component: Mind
        },
        // {
        //   path: 'Discussion',
        //   name: 'Discussion',
        //   component: Discussion
        // },

        // {
        //   path: 'Comment',
        //   name: 'Comment',
        //   component: Comment
        // },
        {
          path: 'Account',
          name: 'Account',
          component: Account,
          children: [{
            path: 'self',
            name: 'self',
            component: self
          }, {
            path: 'editself',
            name: 'editself',
            component: editself
          }]
        },
        {
          path: 'CourseIndex',
          name: 'CourseIndex',
          component: CourseIndex,
          children: [
            // {
            //   path: 'chart',
            //   name: 'chart',
            //   component: chart
            // },
            // {
            //   path: 'radar',
            //   name: 'radar',
            //   component: radar
            // }
            {
              path: 'log',
              name: 'log',
              component: log
            }
          ]
        },
        {
          path: 'CourseList',
          name: 'CourseList',
          component: CourseList,
        },
        {
          path: 'TopicList',
          name: 'TopicList',
          component: TopicList
        },
        {
          path: 'TopicEditor',
          name: 'TopicEditor',
          component: TopicEditor
        },
        {
          path: 'Topicbbs',
          name: 'Topicbbs',
          component: Topicbbs,
        }
      ]
    }
  ]
})
