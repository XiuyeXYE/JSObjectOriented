# JavaScript Utilities API
Write some utilities API for me.
# 类:基本定义
方便类继承,接口实现的一套API.
### 类定义 关键字 function: function A(){...} 定义类A;
### 类继承 关键字 ext: xy.ext(C,B,A)  仅支持单继承,从右到左依次继承,B继承A,C继承B;
### 基类/超类 关键字 base : 调用 this.base(...params);
### 接口定义 无关键字 就是一个对象表达式: var interface = {func1,func2,...};
### 接口继承 关键字 inf_ext: var new_interface = xy.inf_ext(i1,i2,...) 可以多个接口继承;
### 接口实现 关键字 impl/static_impl: impl 类实例对象将要实现的接口, static_impl 类实现的静态接口,可以多个接口实现;
### 判断对象是否是 接口或类 的实例 关键字 inst_of: xy.inst_of(cobj,C);

# Object-oriented:
## keywords:
### class <=> function
### interface <=> {name:function(){},...}
### extends <=> ext          
### super() <=> this.base()
### implements <=> impl (for object) / static_impl (for class)
### instanceof <=> inst_of


## Using:
### Define a Class:

        function A(a) {//define class
	        console.log('A');
	        console.log("A params =", a);        
        }
	
### Implements interfaces:

        var A_impl1 = {//implements 1
            a2: function () {
                console.log(this.constructor.name + ":a2");
            }
        };
        var A_impl2 = {//implements 1
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
##### Output:

	    A
	    A params = undefined
	    A:a1
	    A:a2
	    A:a3
	
### Extends super class: must inherit a class ,or not useful!

	    function B() {
            console.log("B");
            this.base('B input');
        }       
        xy.ext(B, A);
        let b = new B();
	
##### Output:

	    B
	    A
	    A params = B input
	
### Class F => E => D:

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
        xy.ext(F, E, D);       
        console.log(new F());
	
##### Output:

	    F {d: 99, e: 87, f: 77}
	
### Interfaces combined:

	    var new_inf = xy.inf_ext(xy.std.of_interface, xy.std.extend_interface);        
        function C() {
            this.c = 100;
        }
        xy.impl(C, new_inf);
        var c = new C();
        console.log(c);
	
##### Output:

	    C {c: 100}
	
### Instanceof:

	    console.log("C instanceof new_inf:", xy.inst_of(c, new_inf));
        console.log("C instanceof of_interface:", xy.inst_of(c, xy.std.of_interface));
        console.log("C instanceof extend_interface:", xy.inst_of(c, xy.std.extend_interface));
        console.log("C instanceof invoke_interface:", xy.inst_of(c, xy.std.invoke_interface));
        console.log("C instanceof C:", xy.inst_of(c, C));
        console.log("C instanceof new_inf，of_interface，extend_interface:", xy.inst_of(c, new_inf, xy.std.of_interface, xy.std.extend_interface));
        console.log("C instanceof new_inf，of_interface，extend_interface，invoke_interface:", xy.inst_of(c, new_inf, xy.std.of_interface, xy.std.extend_interface, xy.std.invoke_interface));
	
##### Output:

	    C instanceof new_inf: true
	    C instanceof of_interface: true
	    C instanceof extend_interface: true
	    C instanceof invoke_interface: true
	    C instanceof C: true
	    C instanceof new_inf，of_interface，extend_interface: true
	    C instanceof new_inf，of_interface，extend_interface，invoke_interface: true
	
### Static implements:

	    xy.static_impl(A, xy.std.static_of_interface, xy.std.extend_interface);
	    console.log(A.of());
	
##### Output:

	    A {}


