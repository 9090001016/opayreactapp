import Cookies from "universal-cookie";

const cookies = new Cookies();
export function userAuthHeader(token = "token") {
  if (token === "no") {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  } else {
    var _cookietoken = cookies.get("instantusertoken");
    var _token = window.localStorage.getItem("instantusertoken");
    if (_cookietoken === null || _cookietoken === "" || _cookietoken === undefined) {
      window.localStorage.removeItem('instantusertoken');
      window.location.href = "/customer";
    } else {
      return {
        "X-Authorized-Token": _token,
        "Content-Type": "application/json",
      };
    }
  }
}
