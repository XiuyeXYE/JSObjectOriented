# JavaScript Utilities API
Write some utilities API for me.


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

# 类:基本定义
方便类继承,接口实现的一套API.
### 类定义 关键字 function: function A(){...} 定义类A;
### 类继承 关键字 ext: xy.ext(C,B,A)  仅支持单继承,从右到左依次继承,B继承A,C继承B;
### 基类/超类 关键字 base : 调用 this.base(...params);
### 接口定义 无关键字 就是一个对象表达式: var interface = {func1,func2,...};
### 接口继承 关键字 inf_ext: var new_interface = xy.inf_ext(i1,i2,...) 可以多个接口继承;
### 接口实现 关键字 impl/static_impl: impl 类实例对象将要实现的接口, static_impl 类实现的静态接口,可以多个接口实现;
### 判断对象是否是 接口或类 的实例 关键字 inst_of: xy.inst_of(cobj,C);

# BigInteger

        function G(a, b) {
            this.a = a;
            this.b = b;
        }
        console.time();
        var m2 = new xy.HashMap();
        for (var i = 0; i < n; i++) {
            m2.set(new G(i, i), i);
        }
        console.log(m2);
        console.timeEnd();
        console.time();
        console.log(m2.get(new G(878, 878)));
        console.timeEnd();

##### Output:

    HashMap 
    capacity: 131072count: 69908data: (131072) [2: Array(2), 5: Array(1), 6: Array(1), 9: Array(2), 15: Array(1), 18: Array(1), 19: Array(1), 20: Array(3), 21: Array(2), 24: Array(1), 26: Array(1), 27: Array(2), 28: Array(2), 30: Array(3), 31: Array(1), 33: Array(1), 35: Array(1), 36: Array(1), 38: Array(1), 39: Array(1), 40: Array(1), 44: Array(1), 45: Array(2), 48: Array(1), 50: Array(3), 51: Array(2), 52: Array(1), 53: Array(1), 56: Array(1), 57: Array(1), 58: Array(1), 60: Array(1), 61: Array(1), 62: Array(1), 64: Array(2), 68: Array(1), 72: Array(1), 74: Array(1), 75: Array(1), 77: Array(1), 78: Array(1), 79: Array(2), 80: Array(1), 81: Array(1), 85: Array(1), 86: Array(1), 87: Array(1), 88: Array(2), 89: Array(1), 91: Array(1), 94: Array(1), 95: Array(1), 97: Array(2), 101: Array(1), 103: Array(1), 107: Array(1), 108: Array(1), 109: Array(1), 113: Array(2), 115: Array(2), 118: Array(1), 120: Array(2), 122: Array(1), 125: Array(1), 129: Array(2), 133: Array(2), 134: Array(1), 135: Array(1), 136: Array(2), 139: Array(2), 144: Array(2), 145: Array(1), 147: Array(1), 149: Array(1), 151: Array(1), 152: Array(1), 153: Array(2), 154: Array(1), 157: Array(1), 158: Array(1), 160: Array(3), 162: Array(1), 163: Array(1), 165: Array(2), 166: Array(1), 168: Array(2), 169: Array(1), 171: Array(1), 172: Array(1), 173: Array(1), 174: Array(1), 179: Array(2), 184: Array(1), 188: Array(2), 190: Array(3), 193: Array(1), 195: Array(1), 196: Array(1), 199: Array(1), 200: Array(2), …]deepth: 6loadFactor: 0.75saved: 100000__proto__: Object
    default: 1342.835205078125ms
    878
    default: 0.3759765625ms

# HashMap [It's according to key value to get value!]

