// initial gist source: https://gist.github.com/daniellittledev/f53cf6a5e571a84a358e
// docs on crypto-js where input/output formats are explained https://cryptojs.gitbook.io/docs/
// explanation on encrypt/decrypt input/output formatting https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-cryptojs


// This app uses only one npm package.
const CryptoJS = require('crypto-js');

// Algorithm Params (SAVE ALL THIS BLOCK BELOW IT and not forget)
const ALGORYTHM_DESCRIPTION = "AES-256, mode CBC, padding Pkcs7";
const SALT = 'SALT IS ETHER SPECIFIED IN THE FUNCTIONS IN THE 3RD ARGUMENT OR PASSWORD USED AS SALT' // CHANGE IT TO YOUR OWN, THIS IS VERY IMPORTANT PARAMETER TO SAVE, WITHOUT IT YOU WON"T BE ABLE TO DECRYPT
const KEY_BIT_LENGTH = 256;
const IV_BIT_LENGTH = 128;
const ITERATIONS = 1000;
const PADDING = 'Pkcs7'; // it's default in crypto-js
const AES_MODE = 'CBC'; // it's default in crypto-js
// save to here.

// algorithm cannot use plain password for encryption, we need to make a hash out of password.
const derriveKeyAndIV = function(password, salt) {
    // if no salt provided, use password as salt.
    const SALT = salt || password;

    let keyKeySize = KEY_BIT_LENGTH / 32;
    let key256Bits = CryptoJS.PBKDF2(password, SALT, { keySize: keyKeySize, iterations: ITERATIONS });
    let ivKeySize = IV_BIT_LENGTH / 32;
    let iv128Bits = CryptoJS.PBKDF2(password, SALT, { keySize: ivKeySize, iterations: ITERATIONS });
    return {
        iv: iv128Bits,
        key: key256Bits
    };
};

// @params
// text: UTF8 human-readable string
// password: UTF8 human-readable password string
// @salt [optional]: UTF8 stirng, if not specified - password is used as salt.
// returns Base64 string
const encryptText = function(text, password, salt) {
    // derrive decryption keys from password.
    const derrivedData = derriveKeyAndIV(password, salt);
    // encrypt the text.
    const encryptedResult = CryptoJS.AES.encrypt(text, derrivedData.key, { iv: derrivedData.iv });
    return CryptoJS.enc.Base64.stringify(encryptedResult.ciphertext);
}

// @params
// @text: expects Base64-formatted string.
// @password human-readable password for decoding
// @salt [optional]: UTF8 stirng, if not specified - password is used as salt.
// Returns: human-readable UTF8 string
const decryptText = function(text, password, salt) {

    salt = salt || password;
    // convert Base64 string into WordArray type that crypto-js expects.
    let txt = CryptoJS.enc.Base64.parse(text);

    // derrive decryption keys from password.
    let derrivedData = derriveKeyAndIV(password, salt);
    var params = {
        ciphertext: txt,
        salt: salt
    };

    // decrypt the text
    const decryptedData = CryptoJS.AES.decrypt(params, derrivedData.key, { iv: derrivedData.iv });

    // format decryption result into human-readable utf-8 format
    const formattedResult = CryptoJS.enc.Utf8.stringify(decryptedData);
    return formattedResult;
}

module.exports.encrypt = encryptText;
module.exports.decrypt = decryptText;