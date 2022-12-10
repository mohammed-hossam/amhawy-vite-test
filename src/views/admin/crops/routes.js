/*!

*/
import List from "./List";
import VarietiesList from "./VarietiesList";

var routes = [
  {
    path: "/",
    component: List,
    layout: "",
  },
  {
    path: "/:id",
    component: VarietiesList,
    layout: "",
  },
];
export default routes;
