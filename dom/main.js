var xy = require('./xy.js');

console.log(123);
console.log(this);
console.log(xy);
console.log(this===this);
class A{

}
console.log(A);
console.log(xy.xy((e)=>{console.log(e);}));
console.log(xy.xy.createAjax());
