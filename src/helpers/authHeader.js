import Cookies from "universal-cookie";

const cookies = new Cookies();
export function authHeader(token = "token") {
  if (token === "no") {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  } else {
    var _cookietoken = cookies.get("token");
    var _token = window.localStorage.getItem("token");
    if (_cookietoken === null || _cookietoken === "" || _cookietoken === undefined) {
      window.localStorage.removeItem('token');
      window.location.href = "/admin";
    } else {
      return {
        "X-Authorized-Token": _token,
        "Content-Type": "application/json",
      };
    }
  }
}
