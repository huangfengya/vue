import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const UserCenter = () => import('components/user-center/user-center')
const Recommend = () => import('components/recommend/recommend')
const Singer = () => import('components/singer/singer')
const Rank = () => import('components/rank/rank')
const Search = () => import('components/search/search')

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
