const encrypt = require('./lib/aes256').encrypt;

// const json = require('../vaults/vault-1.json');
// const jsonStr = JSON.stringify(json);

let TEXT_TO_ENCRYPT = ``;

// Uncomment if stringified JSON needs to be encrypted.
// TEXT_TO_ENCRYPT = jsonStr;

const PASSWORD = '';
const SALT = null; // if SALT ommited, SALT is the password

const encryptedText = encrypt(TEXT_TO_ENCRYPT, PASSWORD, SALT);

console.log(`[ecnrypted text: ] ${encryptedText}`);
