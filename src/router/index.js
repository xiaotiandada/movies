import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/movie/:title',
      name: 'Detail',
      component: Detail
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
