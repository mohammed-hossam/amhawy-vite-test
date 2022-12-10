/*!

*/
import View from "./view";
import List from "./List";
import Edit from "./Edit";
import UploadedPics from "./uploadedPics";

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
  {
    path: "/edit/:id",
    name: "لوحه المعلومات",
    icon: "nc-icon nc-bank",
    component: Edit,
    layout: "",
  },
  {
    path: "/uploadedPics",
    name: "لوحه المعلومات",
    icon: "nc-icon nc-bank",
    component: UploadedPics,
    layout: "",
  },
];
export default routes;
