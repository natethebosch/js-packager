/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 20:52:15
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-03 20:52:42
*/


// taken from http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

var fs = require('fs');
var path = require('path');

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

module.exports = walk;