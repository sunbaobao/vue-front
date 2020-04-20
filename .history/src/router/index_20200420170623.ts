import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import stores from '../store';
import router1 from '../components/router1.vue';
import router2 from "../components/router2.vue";
import store from "../components/store.vue";
import Main1 from '../components/ContentMain.vue';
import faceDetect from '../components/Baidu/FaceDetect.vue';
import orc from '../components/Baidu/orc.vue';
import user from '../components/user.vue';
import bigFile from '../components/demo/bigFile.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
      path: '/',
      name: 'main1',
      component: Main1,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'router1/:id',
          component: router1,
          props: true
        },
      ]
    },
    {
      path: "/router1",
      name: "router1",
      component: router1
    },
    {
      path: "/router2",
      component: router2
    },
    {
      path: '/store',
      component: store
    },
    {
      path: '/faceDetect',
      component:() => import(/* webpackChunkName: "group-foo" */ '../components/Baidu/FaceDetect.vue')
    },
    {
      path: '/orc',
      component: orc
    },
    {
      path: '/user',
      component: user
    },
    {
      path: '/demo/bigFile',
      component: bigFile
    }
  ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    const token = localStorage.getItem('Authorization');
    // console.log("2",token);
    if (token === null || token === '') {
      // next('/login');
      stores.commit("changeLogin", true);
    } else {
      next();
    }
  }
});
export default router;
