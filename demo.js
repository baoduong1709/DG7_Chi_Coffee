var CryptoJS = require("crypto-js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('bao17092002', 'duonghuybao').toString();
console.log(ciphertext);
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'duonghuybao');
console.log(bytes);
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'