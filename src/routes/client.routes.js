/**
 * public routes
 */

import accountPage from 'views/client/account/index';
import requestsPage from 'views/client/requests/Index';
import addForm from 'views/client/newCrop/addForm';
import mailPage from 'views/client/mail/Index';
import farmsPage from 'views/client/farms/Index';
import waitingPage from 'views/client/waiting/Index';

// import loanPage from 'views/client/loan/Loan';

var routes = [
  {
    path: '/',
    component: accountPage,
    layout: '/client',
  },
  {
    path: '/requests',
    component: requestsPage,
    layout: '/client',
  },
  {
    path: '/code',
    component: addForm,
    layout: '/client',
  },
  {
    path: '/mail',
    component: mailPage,
    layout: '/client',
  },
  {
    path: '/farms',
    component: farmsPage,
    layout: '/client',
  },
  {
    path: '/waiting',
    component: waitingPage,
    layout: '/client',
  },
  // {
  //   path: '/loan',
  //   component: loanPage,
  //   layout: '/client',
  // },
];
export default routes;
