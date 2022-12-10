import Dashboard from "views/admin/dashboard/Index";
import UsersList from "views/admin/users/Index";
// import RequestsList from "views/admin/Requests/Index";
import InitialRequestsList from "views/admin/InitialRequests/Index";
import CropsList from "views/admin/crops/Index";
// import LocationsList from 'views/admin/locations/Index';
import SendForm from "views/admin/notifications/SendForm";
// import postsList from 'views/admin/post/Index';
// import TopicsList from 'views/admin/topic/Index';
import Reports from "views/admin/reports/index";
// import CombinedMap from 'views/admin/combinedMap';
// import TablesMap from 'views/admin/tablesMap';
// import PointsMap from 'views/admin/pointsMap';
// import Stores from 'views/admin/Stores/Index';
import DocumentsList from "views/admin/Documents/Index";

// import EsriMain from 'views/admin/maps';

// import UserPage from "views/User.js";
const roles = {
  admin: "324FC5612ce4E",
  client: "954VC58412cH1M",
};
var routes = [
  {
    path: "/",
    name: "لوحة المعلومات",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "",
    roles: [roles.admin, roles.client],
  },
  // {
  //   path: "/requests",
  //   name: "طلبات التكويد",
  //   icon: "nc-icon nc-tile-56",
  //   component: RequestsList,
  //   layout: "/",
  // },
  {
    path: "initialRequests",
    name: "طلبات التقديم",
    icon: "nc-icon nc-tile-56",
    component: InitialRequestsList,
    layout: "",
    roles: [roles.admin, roles.client],
  },
  // {
  //   path: '/stores',
  //   name: 'مراكز التعبئة',
  //   icon: 'fa fa-store',
  //   component: Stores,
  //   layout: '/',
  // },
  {
    path: "documents",
    name: "المستندات",
    icon: "nc-icon nc-tile-56",
    component: DocumentsList,
    layout: "",
    roles: [roles.admin, roles.client],
  },
  // {
  //   path: '/combinedMap',
  //   name: 'الخريطة المجمعة',
  //   icon: 'fas fa-map',
  //   component: CombinedMap,
  //   layout: '/',
  // },
  // {
  //   path: '/tablesMap',
  //   name: 'تنسيق الجداول',
  //   icon: 'fas fa-map',
  //   component: TablesMap,
  //   layout: '/',
  // },
  // {
  //   path: '/pointsMap',
  //   name: 'خريطة النقاط',
  //   icon: 'fas fa-map',
  //   component: PointsMap,
  //   layout: '/',
  // },
  // {
  //   path: '/combinedMap',
  //   name: 'الخريطة المجمعة',
  //   icon: 'fas fa-map',
  //   component: CombinedMap,
  //   layout: '/',
  // },
  {
    path: "reports",
    name: "التقارير",
    icon: "nc-icon nc-single-copy-04",
    component: Reports,
    layout: "",
    roles: [roles.admin, roles.client],
  },
  {
    path: "users",
    name: " المستخدمين",
    icon: "nc-icon nc-single-02",
    component: UsersList,
    layout: "",
    roles: [roles.admin, roles.client],
  },
  {
    path: "crops",
    name: "المحاصيل الزراعية ",
    icon: "fas fa-seedling",
    component: CropsList,
    layout: "",
    roles: [roles.admin, roles.client],
  },
  // {
  //   path: '/locations',
  //   name: ' المناطق',
  //   icon: 'nc-icon nc-pin-3',
  //   component: LocationsList,
  //   layout: '/',
  // },
  {
    path: "send",
    name: "إرسال رسالة تنبية",
    icon: "nc-icon nc-bell-55",
    component: SendForm,
    layout: "",
    roles: [roles.admin],
  },
  // {
  //   path: '/post',
  //   name: 'الاخبار',
  //   icon: 'nc-icon nc-paper',
  //   component: postsList,
  //   layout: '/',
  // },
  // {
  //   path: '/topic',
  //   name: 'الفئات',
  //   icon: 'fa fa-list-alt',
  //   component: TopicsList,
  //   layout: '/',
  // },

  // {
  //   path: '/maps',
  //   name: 'الخرائط',
  //   icon: 'fa fa-map',
  //   component: EsriMain,
  //   layout: '/',
  // },
];
export default routes;
