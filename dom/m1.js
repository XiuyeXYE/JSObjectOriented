var xy = require('../core/xy2.js');
console.log(xy);
console.log(global.xy);
var dom = require('../core/dom.js');

console.log(dom);
console.log(xy);
console.log(xy.allPlugins());

// console.log(xy.crtDom('option'));

var ajax = require('../core/ajax.js');
// import {xy} from "../core/xy2.js";
// console.log(xy);
console.log(require.toString());
// console.log(mod.toString());
// import './../core/xy2.js';
console.time('system map');
var a = new Map();
for (var i = 0; i < 100000; i++) {
    a.set(i, i);
}
console.timeEnd('system map');
console.time('xy map');
var a = new xy.Map();
for (var i = 0; i < 100000; i++) {
    a.set(i, i);
}
console.timeEnd('xy map');
console.time('xy value map');
var a = new xy.ValueMap();
for (var i = 0; i < 100000; i++) {
    a.set(i, i);
}
console.timeEnd('xy value map');
