'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');


module.exports = port => {
  http.createServer(async (req, res) => {
    const url = '/' === req.url  ? 'index' : req.url.slice(1);
    const fileExt = path.extname(url);
    const fileName = !fileExt ? url.concat('.html') : url;
    try {
      fs.createReadStream(path.join(__dirname, 'static', fileName)).pipe(res);
    } catch (e) {
      console.log(e);
      res.statusMessage = 404;
      res.end('<h1>File not found</h1>');
    }
  }).listen(port, console.log(`Static on port ${port}`));
};