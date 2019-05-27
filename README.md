# JavaScript Utilities API
Write some utilities API for me.
### 1.Html element operation:css,class,attribute,insert,remove,...;
### 2.Selector(use original API):'#id','.class','tag',...;
### 3.Event handler:register,unregister,trigger,...;
### 4.Timer;
### 5.FPS handler;
### 6.Canvas API wrapper;
### 7.Definition of some common interfaces;
### 8.Another useful tools API; 
# 类:基本定义
方便类继承,接口实现的一套API.
### 类定义 关键字 function: function A(){...} 定义类A;
### 类继承 关键字 ext: xy.ext(C,B,A)  仅支持单继承,从右到左依次继承,B继承A,C继承B;
### 接口定义 无关键字 就是一个对象表达式: var interface = {func1,func2,...};
### 接口继承 关键字 inf_ext: var new_interface = xy.inf_ext(i1,i2,...);
### 接口实现 关键字 impl/static_impl: impl 类实例对象将要实现的接口, static_impl 类实现的静态接口,可以多个接口实现;
### 判断对象是否是 接口或类 的实例 关键字 inst_of: xy.inst_of(cobj,C);

