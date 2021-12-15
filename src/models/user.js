'use strict';

const fs = require('fs');
const path = require('path');

class User {
  constructor(login, password) {
    this.login = login;
    this.password = password;
  }

  static async save(user) {
    const fakeDbPath = path.join(__dirname, '..', '..', 'db', 'db.json');
    const fakeDb = await User.getAll();
    fakeDb.users.push(user);
    return new Promise((resolve, reject) => {
      resolve(fs.writeFile(fakeDbPath, JSON.stringify(fakeDb), err => {
        if (err) reject(err);
        else resolve();
      }));
    });
  }

  static getAll() {
    const fakeDbPath = path.join(__dirname, '..', '..', 'db', 'db.json');
    return new Promise((resolve, reject) => {
      fs.readFile(fakeDbPath, (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  }

  static async find(login) {
    const fakeDb = await User.getAll();
    return fakeDb.users.find(user => user.login === login);
  }

  static async delete(login) {
    const fakeDbPath = path.join(__dirname, '..', '..', 'db', 'db.json');
    const oldFakeDb = await User.getAll();
    const users = oldFakeDb.users.filter(user => user.login !== login);
    oldFakeDb.users = users;
    return new Promise((resolve, reject) => {
      resolve(fs.writeFile(fakeDbPath, JSON.stringify(oldFakeDb), err => {
        if (err) reject(err);
        else resolve();
      }));
    });
  }
}

module.exports = User;