import Cookies from "universal-cookie";

const cookies = new Cookies();
export function merchantAuthHeader(token = "token") {
  
  if (token === "no") {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  } else {
    var _cookietoken = cookies.get("onepaymerchanttoken");
    var _token = window.localStorage.getItem("onepaymerchanttoken");
    if (_cookietoken === null || _cookietoken === "" || _cookietoken === undefined) {
      window.localStorage.removeItem('onepaymerchanttoken');
      window.location.href = "/onePayMerchantLogin";
    } else {
      return {
        "X-Authorized-Token": _token,
        "Content-Type": "application/json",
      };
    }
  }
}
