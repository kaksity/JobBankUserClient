import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/auth/TheLogin.vue';
import Register from '@/views/auth/Register.vue';
import Layout from '@/views/layouts/AppLayout.vue';
import LayoutWithoutSidebar from '@/views/layouts/AppLayoutWithoutSidebar.vue';


Vue.use(Router);

/**
 * TIPS:
 * meta: {
 *   hidden: false,    // If `hidden:true` will not appear in the navigation bar or sidebar(default is false)
 *   auth: [],         // It will control the page roles (you can set multiple roles)
 *   icon: 'home',     // Icon will appear in the navigation bar or sidebar
 *   hasMulSub: false, // It has multiple children
 * }
 */
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    redirect: { name: 'Profile' },
    meta: {
      hidden: true,
    },
  },
  {
    path: '/index',
    name: 'Index',
    component: Layout,
    redirect: { name: 'Profile' },
    meta: {
      hidden: false,
      hasMulSub: false,
    },
    children: [{
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile/Index.vue'),
      meta: {
        icon: 'dashboard',
      },
    },
    {
      path: '/photo',
      name: 'Photo',
      component: () => import('@/views/photo/Photo.vue'),
      meta: {
        icon: 'dashboard',
      },
    },
    {
      path: '/qualifications',
      name: 'Qualification',
      component: () => import('@/views/qualifications/Qualification.vue'),
      meta: {
        icon: 'dashboard',
      },
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: () => import('@/views/me/ChangePassword.vue'),
      meta: {
        hidden: true,
      },
    },
    {
      path: '/work-experiences',
      name: 'Work Experience',
      component: () => import('@/views/work-experience/WorkExperience.vue'),
      meta: {
        icon: 'dashboard',
      },
    },
    {
      path: '/additional-skills',
      name: 'Additional Skills',
      component: () => import('@/views/additional-skills/AdditionalSkills.vue'),
      meta: {
        icon: 'dashboard',
      },
    },
    ],
  },
  {
    path: '/403',
    meta: {
      hidden: true,
    },
    // redirect: { name: 'Index' },
    component: Login,
  },
  {
    path: '/404',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/error-pages/App404.vue'),
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
  ],
});
