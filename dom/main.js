var xy = require('../core/xy2.js');
// var xy = require('../core/dom.js');

console.log(123);
console.log(this);
console.log(xy);
console.log(this===this);
// class A{

// }
// console.log(A);
console.log(xy((e)=>{console.log(e);}));
// console.log(xy.createAjax());
console.log(this);
console.log(global);

for (var k in xy) {
    console.log(k, xy[k].toString());
}
function A(a) {
    console.log('A');
    console.log("A params =", a);
}
var A_impl1 = {
    a2: function () {
        console.log(this.constructor.name + ":a2");
    }
};
var A_impl2 = {
    a1: function () {
        console.log(this.constructor.name + ":a1");
    },
    a3: function () {
        console.log(this.constructor.name + ":a3");
    }
};
xy.impl(A, A_impl1, A_impl2);
let a = new A();
a.a1();
a.a2();
a.a3();
// window.A = A;

function B() {
    console.log("B");
    this.base('B input');
}
var B_impl1 = {
    b1: function () {
        console.log(this.constructor.name + ":b1");
    }
};
var B_impl2 = {
    b2: function () {
        console.log(this.constructor.name + ":b2");
    }
};
xy.impl(B, B_impl1);
xy.ext(B, A);
xy.impl(B, B_impl2);
let b = new B();
b.a1();
b.a2();
b.a3();
b.b2();
b.b1();
// static_impl(A,of_interface);
// static_impl(A,extend_interface);
xy.static_impl(A, xy.std.static_of_interface, xy.std.extend_interface);
console.log('===========================');
console.log(A.of());

var new_inf = xy.inf_ext(xy.std.of_interface, xy.std.extend_interface);
console.log(new_inf);
function C() {
    this.c = 100;
}
xy.impl(C, new_inf);
var c = new C();
console.log(c);
console.log("C instanceof new_inf:", xy.inst_of(c, new_inf));
console.log("C instanceof of_interface:", xy.inst_of(c, xy.std.of_interface));
console.log("C instanceof extend_interface:", xy.inst_of(c, xy.std.extend_interface));
console.log("C instanceof invoke_interface:", xy.inst_of(c, xy.std.invoke_interface));
console.log("C instanceof C:", xy.inst_of(c, C));
console.log("C instanceof new_inf，of_interface，extend_interface:", xy.inst_of(c, new_inf, xy.std.of_interface, xy.std.extend_interface));
console.log("C instanceof new_inf，of_interface，extend_interface，invoke_interface:", xy.inst_of(c, new_inf, xy.std.of_interface, xy.std.extend_interface, xy.std.invoke_interface));

function D() {
    // this.base();//error;无继承类没有base！
    // this.base();//第一个类如果用base就是抽象类无法使用base
    this.d = 99;
}
function E() {
    this.base();//super class constructor
    this.e = 87;
}
function F() {
    this.base();//super class constructor
    this.f = 77;
}

// ext(F,F);//error
// ext(F,E,F);//error
//F extends E ,E extends D
xy.ext(F, E, D);
console.log('D base=', D.prototype.base);
console.log('E base=', E.prototype.base);
console.log('F base=', F.prototype.base);
// console.log(new D());
// console.log(new E());
console.log(new F());
// console.log(xy.inst_of(new F(), D));
// console.log(xy.inst_of(new F(), E));
// console.log(xy.inst_of(new F(), F));

function G(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
}

function H(e, f, a, b, c) {
    this.base(a, b, c);
    this.e = e;
    this.f = f;
}

xy.ext(H, G);
let h = new H('e', 'f', 'a', 'b', 'c');
console.log(h);
console.log("is G:", xy.inst_of(h, G));
console.log("is H:", xy.inst_of(h, H));

function A1() {
    this.a = 100;
    console.log('A');
}
function B1() {
    // this.base();
    this.b = 10;
    console.log('B');
}
function C1() {
    this.base();
    this.c = 999;
    console.log('C');
}
xy.ext(C1, B1, A1);
console.log(new A1());
console.log(new B1());
console.log(new C1());
console.log(A1.toString());
console.log(B1.toString());
console.log(C1.toString());
console.log(new C1());

var C1_impl = {
    f1: function () {
        // this.base();//error
        console.log('this.base=', this.base);
        console.log("C1::f1");
    }
};
xy.impl(C1, C1_impl);
// C1.prototype.f1.prototype.__proto__.constructor = A;
var c = new C1();
c.f1();

xy.impl(C1, xy.std.object_default_insterfaces);
// xy.static_impl(C1, xy.std.static_impl_interface);
var inf1 = {
    toString: function () { return "inf1::toString()"; }
};

console.log(c.inst_of(C1));
console.log(c.inst_of(B1));
console.log(c.inst_of(A1));
console.log(c.inst_of(Function));
console.log(c.inst_of(xy.std.object_default_insterfaces));
console.log(c.inst_of(inf1));
console.log(c.toString());
console.log(c.clone());
console.log(c.clone().equals(c));
console.log(c.clone() == c);
console.log(c.clone() === c);

class FFF{

}
console.log(FFF);

