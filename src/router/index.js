import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/instructor:id",
    name: "Instructor",
    component: () => import('../views/Instructor')
  },
  {
    path: '/student:id',
    name: 'Student',
    component: () => import('../views/Student')
  },
  {
    path: '/ta:id',
    name: 'TA',
    component: () => import('../views/TA'),
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/Reports'),
  }
];

const index = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default index
