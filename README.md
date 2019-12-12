# JavaScript Object Oriented
Write some tools API for me.


# Object-oriented:
## keywords:
### class <=> function
### interface <=> {name:function(){},...}
### extends <=> ext  
### super() <=> this.base()
### implements <=> impl (for object) / static_impl (for class)
### instanceof <=> inst_of


# Using:
## 1.Define a Class:

    function ClassA(a){
        this.a = a;
        console.log("class A : object created!");
        console.log("this.a=",this.a);
    }
    console.log(new ClassA(123));

##### Output:

    class A : object created!
    this.a= 123
    ClassA {a: 123}
    a: 123
    __proto__: Object

## 2.Implements interfaces:

    var interfaceA = {
        f1:function(){
            console.log("ClassA::f1");
        },
        f2:function(){
            console.log("ClassA::f2");
        }
    };
    xy.impl(ClassA,interfaceA);
    var a = new ClassA(555);
    a.f1();
    a.f2();

##### Output:

	class A : object created!
    this.a= 555
    ClassA::f1
    ClassA::f2

## 3.Extends super class and using "this.base" (called like calling super class)

	function ClassB(b){
        this.base(b);
        console.log("Class B : object created!");
    }
    xy.ext(ClassB,ClassA);
    var b = new ClassB(777);
    b.f1();
    b.f2();
	
##### Output:

	class A : object created!
    this.a= 777
    Class B : object created!
    ClassA::f1
    ClassA::f2
	
## 4.Chain extends: F derived from E,E derived from D

	function D() {
        // this.base();//Root class have no this.base
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
    console.log(new D());
    console.log(new E());
    console.log(new F());
	
##### Output:

	D {d: 99}
    E {d: 99, e: 87}
    F {d: 99, e: 87, f: 77}
	
## 5.Interfaces combined:

	var inter1 = {
        g1: function () {
            console.log("ClassB::g1");
        }
    };
    var inter2 = {
        g2: function () {
            console.log("ClassB::g2");
        }
    };
    var inter_mixed = xy.inf_ext(inter1,inter2);
    xy.impl(ClassB,inter_mixed);
    var b = new ClassB(999);
    b.g1();
    b.g2();
	
##### Output:

	class A : object created!
    this.a= 999
    Class B : object created!
    ClassB::g1
    ClassB::g2

## 6.Static implements: calling static function directly

	var static_inf = {
        staticFunc:function(){
            console.log("static ClassB::static_inf");
        }
    };  
    xy.static_impl(ClassB,static_inf);
    ClassB.staticFunc();//called by class
	
##### Output:

	static ClassB::static_inf

## 7.Instanceof:

    console.log('b instanceof ClassB:',b instanceof ClassB);//class
    console.log('b instanceof ClassB:',xy.inst_of(b,ClassB));//class
    console.log('b instanceof inter_mixed:',xy.inst_of(b,inter_mixed));//interface
    console.log('b instanceof ClassA:',b instanceof ClassA);//super class
    console.log('b instanceof ClassA:',xy.inst_of(b,ClassA));//super class
	
##### Output:

	b instanceof ClassB: true
    b instanceof ClassB: true
    b instanceof inter_mixed: true
    b instanceof ClassA: true
    b instanceof ClassA: true

## 8.Standard interfaces:

### (1) static_of_interfeace : create a object using ClassName.of(...params)
    
    xy.static_impl(ClassA,xy.std.static_of_interface);
    console.log(ClassA.of(789));

##### Output:

    class A : object created!
    this.a= 789
    ClassA {a: 789}

### (2) object_default_interfaces : object useful interfaces, it includes equals,hashCode,clone,inst_of,toString

    xy.impl(ClassA, xy.std.object_default_interfaces);
    var a = new ClassA(999);
    var b = new ClassA(999);
    console.log("a = ", a);
    console.log("b = ", b);
    console.log("a == b:", a == b, " ; a===b:", a === b, " ; a.equals(b) : ", a.equals(b));
    console.log("a.hashCode():", a.hashCode(), " ; b.hashCode():", b.hashCode());
    console.log("a.clone():", a.clone());//deep copy
    console.log("a.inst_of(ClassA):", a.inst_of(ClassA));//instanceof
    console.log("a.toString():", a.toString());//string


##### Output:

    a =  ClassA {a: 999}
    b =  ClassA {a: 999}
    a == b: false  ; a===b: false  ; a.equals(b) :  true
    a.hashCode(): 1190024529  ; b.hashCode(): 1190024529
    a.clone(): ClassA {a: 999}
    a.inst_of(ClassA): true
    a.toString(): {"a":999}

## 9.Standard classes

### (1) BigInteger :

    let a = new xy.BigInteger('1234567890');
    let b = new xy.BigInteger('1234567890');
    //a+b+a*b-a^2
    console.log(a.add(b).add(a.multiply(b)).substract(a.power(2)));

    let e = 1234567890n;//bigint
    let f = 1234567890n;//bigint
    //a+b+a*b-a^2
    console.log(e+f+e*f-e**2n);

##### Output:

    BigInteger {s: "2469135780", data: Array(10), radix: 10, sign: "+"}
    2469135780n

### (2) HashMap [It's according to key value to get value!] :

    var n = 100000;
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

    HashMap(100000) 
    default: 1342.835205078125ms
    878
    default: 0.3759765625ms


# 类:基本定义
方便类继承,接口实现的一套API.
### 类定义 关键字 function: function A(){...} 定义类A;
### 类继承 关键字 ext: xy.ext(C,B,A)  仅支持单继承,从右到左依次继承,B继承A,C继承B;
### 基类/超类 关键字 base : 调用 this.base(...params);
### 接口定义 无关键字 就是一个对象表达式: var interface = {func1,func2,...};
### 接口继承 关键字 inf_ext: var new_interface = xy.inf_ext(i1,i2,...) 可以多个接口继承;
### 接口实现 关键字 impl/static_impl: impl 类实例对象将要实现的接口, static_impl 类实现的静态接口,可以多个接口实现;
### 判断对象是否是 接口或类 的实例 关键字 inst_of: xy.inst_of(cobj,C);

