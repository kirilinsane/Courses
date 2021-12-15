'use strict';
const hashPassword = require('../secure/passwordHashing.js');
const User = require('../Models/User.js');
const Course = require('../Models/Course.js');

const route = {
  '/auth': async user => {
    const hashedPassword = await hashPassword(user.password);
    const newUser = {
      login: user.login,
      password: hashedPassword
    };
    new User(newUser);
    await User.save(newUser);
  },

  '/course': async course => {
    const newCourse = {
      title: course.title,
      price: course.price,
      img: course.img
    };
    new Course(newCourse);
    await Course.save(newCourse);
  },
};

module.exports = route;