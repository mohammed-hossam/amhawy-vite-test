/*!

*/
import View from "./view";
import List from "./List";

var routes = [
  {
    path: "/",
    name: "لوحه المعلومات",
    icon: "nc-icon nc-bank",
    component: List,
    layout: "",
  },
  {
    path: "/view/:id",
    name: "لوحه المعلومات",
    icon: "nc-icon nc-bank",
    component: View,
    layout: "",
  },
];
export default routes;
