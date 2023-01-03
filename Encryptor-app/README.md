How to use it:


1. Go to aes256.js and change "SALT" to whatever text you want. WARNING - without this you won't be able to reconstruct the decoding algorithm in case you loose this program. Save the file.
2. Save all the parameters somewhere in a safe place, these parameters are needed to reconstruct the decoding algorithm in javascript or any other language if you loose this program.
3. To encrypt a text, go to encrypt.js and replace TEXT_TO_ENCRYPT and PASSWORD strings with your own. Save and run the script with command **"node encrypt.js"**. The output is Base64 encoded encrypted data you are going to be decrypting from in the future. Save it anywhere, do not loose it. Surely you should memorize your password like if you live depends on it.
4. To decrypt this data, go to decrypt.js and replace text in variable ENCRYPTED_TEXT_BASE64 with the encrypted result with got in step 3. Replace PASSWORD with the password you memorized. Save the changes. To decrypt run **"node decrypt.js"**; The output is your original string you were encrypting.
5. Both encrypt and decrypt funcations have the 3rd parameter: salt. If not specified, password is used as salt.