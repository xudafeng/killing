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

function sleep(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms);
  });
}

function retry(func, interval, num) {
  return new Promise(function(resolve, reject) {
    func().then(resolve, function(err) {
      if (num > 0 || typeof num === 'undefined') {
        sleep(interval).then(function() {
          resolve(retry(func, interval, num - 1));
        });
      } else {
        reject(err);
      }
    });
  });
}

module.exports = retry;
