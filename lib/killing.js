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

"use strict";

require('colorx');

var exec = require('child_process').exec;
var p = process.argv[2];

var WRAP = '\n';
var BLANK = ' ';

if(!p){
  return;
}

function filter(list){
  var a = [];
  list.forEach(function(i){
    if(!!i){
      a.push(i);
    }
  });
  return a;
}

exec('ps -ef | grep ' + p, function (error, stdout) {
  if(error) throw error;

  var items = stdout.split(WRAP);
  var list = [];

  items.forEach(function(i){
    var content = i.split(BLANK);
    content = filter(content);
    content = content.reverse();

    if(!!content[0]){

      if(!new RegExp('grep|kill').test(content[1])){
        content = content.reverse();
        list.push(content[1]);
      }
    }
  });

  if(!list.length){
    return;
  }

  exec('sudo kill -SIGKILL ' + list.join(BLANK), function(error){
    if(error) throw error;

    list.forEach(function(i){
      console.log('PID: ' + i.blue + ' has been killed.');
    });
  });
});
