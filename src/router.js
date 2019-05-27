import Vue from 'vue'
import Router from 'vue-router'
import TMLogin from './views/TMLogin.vue'
import TMUserRegister from './views/TMUserRegister.vue'
import TMHome from './views/TMHome.vue'
import TMOrder from './views/TMOrder.vue'
import TMAccount from './views/TMAccount.vue'
import TMHotel from './views/TMHotel.vue'
import TMTourism from './views/TMTourism.vue'
import manage from './views/TMManage.vue'
import userList from './views/userList.vue'
import shopList from './views/shopList.vue'
import commodityList from './views/commodityList.vue'
import orderList from './views/orderList.vue'
import addCommodity from './views/addCommodity.vue'
import addShop from './views/addShop.vue'
import checkStrategy from './views/checkStrategy.vue'
import airTicket from './views/TMAirTicket.vue'
import independentTravel from './views/TMIndependentTravel.vue'
import strategy from './views/TMStrategy.vue'
import adminSet from './views/adminSet.vue'
import adminLogin from './views/adminLogin.vue'
import commodityDetail from './views/TMCommodityDetail.vue'
import visitor from './views/visitor.vue'
import TMTourList  from './views/TMTour/TMTourList.vue'
import TMTourDetail  from './views/TMTour/TMTourDetail.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
          path: '/login',
          name: 'login',
          component: TMLogin
      },
      {
          path: '/userRegister',
          name: 'userRegister',
          component: TMUserRegister
      },
      {
          path: '/home',
          name: 'home',
          component: TMHome
      },
      {
          path: '/order',
          name: 'order',
          component: TMOrder
      },
      {
          path: '/account',
          name: 'account',
          component: TMAccount,
      },
      {
          path: '/hotel',
          name: 'hotel',
          component: TMHotel
      }
      ,
      {
          path: '/adminLogin',
          name: 'adminLogin',
          component: adminLogin
      }
      ,
      {
          path: '/manage',
          component: manage,
          name: '',
          children: [{
              path: '/userList',
              component: userList,
              meta: ['数据管理', '用户列表'],
          },
              {
              path: '/shopList',
              component: shopList,
              meta: ['数据管理', '商家列表'],
          },
              {
              path: '/commodityList',
              component: commodityList,
              meta: ['数据管理', '商品列表'],
          },
              {
              path: '/orderList',
              component: orderList,
              meta: ['数据管理', '订单列表'],
          },
              {
              path: '/checkStrategy',
              component: checkStrategy,
              meta: ['数据管理', '攻略审核'],
          },
              {
                  path: '/addCommodity',
                  component: addCommodity,
                  meta: ['添加数据', '添加商品'],
              },
             {
                   path: '/addShop',
                  component: addShop,
                  meta: ['添加数据', '添加店铺'],
              },{
                   path: '/adminSet',
                  component: adminSet,
                  meta: ['设置', '管理员设置'],
              },{
                   path: '/visitor',
                  component: visitor,
                  meta: ['图表', '数据统计分布'],
              },]
      }
      ,
      {
          path:'/tourism',
          name:'tourism',
          component:TMTourism,
      }
      ,
      {
          path:'/airTicket',
          name:'airTicket',
          component:airTicket,
      },
      {
          path:'/independentTravel',
          name:'independentTravel',
          component:independentTravel,
      },
      {
          path:'/strategy',
          name:'strategy',
          component:strategy,
      },
      {
          path:'/commodityDetail',
          name:'commodityDetail',
          component:commodityDetail,
      },{
          path:'/myOrder',
          name:'myOrder',
          component:myOrder,
      },{
          path:"/tourList",
          name:"tourList",
          component:TMTourList
      },{
          path:"/tourDetail",
          name:"tourDetail",
          component:TMTourDetail
      }
  ]
})


