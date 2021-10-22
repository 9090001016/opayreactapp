export function encryption(plainText, type = "enc") {
  var CryptoJS = require("crypto-js");
  var key = CryptoJS.enc.Utf8.parse("sblw-3hn8-sqoy19");
  var iv = CryptoJS.enc.Utf8.parse("sblw-3hn8-sqoy19");
  if (type === "enc") {
    var ciphertext = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainText),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    var New_ciphertext = ciphertext.toString();
    return New_ciphertext;
  } else {
    var rawData = CryptoJS.enc.Base64.parse(plainText);
    var key = CryptoJS.enc.Latin1.parse("sblw-3hn8-sqoy19");
    var iv = CryptoJS.enc.Latin1.parse("sblw-3hn8-sqoy19");
    var Decrpttext = CryptoJS.AES.decrypt({ ciphertext: rawData }, key, {
      iv: iv,
    });
    return Decrpttext.toString(CryptoJS.enc.Latin1);
  }
}
