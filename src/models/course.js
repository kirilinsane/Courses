'use strict';

const fs = require('fs');
const path = require('path');

class Course {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
  }

  static async save(course) {
    const fakeDbPath = path.join(__dirname, '..', '..', 'db', 'db.json');
    const fakeDb = await Course.getAll();
    fakeDb.courses.push(course);
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

  static async find(title) {
    const fakeDb = await Course.getAll();
    return fakeDb.courses.find(course => course.title === title);
  }

  static async delete(title) {
    const fakeDbPath = path.join(__dirname, '..', '..', 'db', 'db.json');
    const oldFakeDb = await Course.getAll();
    const courses = oldFakeDb.courses.filter(course => course.title !== title);
    oldFakeDb.courses = courses;
    return new Promise((resolve, reject) => {
      resolve(fs.writeFile(fakeDbPath, JSON.stringify(oldFakeDb), err => {
        if (err) reject(err);
        else resolve();
      }));
    });
  }
}

module.exports = Course;