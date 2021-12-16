'use strict';
const crypto = require('crypto');

const SALT_LEN = 16;
const KEY_LEN = 32;

const SCRYPT_PARAMS = {
  N: 1024
};

const hashPassword = password =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(SALT_LEN, (err, salt) => {
      if (err) {
        reject(err);
        return;
      }
      crypto.scrypt(password, salt, KEY_LEN, SCRYPT_PARAMS, (err, hash) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(hash.toString('hex'));
      });
    });
  });

module.exports = hashPassword;