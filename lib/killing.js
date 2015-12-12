/* ================================================================
 * killing by xdf(xudafeng[at]126.com)
 *
 * first created at : Thu Jun 12 2014 01:24:59 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2014 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var EOL = require('os').EOL;
var retry = require('./retry');
var exec = require('child_process').exec;

function filter(list) {
  var a = [];
  list.forEach(function(i) {
    if (!!i) {
      a.push(i);
    }
  });
  return a;
}

module.exports = function(name, callback) {

  var res = [];
  retry(function() {
    return new Promise(function(resolve, reject) {
      exec('ps -ef | grep ' + name, function(error, stdout) {
        if (error) {
          reject(error);
        };

        var items = stdout.split(EOL);
        var list = [];

        items.forEach(function(i) {
          var content = i.split(' ');
          content = filter(content);
          content = content.reverse();

          if (!!content[0]) {
            if (!new RegExp('grep|kill').test(content[1])) {
              content = content.reverse();
              list.push(content[1]);
            }
          }
        });

        if (!list.length) {
          resolve(res);
        }

        res = res.concat(list);

        exec('sudo kill -SIGKILL ' + list.join(' '), function(error) {
          reject();
        });
      });
    });
  }, 1000, 100).then(function(list) {
    callback(list);
  });
};
