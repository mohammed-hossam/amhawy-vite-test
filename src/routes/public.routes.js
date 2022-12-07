/**
 * public routes
 */
import landingPage from "views/public/landing/index";
import Error404Page from "views/public/errors/404";

/**
 * protected routes
 */

import LoginForm from "views/public/Login/LoginForm";
import contactPage from "views/public/pages/contact";
import privacyPage from "views/public/pages/privacy";
import searchPage from "views/public/search/index";
// import cropsPage from 'views/public/crops/all';
// import countriesPage from 'views/public/countries/countries';
import Forget from "views/public/Login/Forget";
import Topic from "views/public/news/topic/index";
import Post from "views/public/news/post/index";
// import Crop02 from 'views/public/crops/sub/02';
// import Crop04 from 'views/public/crops/sub/04';
// import Crop07 from 'views/public/crops/sub/07';
// import Crop01 from 'views/public/crops/sub/01';
// import Crop03 from 'views/public/crops/sub/03';
// import Crop10 from 'views/public/crops/sub/10';
// import Crop08 from 'views/public/crops/sub/08';
// import Crop12 from 'views/public/crops/sub/12';
// import Crop05 from 'views/public/crops/sub/05';
// import Crop06 from 'views/public/crops/sub/06';
// import Crop11 from 'views/public/crops/sub/11';
// import Crop09 from 'views/public/crops/sub/09';
// import Crop14 from 'views/public/crops/sub/14';
import ResetPassword from "views/public/Login/ResetPassword";

var routes = [
  {
    path: "/",
    name: "landing page",
    component: landingPage,
    layout: "/",
  },
  {
    path: "/404",
    name: "404",
    component: Error404Page,
    layout: "",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
    layout: "",
  },
  {
    path: "/forget",
    name: "Login",
    component: Forget,
    layout: "",
  },
  {
    path: "/contact",
    component: contactPage,
    layout: "",
  },
  {
    path: "/privacy",
    component: privacyPage,
    layout: "",
  },

  // {
  //   path: '/crop/02',
  //   component: Crop02,
  //   layout: '',
  // },
  // {
  //   path: '/crop/04',
  //   component: Crop04,
  //   layout: '',
  // },
  // {
  //   path: '/crop/07',
  //   component: Crop07,
  //   layout: '',
  // },
  // {
  //   path: '/crop/01',
  //   component: Crop01,
  //   layout: '',
  // },
  // {
  //   path: '/crop/03',
  //   component: Crop03,
  //   layout: '',
  // },
  // {
  //   path: '/crop/10',
  //   component: Crop10,
  //   layout: '',
  // },
  // {
  //   path: '/crop/08',
  //   component: Crop08,
  //   layout: '',
  // },
  // {
  //   path: '/crop/12',
  //   component: Crop12,
  //   layout: '',
  // },
  // {
  //   path: '/crop/05',
  //   component: Crop05,
  //   layout: '',
  // },
  // {
  //   path: '/crop/06',
  //   component: Crop06,
  //   layout: '',
  // },
  // {
  //   path: '/crop/11',
  //   component: Crop11,
  //   layout: '',
  // },
  // {
  //   path: '/crop/09',
  //   component: Crop09,
  //   layout: '',
  // },
  // {
  //   path: '/crop/14',
  //   component: Crop14,
  //   layout: '',
  // },
  // {
  //   path: '/crops',
  //   component: cropsPage,
  //   layout: '',
  // },
  // {
  //   path: '/countries',
  //   component: countriesPage,
  //   layout: '',
  // },
  {
    path: "/search",
    component: searchPage,
    layout: "",
  },
  {
    path: "/posts/",
    component: Topic,
    layout: "",
  },
  {
    path: "/post/:id",
    component: Post,
    layout: "",
  },
  {
    path: "/resetPassword",
    name: "Reset Password",
    component: ResetPassword,
    layout: "",
  },
];
export default routes;
