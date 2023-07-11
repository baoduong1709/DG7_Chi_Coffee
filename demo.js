var CryptoJS = require("crypto-js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my mesge', 'secret key 13').toString();
console.log(ciphertext);
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 13');
console.log(bytes);
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'