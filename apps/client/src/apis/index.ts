import * as auth from "./auth";
import * as organization from "./organization";
import * as metric from "./metric";
import * as customer from "./customer";
import * as plan from "./plan";

const api = {
  auth,
  metric,
  plan,
  customer,
  organization,
};

export default api;
