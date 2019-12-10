import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // login
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: _import('404'),
    hidden: true
  },
  // dashboard
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // wms
  {
    path: '/wms',
    component: Layout,
    // redirect: '/example/table',
    name: 'WMS',
    meta: {
      title: 'wms',
      icon: 'wms',
      role: ['admin']
    },
    children: [{
      path: 'supplier',
      name: 'Supplier',
      component: _import('wms/supplier/index'),
      meta: {
        title: 'supplier',
        icon: 'supplier',
        role: ['admin']
      }
    },
    {
      path: 'product',
      name: 'Product',
      component: _import('wms/product/index'),
      meta: {
        title: 'product',
        icon: 'product',
        role: ['admin']
      }
    },
    {
      path: 'purchase',
      name: 'Purchase',
      component: _import('wms/purchase/index'),
      meta: {
        title: 'purchase',
        icon: 'purchase',
        role: ['admin']
      }
    },
    {
      path: 'order',
      name: 'Order',
      component: _import('wms/order/index'),
      meta: {
        title: 'order',
        icon: 'order',
        role: ['admin']
      }
    }
    ]
  },
  // permission
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: {
      role: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'account',
      meta: {
        title: 'account',
        icon: 'user',
        role: ['admin']
      }
    }]
  },
  // settings
  {
    path: '/settings',
    component: Layout,
    meta: {
      role: ['admin']
    },
    children: [{
      path: 'index',
      name: 'settings',
      component: _import('settings/index'),
      meta: {
        title: 'settings',
        icon: 'settings',
        role: ['admin']
      }
    }]
  },
  // *
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
