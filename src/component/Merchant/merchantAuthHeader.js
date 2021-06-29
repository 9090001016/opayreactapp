import Cookies from "universal-cookie";

const cookies = new Cookies();
export function merchantAuthHeader(token = "token") {
  
  if (token === "no") {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  } else {
    var _cookietoken = cookies.get("instantmerchanttoken");
    var _token = window.localStorage.getItem("instantmerchanttoken");
    if (_cookietoken === null || _cookietoken === "" || _cookietoken === undefined) {
      window.localStorage.removeItem('instantmerchanttoken');
      window.location.href = "/merchant";
    } else {
      return {
        "X-Authorized-Token": _token,
        "Content-Type": "application/json",
      };
    }
  }
}
