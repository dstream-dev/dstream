import * as auth from "./auth";
import * as organization from "./organization";
import * as metric from "./metric";
import * as customer from "./customer";
import * as plan from "./plan";
import * as event from "./event";

const api = {
  auth,
  metric,
  plan,
  customer,
  event,
  organization,
};

export default api;
