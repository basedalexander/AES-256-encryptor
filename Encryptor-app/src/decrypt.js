const decrypt = require('./lib/aes256').decrypt;

// type: Base64 string
const ENCRYPTED_TEXT_BASE64 = ``;

// type: UTF8 string
const PASSWORD = '';
const SALT = null; // if SALT ommited, the password is going the be the salt.

const decryptedText = decrypt(ENCRYPTED_TEXT_BASE64, PASSWORD, SALT);

console.log(`[decrypted: ] ${decryptedText}`);

// Print json as object
// console.log(JSON.parse(decryptedText))