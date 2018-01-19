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
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'table', noCache: true }
    }]
  },
  {
    path: '/wms',
    component: Layout,
    redirect: '/example/table',
    name: 'WMS',
    meta: { title: 'wms', icon: 'example' },
    children: [
      {
        path: 'product',
        name: 'Product',
        component: _import('wms/product/index'),
        meta: { title: 'product', icon: 'table' }
      },
      {
        path: 'supplier',
        name: 'Supplier',
        component: _import('wms/supplier/index'),
        meta: { title: 'supplier', icon: 'tree' }
      },
      {
        path: 'purchase',
        name: 'Purchase',
        component: _import('wms/purchase/index'),
        meta: { title: 'purchase', icon: 'table' }
      },
      {
        path: 'order',
        name: 'Order',
        component: _import('tree/index'),
        meta: { title: 'order', icon: 'tree' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: { title: 'tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('form/index'),
        meta: { title: 'form', icon: 'form' }
      }
    ]
  },
  {
    path: '/complexTable',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ComplexTable',
        component: _import('table/complexTable'),
        meta: { title: 'complexTable', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

