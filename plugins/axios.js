const Cookie = process.client ? require("js-cookie") : undefined;
import * as axios from "axios";

let options = {};
let accessToken
// The server-side needs a full url to works
if (process.server) {
  console.log("server");
  options.baseURL = `http://${process.env.HOST || "localhost"}:${process.env
    .PORT || 3000}`;
  accessToken = 'null'
}
if (process.client) {
  const auth = Cookie.get("auth");
  const cookie = JSON.parse(auth);
  accessToken  = cookie.accessToken
}

export default axios.create(options);
