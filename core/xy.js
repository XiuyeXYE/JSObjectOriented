/**
 * my dom handler API class level function is not equal with obj function. class
 * function cannot be called by obj!!! obj function cannot be called by class!!!
 */
; (function (global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function (window) {

    // 'use strict';//not use caller

    //文档对象
    var document = window.document;
    //ajax 
    var XMLHttpRequest = window.XMLHttpRequest;
    //帧绘制回调
    var requestAnimationFrame = window.requestAnimationFrame;
    //删除
    var cancelAnimationFrame = window.cancelAnimationFrame;
    //定时器
    var setTimeout = window.setTimeout;
    //清理
    var clearTimeout = window.clearTimeout;

    /**
	 * 正确的方式:是给每一个变量一个新对象!
	 * 默认空值
	 */
    var EMPTY_VALUES = {};
    //为了去重引用，返回每一个都是新对象
    EMPTY_VALUES = Object.defineProperties(EMPTY_VALUES, {
        EMPTY_OBJECT: {
            get: function () {
                return {}
            }
        },
        EMPTY_ARRAY: {
            get: function () {
                return [];
            }
        },
        EMPTY_STRING: {
            get: function () {
                return '';
            }
        }

    });

    //check boolean
    function isBoolean(b) {
        return typeof b === 'boolean';
    }
    //check number,but not Number!!!Number is object.
    function isNumber(i) {
        return typeof i === 'number';
    }
    //check obj if null
    function isNull(s) {
        // 注意null==undefined:true
        // 所以用"==="
        return s === null;
    }
    //check undefined
    function isUndefinded(s) {
        // 注意null==undefined:true
        // 所以用"==="
        return s === undefined;
    }

    //check string,because of !!'' == false,so using 'typeof' .
    function isStr(s) {
        return typeof s === 'string';
    }
    //check array
    function isArray(a) {
        return Array.isArray(a);
    }
    //check function
    function isFunction(f) {
        return typeof f === 'function';
    }

    function isSymbol(a) {
        typeof a === 'symbol';
    }


    //手写！！容易出错和漏掉，还是用函数吧
    function fnExist(c) {
        return isFunction(c);
    }

    //手写！！容易出错和漏掉，还是用函数吧
    //undefined == null : true
    //undefined === null : false
    function oExist(o) {
        return o != null;
    }
    //check empty string
    function strIsEmpty(s) {
        return s.length == 0;
    }
    //not empty string
    function strNonEmpty(s) {
        return isStr(s) && !strIsEmpty(s);
    }
    //default value set
    function defaultValue(o, defaultValue) {
        return o || defaultValue;
    }
    //string to array using separator to split
    function str2ListBySeparator(s, separator) {
        if (strNonEmpty(s)) {
            return s.split(separator);
        }
        return EMPTY_VALUES.EMPTY_ARRAY;
    }
    //string to array using ' ' to split
    function convertStr2ListByWs(s) {
        return str2ListBySeparator(s, /\s+/);
    }
    //array to string using joint to link
    function list2StrWithJoint(a, joint) {

        if (isArray(a)) {
            return a.join(joint);
        }
        return EMPTY_VALUES.EMPTY_STRING;
    }
    //array to string using ' ' to link
    function convertList2StrWithWs(a) {
        return list2StrWithJoint(a, ' ');
    }
    //array filter
    function arrayFilter(a, f) {
        if (isArray(a) && isFunction(f)) {
            var tmp = EMPTY_VALUES.EMPTY_ARRAY;
            for (var i = 0; i < a.length; i++) {
                if (f(a[i], i, a)) tmp.push(a[i]);
            }
            return tmp;
        }
        return EMPTY_VALUES.EMPTY_ARRAY;
    }
    //array for each
    function arrayForEach(a, f) {
        if (isArray(a) && isFunction(f)) {
            for (var i = 0; i < a.length; i++) {
                f(a[i], i, a);
            }
        } else {
            throw 'First param:array,second param:function!';
        }
    }
    //array map
    function arrayMap(a, f) {
        var tmp = EMPTY_VALUES.EMPTY_ARRAY;
        arrayForEach(a, function (n, idx, arr) {
            tmp.push(f(n, idx, arr));
        });
        return tmp;
    }
    //array reduce
    function arrayReduce(a, f) {
        if (isArray(a) && isFunction(f)) {
            var result = a[0];
            for (var i = 1; i < a.length; i++) {
                result = f(result, a[i], i - 1, i, a);
            }
            return result;
        }
        else {
            throw 'First param:array,second param:function!';
        }
    }



    //check multiple number type is?
    function checkNumberType(a) {
        if (p1(arguments)) {
            if (!isNumber(a)) throw 'params must be number!';
        }
        else if (pnl2(arguments)) {
            for (var i = 0; i < arguments.length; i++) {
                checkNumberType(arguments[i]);
            }
        }
        return true;
    }
    //==0
    function p0(arr) {
        return arr.length == 0;
    }
    //>0
    function pgt0(arr) {
        return arr.length > 0;
    }
    // not less than:>=
    function pnl0(arr) {
        return arr.length >= 0;
    }
    //==1
    function p1(arr) {
        return arr.length == 1;
    }
    //>=1
    function pnl1(arr) {
        return arr.length >= 1;
    }

    function p2(arr) {
        return arr.length == 2;
    }
    function pl2(arr) {
        return arr.length < 2;
    }

    function p3(arr) {
        return arr.length == 3;
    }
    function pgt2(arr) {
        return arr.length > 2;
    }
    function pgt3(arr) {
        return arr.length > 3;
    }
    // not less than : >=
    function pnl2(arr) {
        return arr.length >= 2;
    }

    function pnl3(arr) {
        return arr.length >= 3;
    }
    function gt(a, b) {
        checkNumberType(a, b);
        return a > b;
    }

    function lt(a, b) {
        checkNumberType(a, b);
        return a < b;
    }

    //适用任何类型
    function eq(a, b) {
        // checkNumberType(a, b);
        return a === b;
    }


    //between start and end!
    function openInterval(args, start, end) {
        return args.length > start && args.length < end;
    }
    function closedInterval(args, start, end) {
        return args.length >= start && args.length <= end;
    }

    //ms
    function sleep(n) {
        var s = new Date().getTime();
        var e = new Date().getTime();
        while (e < s + n) {
            e = new Date().getTime();
        }
        return e - s;
    }

    //o not instance of c,will raise exception!
    function notInstanceof(o, c, msg) {
        if (!(o instanceof c)) {
            throw msg;
        }
    }


    /**
     * core Class API
     */

    //copy obj
    function shallowCopyObj(dest, src) {
        var pNum = arguments.length;
        if (pNum == 0) {
            return EMPTY_VALUES.EMPTY_OBJECT;
        }
        else if (pNum == 2) {
            for (var key in src) {
                dest[key] = src[key];
            }
        } else {// >2
            for (var i = 1; i < pNum; i++) {
                dest = shallowCopyObj(dest, arguments[i]);
            }
        }
        return dest;
    }

    /**
     * 类设计：
     * 类 关键字 function
     * 类继承 关键字 ext，支持单继承
     * 接口实现 关键字 impl static_impl ，可以多实现，impl 实现类对象成员函数，static_impl 类静态成员函数；
     *         最好不要在impl中加入变量，这样创建的实例对象会共用，static_impl的实现只能类使用，创建对象不能使用！
     * 接口继承 inf_ext  
     * 实例对象判断 inst_of <=> instanceof
     * 简单总结：单继承多实现 关键字 ext impl/static_impl
     * 
     * javascript 全部是公有继承！
     * 一般的函数地调用是不会继承原型链，所以new的时候会
     * 
     * 
     * 
     */
    //super
    // function base() {
    //     var supCon = base.caller;
    //     if (fnExist(supCon)) {
    //         supCon = supCon.prototype.__proto__.constructor;
    //         console.log("sup constructor:", supCon);
    //         supCon.apply(this, arguments);
    //     }



    //in general,self -> function.prototype  -> {} -> null
    //3 level
    //not extends constructor!
    //single inheritance
    /**
     * 类的核心装备
     * superclass : base
     * 只支持单继承!
     * 可以继承父类的静态，非静态的成员
     * 这个类继承不要打破 原型链，比如父类的prototype类型是无法成功的！
     * @param {function|class} dest 
     * @param {function|class} src 
     */
    function ext(dest, src) {
        if (pgt2(arguments)) {
            //check itself multiple
            var check_m = new Map();
            for (var i = 0; i < arguments.length; i++) {
                var clazz = arguments[i];
                if (!isFunction(clazz)) {
                    throw arguments[i] + ' is not a function!'
                }
                if (oExist(check_m.get(clazz))) {
                    throw 'class ' + clazz.name + ' only one!'
                } else {
                    check_m.set(clazz, 1);
                }

            }
            var finalClass = dest;
            for (var i = arguments.length - 1; i > 0; i--) {
                finalClass = ext(arguments[i - 1], arguments[i]);
            }
            return finalClass;
        } else if (isFunction(dest) && isFunction(src)) {

            if (dest === src) {
                throw 'class cannot inherit from itself!'
            }

            //up search
            var methods_obj = dest.prototype;
            var sup = methods_obj.__proto__;
            var supLevel = 0;
            while (oExist(sup)) {
                sup = sup.__proto__;
                supLevel++;
            }
            //核心1：单继承判断！
            if (gt(supLevel, 1)) {
                throw dest.name + ' cannot support multiple inheritance!';
            }
            //laste expr = inherit prototype methods and fields
            //核心2：instanceof OK
            methods_obj.__proto__ = src.prototype;
            //考虑到单继承，所以下面这个if判断是不需要的
            // if (!fnExist(methods_obj.base)) {
            // }

            // }
            //核心3：inherit static methods and fields
            for (var static_member in src) {
                dest[static_member] = src[static_member];
            }
            //核心4：定义超类构造方法，base() = super()
            // 重复定义会报错，所以不用if去check base存在不存在
            //base 只有继承的派生类才有！
            //methods_obj代表本类的成员定义在其中
            //内部定义base有传参数问题所以不能用这个！
            Object.defineProperty(methods_obj, 'base', {
                //要考虑构造函数执行顺序！！！
                //从父类到子类依次执行构造
                //<=>super 每一个匿名函数都是新的
                value: function () {
                    var supCon = this.base.caller;
                    if (fnExist(supCon)) {
                        supCon = supCon.prototype.__proto__.constructor;
                        // console.log("sup constructor:", supCon);
                        supCon.apply(this, arguments);
                    }
                    //  这种实现会有传参问题，所以上面那种是对的！
                    // var supCon = this.base.caller;
                    // 从本类开始遍历父类链，不停调用构造函数
                    // 保护父类不执行this.base()，由本函数的base，
                    // 亲自遍历父类构造，1亲自调用所有父类构造，
                    // 完成构造函数定义！！！
                    // if (supCon === this.constructor) {
                    //     f.prototype == this.__proto__!
                    //     var s = this.__proto__.__proto__;//super prototype
                    //      console.log(s);
                    //     while (oExist(s)) {
                    //         var scon = s.constructor;//super constructor
                    //         核心5：父类中this变成子类的this
                    //         派生类的sup已经有上面定义了，所以下面执行没问题
                    //         scon.apply(this, arguments);
                    //         s = s.__proto__;
                    //     }
                    // }//父类中this.base()，就是本类的this.base,之所以选择手动遍历构造，是为了防止递归调用！
                },
                configurable: false,
                enumerable: false,
                writable: false,
            });
            return dest;
        }
    }

    /**
     * i : {} 
     * d : function
     * 把对象作为接口
     * 接口继承在类中是全局的，非静态
     */
    //implements interfaces
    function impl(clazz, inf) {
        if (pgt2(arguments)) {
            var finalClass = clazz;
            for (var i = arguments.length - 1; i > 0; i--) {
                finalClass = impl(clazz, arguments[i]);
            }
            return finalClass;
        } else if (isFunction(clazz) && oExist(inf)) {
            shallowCopyObj(clazz.prototype, inf);
            return clazz;
        }
    }

    /**
    * i : {} 
    * d : function
    * 把对象作为接口
    * 接口继承，在类上全局的，不能被实例对象使用！静态
    */
    //implements static interfaces
    function static_impl(clazz, inf) {
        if (pgt2(arguments)) {
            var finalClass = clazz;
            for (var i = arguments.length - 1; i > 0; i--) {
                finalClass = static_impl(clazz, arguments[i]);
            }
            return finalClass;
        } else if (isFunction(clazz) && oExist(inf)) {
            return shallowCopyObj(clazz, inf);
        }
    }


    //接口继承 需要返回！有个多态的问题需要解决啊，
    //干脆不支持继承函数多态吧！
    function inf_ext() {
        var last_inf = EMPTY_VALUES.EMPTY_OBJECT;
        var ps = Array.prototype.slice.call(arguments);
        ps.unshift(last_inf);
        return shallowCopyObj.apply(null, ps);
    }

    //仍然有些不足，慎用
    //判断实例对象是否继承某个类或者实现
    function inst_of(obj, cOrI) {

        if (p2(arguments)) {
            if (oExist(obj)) {
                if (isFunction(cOrI)) {//类
                    return obj instanceof cOrI;
                } else {//接口
                    //成员存在，成员性质
                    //函数 函数名，函数参数，是函数
                    //变量 变量名，变量类型
                    for (var m in cOrI) {//m : 成员 函数或变量！
                        //存在检验,名字检验
                        if (!(m in obj)) {
                            return false;
                        }
                        //性质检验
                        var inf_m = cOrI[m];
                        var obj_m = (obj.__proto__)[m];

                        var m_type_in_inf = typeof inf_m;
                        var m_type_in_obj = typeof obj_m;
                        //类型检验
                        if (m_type_in_obj !== m_type_in_inf) {//
                            return false;
                        }
                        //因为Date Regex都是object，所以constructor是一种比较好的检验方法
                        //定义检验，也属于类型检验
                        if (obj_m.constructor !== inf_m.constructor) {
                            return false;
                        }
                        //上面针对变量函数的通用性质已经检验完成且通过检验
                        //接下来单独检验函数的性质
                        if (m_type_in_obj === 'function') {
                            //参数个数
                            if (obj_m.length !== inf_m.length) {
                                return false;
                            }
                        }
                        //值不等，prototype定义变量，是所有对象共用的，值必须一样
                        //可能 接口覆盖，函数也是引用！
                        if (obj_m !== inf_m) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        } else if (pgt2(arguments)) {
            for (var i = arguments.length - 1; i > 0; i--) {
                if (!inst_of(obj, arguments[i])) {
                    return false;
                }
            }
            //通过所有的校验
            return true;
        }
        return false;
    }




    /**
     * public common interfaces
     * definition:
     */

    // var of_interface = {
    // 	valueOf: function (d) {
    // 		return new this(d);
    // 	},
    // 	of: function (d) {
    // 		return this.valueOf(d);
    // 	},

    // };
    //es6 new feature ...args
    var of_interface = {
        // valueOf: function (...d) {
        // 	return new this(...d);
        // },
        // of: function (...d) {
        // 	return this.valueOf(...d);
        // },
        valueOf: function () {
            var that = this;
            for (var i = 0; i < arguments.length; i++) {
                that = that.bind(this/*not useful*/, arguments[i]);
            }
            //有个bug 就是在shell控制台的时候,function. 和 function.字符 会执行 new that!
            return new that();
        },
        of: function () {
            var that = this;
            for (var i = 0; i < arguments.length; i++) {
                that = that.bind(this/*not useful*/, arguments[i]);
            }
            return new that();
        },


    };
    //extend interface
    var extend_interface = {

        extend: function () {
            // for (var i = 0; i < arguments.length; i++) {
            //     shallowCopyObj(this, arguments[i]);
            // }
            //arguments => array
            var ps = Array.prototype.slice.call(arguments);
            ps.unshift(this);
            return shallowCopyObj.apply(this, ps);
        },

    };

    /**
     * 调用接口,
     * 1."直接"调用底层对象的方法和属性.
     * 2.直接根据上层方法调用底层相同方法名接口!相当于包装类
     */
    var invoke_interface = {

        /**
         * 设置默认原始对象!
         */
        o: function (o) {
            this.origin = o;
        },
        /**
         * 返回原始对象
         */
        get: function () {
            return this.origin;
        },
        //tool beginning:
        /**
         * 返回对象属性值
         */
        k: function (key) {
            return this.get()[key];
        },
        /**
         * 设置对象属性值
         */
        kv: function (k, v) {
            this.get()[k] = v;
            return this;
        },

        /**
         * arguments
         * f arguments
         * 这个函数还是相当危险的，搞不好会增加底层对象的属性！
         * 总之这个很复杂啊，思路还不能理清。
         * 如果不考虑容错性，很好写，但是为了够通用还是写写吧。
         * @param {string|arguments} p0 
         * @param {arguments} p1 
         */
        property: function (p0, p1) {
            //left => right then right => left
            //like this:a.b.c => a.b => a then a=>a.b =>b.c
            //san yuan
            var key = this.property.caller && this.property.caller.name;
            var args = key && p0;
            key = p1 && p0 || key;
            args = (key == p0 && p1) || args;
            //er yuan
            key = key || p0;
            args = args || EMPTY_VALUES.EMPTY_ARRAY;
            if (isStr(args) || !oExist(args.length)) {//string, number,boolean,symbol; later 3 not have length!
                var tmp = EMPTY_VALUES.EMPTY_ARRAY;
                tmp.push(args);
                args = tmp;
            }
            if (pnl1(args)) {
                return this.kv(key, args[0]);
            }
            return this.k(key);
        },

        // fn: function (f, ...ps) {
        // 	if (fnExist(this.k(f))) {
        // 		return this.get()[f](...ps);
        // 	}
        // },
        //优秀API工具哈哈哈哈哈！！！简单包装api必备啊
        /**
         * 调用底层的方法
         * f:方法名
         * 告别"this.方法()"调用,直接this.fn(f,...params);
         */
        fn: function (f) {
            if (pnl1(arguments) && fnExist(this.k(f))) {
                f = this.k(f);
                var ps = EMPTY_VALUES.EMPTY_ARRAY;
                for (var i = 1; i < arguments.length; i++) {
                    ps.push(arguments[i]);
                }
                return f.apply(this.get(), ps);
            }

        },
        //优秀API工具哈哈哈哈哈！！！简单包装api必备啊
        /**
         * 直接根据上层方法名调用底层方法名相同的方法.
         * 没有其他作用就是手写简单,也不用管参数传递的事情.
         * args:Arguments
         */
        invoke: function (aorf, a) {

            //one parameter,default init
            var f = this.invoke.caller && this.invoke.caller.name;
            var args = f && aorf;
            //two parameter :a exist
            f = a && aorf || f;
            args = (f == aorf && a) || args;
            //two parameter: a not exist
            f = f || aorf;
            args = args || EMPTY_VALUES.EMPTY_ARRAY;

            var ps = EMPTY_VALUES.EMPTY_ARRAY;
            ps[0] = f;
            // if (isFunction(this.invoke.caller)) {
            // 	ps[0] = this.invoke.caller.name;
            // }
            // var args = EMPTY_VALUES.EMPTY_ARRAY;
            // if (p1(arguments)) {
            // 	args = aorf || EMPTY_VALUES.EMPTY_ARRAY;
            // } else if (pnl2(arguments)) {
            // 	ps[0] = aorf;
            // 	args = a || EMPTY_VALUES.EMPTY_ARRAY;
            // }
            for (var i = 0; i < args.length; i++) {
                ps.push(args[i]);
            }

            return this.fn.apply(this, ps);//this.fn的第一个参数必须是函数名。
        },

    };
    /**
     * 包装接口
     */
    var wrapper_interface = invoke_interface;





    /**
     * End.
     * 
     */


    /**
     * class definition:
     *
     */

    //option
    function option(obj) {
        notInstanceof(this, option, 'Constructor option requires "new"!');
        // this.value = obj;
        Object.defineProperty(this, 'value', {
            value: obj,
            // default
            // configurable:false,
            // writable:false,
        });
        this.get = function () {
            return this.value;
        };
        this.ifPresent = function (f) {
            if (isFunction(f)) {
                if (this.ifPresent()) {
                    f(this.value);
                }
            }
            return oExist(this.value);
        };
    }

    //implements common interfaces
    static_impl(option, of_interface, extend_interface);
    impl(option, extend_interface);

    //define empty option
    option = Object.defineProperties(option, {
        EMPTY_OBJECT: {
            get: function () {
                return option.of(EMPTY_VALUES.EMPTY_OBJECT);
            }
        },
        EMPTY_ARRAY: {
            get: function () {
                return option.of(EMPTY_VALUES.EMPTY_ARRAY);
            }
        },
        EMPTY_STRING: {
            get: function () {
                return option.of(EMPTY_VALUES.EMPTY_STRING);
            }
        },
        EMPTY_OPTION: {
            value: option.of(null)
        }
    });


    //html element
    function dom(node) {
        notInstanceof(this, dom, 'Constructor dom requires "new"!');
        this.init(node);
    };

    static_impl(dom, of_interface, extend_interface);
    impl(dom, extend_interface);


    //html elements
    function domlist(nodeList) {
        notInstanceof(this, domlist, 'Constructor domlist requires "new"!');
        this.init(nodeList);
    }

    static_impl(domlist, of_interface, extend_interface);
    impl(domlist, extend_interface);


    //document selector query dom
    function query(d, selector) {

        //default []
        var elems = d.querySelectorAll(selector);

        if (pnl2(elems)) {
            return domlist.of(elems);
        }

        return dom.of(elems[0]);
    }

    /**
     *
     * AJAX API
     *
     */

    var AJAX_TYPE = {
        TYPE_GET: 'GET',
        TYPE_POST: 'POST',
        TYPE_PUT: 'PUT',
        TYPE_DELETE: 'DELETE',
        DATA_TYPE_DEFAULT: '',
        DATA_TYPE_JSON: 'json',
        DATA_TYPE_TEXT: 'text',
        DATA_TYPE_BLOB: 'blob',
        DATA_TYPE_DOM: 'document',
        DATA_TYPE_BUFFER: 'arraybuffer'
    };



    function ajax() {
        notInstanceof(this, ajax, 'Constructor ajax requires "new"!');
        if (fnExist(XMLHttpRequest)) {
            this.xhr = new XMLHttpRequest;
        }
    }

    static_impl(ajax, of_interface, extend_interface);
    impl(ajax, extend_interface);
    ajax.extend(AJAX_TYPE);

    /**
    * thread
    */
    var THREAD_STATUS = {
        RUNABLE: 1,
        STARTING: 2,
        STARTED: 3,
        RUNNING: 4,
        RUN: 5,
        STOPPED: 6,
    };


    function thread(c) {
        notInstanceof(this, thread, 'Constructor thread requires "new"!');
        if (p0(arguments) || !isFunction(c)) {
            throw 'first param must be function!';
        }
        if (pnl1(arguments)) {
            this.params = EMPTY_VALUES.EMPTY_ARRAY;
            for (var i = 1; i < arguments.length; i++) {
                this.params.push(arguments[i]);
            }
        }
        this.run = c;
        this.delay = 0;
        var that = this;
        Object.defineProperty(this, 'status', {
            set: function (v) {
                that._status = v;
                switch (v) {
                    //无效状态？
                    case THREAD_STATUS.RUNABLE:
                        if (fnExist(that.onrunable)) {
                            that.onrunable();
                        }
                        break;
                    case THREAD_STATUS.STARTING:
                        if (fnExist(that.onstarting)) {
                            that.onstarting();
                        }
                        break;
                    case THREAD_STATUS.STARTED:
                        if (fnExist(that.onstarted)) {
                            that.onstarted();
                        }
                        break;
                    case THREAD_STATUS.RUNNING:
                        if (fnExist(that.onrunning)) {
                            that.onrunning();
                        }
                        break;
                    case THREAD_STATUS.RUN:
                        if (fnExist(that.onrun)) {
                            that.onrun();
                        }
                        break;
                    case THREAD_STATUS.STOPPED:
                        if (fnExist(that.onstopped)) {
                            that.onstopped();
                        }
                        break;
                }
            },
            get: function () {
                return that._status;
            }
        });
        this.status = THREAD_STATUS.RUNABLE;
    }

    static_impl(thread, of_interface, extend_interface);
    impl(thread, extend_interface);
    thread.extend(THREAD_STATUS);

    /**
     * Timer
     * 
     */

    var TIMER_STATUS = {
        NEW: 1,
        STARTING: 2,
        STARTED: 3,
        RUNNING: 4,
        RUN: 5,
        STOP: 6,
        STOPPED: 7
    };

    function timer(c, interval = 1000) {

        notInstanceof(this, timer, 'Constructor timer requires "new"!');

        if (p0(arguments) || !isFunction(c)) {
            throw 'first param must be function!';
        }
        if (pnl2(arguments)) {
            this.params = EMPTY_VALUES.EMPTY_ARRAY;
            for (var i = 2; i < arguments.length; i++) {
                this.params.push(arguments[i]);
            }
        }
        this.run = c;
        this.interval = interval;

        var that = this;

        Object.defineProperty(this, 'status', {
            set: function (v) {
                that._status = v;
                switch (v) {
                    //无效状态？
                    case TIMER_STATUS.NEW:
                        if (fnExist(that.onnew)) {
                            that.onnew();
                        }
                        break;
                    case TIMER_STATUS.STARTING:
                        if (fnExist(that.onstarting)) {
                            that.onstarting();
                        }
                        break;
                    case TIMER_STATUS.STARTED:
                        if (fnExist(that.onstarted)) {
                            that.onstarted();
                        }
                        break;
                    case TIMER_STATUS.RUNNING:
                        if (fnExist(that.onrunning)) {
                            that.onrunning();
                        }
                        break;
                    case TIMER_STATUS.RUN:
                        if (fnExist(that.onrun)) {
                            that.onrun();
                        }
                        break;
                    case TIMER_STATUS.STOP:
                        if (fnExist(that.onstop)) {
                            that.onstop();
                        }
                        break;
                    case TIMER_STATUS.STOPPED:
                        if (fnExist(that.onstopped)) {
                            that.onstopped();
                        }
                        break;
                }
            },
            get: function () {
                return that._status;
            }
        });

        this.status = TIMER_STATUS.NEW;
    }

    static_impl(timer, of_interface, extend_interface);
    impl(timer, extend_interface);
    timer.extend(TIMER_STATUS);

    /**
     * FPS
     * 
     */

    var FPS_STATUS = {
        READY: 1,
        STARTING: 2,
        STARTED: 3,
        RUNNING: 4,
        RUN: 5,
        STOP: 6,
        STOPPED: 7
    };

    function fps(c) {
        notInstanceof(this, fps, 'Constructor fps requires "new"!');
        if (p0(arguments) || !isFunction(c)) {
            throw 'first param must be function!';
        }
        // if (pnl1(arguments)) {
        // 	this.params = EMPTY_VALUES.EMPTY_ARRAY;
        // 	for (var i = 1; i < arguments.length; i++) {
        // 		this.params.push(arguments[i]);
        // 	}
        // }
        this.run = c;
        var that = this;
        Object.defineProperty(this, 'status', {
            set: function (v) {
                that._status = v;
                switch (v) {
                    //无效状态？
                    case FPS_STATUS.READY:
                        if (fnExist(that.onready)) {
                            that.onready();
                        }
                        break;
                    case FPS_STATUS.STARTING:
                        if (fnExist(that.onstarting)) {
                            that.onstarting();
                        }
                        break;
                    case FPS_STATUS.STARTED:
                        if (fnExist(that.onstarted)) {
                            that.onstarted();
                        }
                        break;
                    case FPS_STATUS.RUNNING:
                        if (fnExist(that.onrunning)) {
                            that.onrunning();
                        }
                        break;
                    case FPS_STATUS.RUN:
                        if (fnExist(that.onrun)) {
                            that.onrun();
                        }
                        break;
                    case FPS_STATUS.STOP:
                        if (fnExist(that.onstop)) {
                            that.onstop();
                        }
                        break;
                    case FPS_STATUS.STOPPED:
                        if (fnExist(that.onstopped)) {
                            that.onstopped();
                        }
                        break;
                }
            },
            get: function () {
                return that._status;
            }
        });
        this.status = FPS_STATUS.READY;
    }

    static_impl(fps, of_interface, extend_interface);
    impl(fps, extend_interface);

    /**
     * canvas game api
     * 
     */


    function canvas(c) {
        notInstanceof(this, canvas, 'Constructor canvas requires "new"!');
        // this.init(c);
        this.base(c);
    }

    ext(canvas, dom);
    // static_impl(canvas, of_interface, extend_interface);
    // impl(canvas, extend_interface);


    function pen(p) {
        notInstanceof(this, pen, 'Constructor pen requires "new"!');
        this.init(p);
    }
    static_impl(pen, of_interface, extend_interface);
    impl(pen, extend_interface, invoke_interface);

    /**
     * end.
     */

    /**
     * class implements
     *
     */

    //basic
    var dom_impl1 = {
        //real constructor
        init: function (n) {
            this.node = n;
        },
        d: function (selector) {
            return query(this.node, selector);
        },
        exist: function () {
            return oExist(this.node);
        },
        isList: function () {
            return false;
        },
        get: function () {
            return this.node;
        },

        k: function (key) {
            if (this.exist()) {
                return this.get()[key];
            }
        },
        kv: function (key, value) {
            if (this.exist()) {
                this.get()[key] = value;
                return this;
            }
        },
        attr: function (k, v) {
            if (arguments.length == 0) {
                throw "less than one parameter!";
            } else if (arguments.length == 1) {
                if (oExist(this.node) && fnExist(this.node.getAttribute)) {
                    return this.node.getAttribute(k);
                }
                return EMPTY_VALUES.EMPTY_STRING;
            } else if (arguments.length >= 2) {
                if (oExist(this.node) && fnExist(this.node.setAttribute)) {
                    this.node.setAttribute(k, v);
                }
                return this;
            }
        },
        // 变量元素自身的属性,终归不太好,弃用
        // css : function(k, v) {
        // if (arguments.length == 0) {
        // throw "less than one parameter!";
        // } else if (arguments.length == 1) {
        // return this.node.style[k];
        // } else if (arguments.length >= 2) {
        // this.node.style[k] = v;
        // }
        // },
        // 操作html元素的style属性
        css: function (k, v) {
            if (arguments.length == 0) {
                return str2ListBySeparator(this.attr('style'), /\s*;\s*/);
            } else if (arguments.length == 1) {
                var cssExprs = str2ListBySeparator(this.attr('style'), /\s*;\s*/);
                cssExprs = arrayFilter(cssExprs, function (cssExpr) {
                    if (strNonEmpty(cssExpr) && cssExpr.indexOf(k) != -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                if (cssExprs.length >= 1) {
                    var vs = EMPTY_VALUES.EMPTY_ARRAY;
                    arrayForEach(cssExprs, function (cssExpr) {
                        var cssKV = str2ListBySeparator(cssExpr, /\s*:\s*/);
                        if (cssKV.length == 2) {
                            vs.push(cssKV[1]);
                        }
                    });
                    if (vs.length == 1) {
                        return vs[0];
                    }
                    else if (vs.length > 1) {
                        return vs;
                    }
                }
                return EMPTY_VALUES.EMPTY_STRING;
            } else if (arguments.length >= 2) {
                var newCssExpr = k + ':' + v;
                var cssExprs = str2ListBySeparator(this.attr('style'), /\s*;\s*/);
                cssExprs = arrayFilter(cssExprs, function (cssExpr) {
                    var cssKV = str2ListBySeparator(cssExpr, /\s*:\s*/);
                    if (cssKV.length == 2) {
                        return cssKV[0] !== k;
                    }
                    // <=>clear wrong css
                    return false;
                });
                cssExprs.push(newCssExpr);
                return this.attr('style', list2StrWithJoint(cssExprs, ';'));
            }
        },
        cls: function (c, append = true) {
            if (arguments.length == 0) {
                return convertStr2ListByWs(this.attr('class'));
            }
            else if (isStr(c)) {
                // 如果是空字符串直接返回!
                if (strIsEmpty(c)) {
                    return;
                }
                var classList = convertStr2ListByWs(this.attr('class'));
                classList = arrayFilter(classList,
                    function (d) {
                        return d !== c;
                    });
                if (append) {
                    classList.push(c);
                }
                var classStr = convertList2StrWithWs(classList);
                return this.attr('class', classStr);

            } else {
                throw 'First parameter must be string!';
            }
        },
        clientWidth: function () {
            if (this.exist() && oExist(this.node.clientWidth)) {
                return this.node.clientWidth;
            }
            return 0;
        },
        clientHeight: function () {
            if (this.exist() && oExist(this.node.clientHeight)) {
                return this.node.clientHeight;
            }
            return 0;
        },
        clientTop: function () {
            if (this.exist() && oExist(this.node.clientTop)) {
                return this.node.clientTop;
            }
            return 0;
        },
        clientLeft: function () {
            if (this.exist() && oExist(this.node.clientLeft)) {
                return this.node.clientLeft;
            }
            return 0;
        },
        offsetWidth: function () {
            if (this.exist() && oExist(this.node.offsetWidth)) {
                return this.node.offsetWidth;
            }
            return 0;
        },
        offsetHeight: function () {
            if (this.exist() && oExist(this.node.offsetHeight)) {
                return this.node.offsetHeight;
            }
            return 0;
        },
        offsetTop: function () {
            if (this.exist() && oExist(this.node.offsetTop)) {
                return this.node.offsetTop;
            }
            return 0;
        },
        offsetLeft: function () {
            if (this.exist() && oExist(this.node.offsetLeft)) {
                return this.node.offsetLeft;
            }
            return 0;
        },
        rect: function () {
            if (this.exist() && fnExist(this.node.getBoundingClientRect)) {
                return this.node.getBoundingClientRect();
            }
            return EMPTY_VALUES.EMPTY_OBJECT;
        },
        width: function (w, u = 'px') {
            if (p0(arguments)) {
                return this.clientWidth();
            }
            else if (pnl1(arguments) && isNumber(w)) {
                this.css('width', w + u);
                return this;
            }
        },
        height: function (h, u = 'px') {
            if (p0(arguments)) {
                return this.clientHeight();
            }
            else if (pnl1(arguments) && isNumber(h)) {
                this.css('height', h + u);
                return this;
            }
        },
        full: function (h) {
            if (p0(arguments)) {
                return this.k('outerHTML');
            } else {
                //will changes node,no return!
                this.kv('outerHTML', h);
            }
        }

    };

    impl(dom, dom_impl1);

    //basic
    var domlist_impl1 = {
        //real constructor
        init: function (nodeList) {
            // bug:!0 == true!!!
            if (!oExist(nodeList) || !isNumber(nodeList.length)) {
                throw 'cannot init this domlist,because of not html collection or list!';
            }
            var nlist = EMPTY_VALUES.EMPTY_ARRAY;
            for (var i = 0; i < nodeList.length; i++) {
                nlist[i] = new dom(nodeList[i]);
            }
            this.nodeList = nlist;
            shallowCopyObj(this, nlist);
            this.length = nlist.length;
        },

        isList: function () {
            return true;
        },
        list: function () {
            return this.nodeList;
        },
        item: function (i) {
            return this.list()[i];
        },
        eq: function (i) {
            return this.item(i);
        },
        get: function (i) {
            return this.item(i).get();
        },
        forEach: function (f) {
            arrayForEach(this.list(), f);
        },
        filter: function (f) {
            return arrayFilter(this.list(), f);
        },
        map: function (f) {
            return arrayMap(this.list(), f);
        },
        reduce: function (f) {
            return arrayReduce(this.list(), f);
        },
        attr: function (k, v) {
            if (p0(arguments)) {
                throw "less than one parameter!";
            }
            else if (p1(arguments)) {
                var attrs = EMPTY_VALUES.EMPTY_ARRAY;
                for (var i = 0; i < this.nodeList.length; i++) {
                    attrs.push(this.nodeList[i].attr(k));
                }
                return attrs;
            } else if (pnl2(arguments)) {
                for (var i = 0; i < this.nodeList.length; i++) {
                    this.nodeList[i].attr(k, v);
                }
                return this;
            }
        },
        css: function (k, v) {
            if (p0(arguments)) {
                var csses = EMPTY_VALUES.EMPTY_ARRAY;
                for (var i = 0; i < this.nodeList.length; i++) {
                    csses.push(this.nodeList[i].css());
                }
                return csses;
            }
            else if (p1(arguments)) {
                var csses = EMPTY_VALUES.EMPTY_ARRAY;
                for (var i = 0; i < this.nodeList.length; i++) {
                    csses.push(this.nodeList[i].css(k));
                }
                return csses;
            } else if (pnl2(arguments)) {
                for (var i = 0; i < this.nodeList.length; i++) {
                    this.nodeList[i].css(k, v);
                }
                return this;
            }
        },
        cls: function (c, append = true) {
            if (p0(arguments)) {
                var clses = EMPTY_VALUES.EMPTY_ARRAY;
                for (var i = 0; i < this.nodeList.length; i++) {
                    clses.push(this.nodeList[i].cls());
                }
                return clses;
            }
            else if (isStr(c)) {
                // 如果是空字符串直接返回!
                if (strIsEmpty(c)) {
                    return;
                }

                for (var i = 0; i < this.nodeList.length; i++) {
                    this.nodeList[i].cls(c, append);
                }
                return this;
            } else {
                throw 'First parameter must be string!';
            }
        }
    };

    impl(domlist, domlist_impl1);



    var ajax_impl = {
        exist: function () {
            return oExist(this.xhr);
        },
        q: function (params) {
            if (this.exist()) {
                params = defaultValue(params, EMPTY_VALUES.EMPTY_OBJECT);
                var url = defaultValue(params.url, EMPTY_VALUES.EMPTY_STRING);
                var data = params.data;
                var method = defaultValue(params.type, AJAX_TYPE.TYPE_GET);
                var success = params.success;
                var error = params.error;
                var dataType = defaultValue(params.dataType, AJAX_TYPE.DATA_TYPE_DEFAULT);
                var headers = defaultValue(params.headers, EMPTY_VALUES.EMPTY_OBJECT);
                var async = defaultValue(params.async, true);


                this.xhr.open(method, url, async);
                for (var h in headers) {
                    var v = headers[h];
                    this.xhr.setRequestHeader(h, v);
                }
                this.xhr.responseType = dataType;

                if (fnExist(error)) {
                    this.xhr.onerror = error;
                }

                this.xhr.onreadystatechange = function (e) {
                    var xhrt = e.target;
                    if (xhrt.readyState == XMLHttpRequest.DONE && xhrt.status == 200) {
                        if (fnExist(success))
                            success(xhrt.response, xhrt);
                    }
                };
                this.xhr.send(data);
            }

        }
    };

    impl(ajax, ajax_impl);


    /**
     * event handler
     *
     */

    var dom_event_impl = {

        on: function (e, c) {
            if (pnl2(arguments) && isStr(e) && isFunction(c)) {
                if (oExist(this.node) && fnExist(this.node.addEventListener)) {
                    this.node.addEventListener(e, c);
                }
            }
            return this;
        },
        off: function (e, c) {
            if (pnl2(arguments) && isStr(e) && isFunction(c)) {
                if (oExist(this.node) && fnExist(this.node.removeEventListener)) {
                    this.node.removeEventListener(e, c);
                }
            }
            return this;
        },
        onEvent: function (e, c) {
            if (pnl2(arguments) && isStr(e) && isFunction(c)) {
                if (oExist(this.node)) {
                    this.node['on' + e] = c;
                }
            }
            return this;
        },
        trigger: function (e, d) {
            if (pnl1(arguments) && oExist(this.node) && fnExist(this.node.dispatchEvent)) {
                this.node.dispatchEvent(new CustomEvent(e, { detail: d }));
            }
            return this;
        },
        click: function (c, o = false) {
            if (p0(arguments)) {
                this.trigger('click');
            }
            else if (isFunction(c)) {
                if (isBoolean(o) && o) {
                    this.node.onclick = c;
                }
                else {
                    this.on('click', c);
                }
            }
            else {
                this.trigger('click', c);
            }
            return this;
        }
    };


    impl(dom, dom_event_impl);


    var domlist_event_impl = {
        on: function (e, c) {
            this.forEach(function (n) {
                n.on(e, c);
            });
            return this;
        },
        onEvent: function (e, c) {
            this.forEach(function (n) {
                n.onEvent(e, c);
            });
            return this;
        },
        off: function (e, c) {
            this.forEach(function (n) {
                n.off(e, c);
            });
            return this;
        },
        trigger: function (e, d) {
            if (pnl1(arguments)) {
                this.forEach(function (n) {
                    n.trigger(e, d);
                });
            }
            return this;
        },
        click: function (c, o = false) {
            if (p0(arguments)) {
                this.forEach(function (n) {
                    n.click();
                });
            }
            else if (isFunction(c)) {
                this.forEach(function (n) {
                    n.click(c, o);
                });
            }
            else {
                this.forEach(function (n) {
                    n.click(c);
                });
            }
            return this;
        }

    };

    impl(domlist, domlist_event_impl);


    /**
     * 
     * dom/domlist
     * API: html text value 
     * 
     */
    var dom_impl2 = {
        html: function (h) {
            h = defaultValue(h, EMPTY_VALUES.EMPTY_STRING);
            if (this.exist()) {
                //bug: 不是所有的属性，都可以用这种方式检验属性啊
                //因为空字符串''也是false！！！
                //直接用吧，即可
                // if (!!this.node.innerHTML) {
                if (p0(arguments)) {
                    return this.node.innerHTML;
                }
                this.node.innerHTML = h;
                // }
            }

        },
        text: function (t) {
            t = defaultValue(t, EMPTY_VALUES.EMPTY_STRING);
            if (this.exist()) {
                // if (!!this.node.innerText) {
                if (p0(arguments)) {
                    return this.node.innerText;
                }
                this.node.innerText = t;
                // }
            }

        },
        //fix bug:var v and function v conflict!!!
        value: function (v) {
            v = defaultValue(v, EMPTY_VALUES.EMPTY_STRING);
            if (this.exist()) {
                if (p0(arguments)) {
                    return this.attr('value');
                }
                this.attr('value', v);
            }
        }
    };

    impl(dom, dom_impl2);

    var domlist_impl2 = {
        html: function (h) {
            if (p0(arguments)) {
                var hs = this.map(function (d) {
                    return d.html();
                });
                return hs;
            }
            this.forEach(function (d) {
                d.html(h);
            });
        },
        text: function (t) {
            if (p0(arguments)) {
                var ts = this.map(function (d) {
                    return d.text();
                });
                return ts;
            }
            this.forEach(function (d) {
                d.text(t);
            });
        },
        value: function (v) {
            if (p0(arguments)) {
                var vs = this.map(function (d) {
                    return d.value();
                });
                return vs;
            }
            this.forEach(function (d) {
                d.value(v);
            });
        }
    };
    impl(domlist, domlist_impl2);


    /**
     * 
     * Dom API:
     * 1.create html node
     * 2.append 
     * 3.remove
     * ...
     * xy:factory
     * 
     */

    var dom_static_impl1 = {
        create: function (tag) {
            return this.of(document.createElement(tag));
        },
    };
    static_impl(dom, dom_static_impl1);

    var dom_impl3 = {
        append: function (d) {
            if (!(d instanceof dom)) {
                throw 'parameter 1 is not of type "Dom"';
            }
            if (this.exist() && d.exist()) {
                if (fnExist(this.node.appendChild)) {
                    this.node.appendChild(d.node);
                    return this;
                }
            }
        },
        remove: function (d) {
            if (!(d instanceof dom)) {
                throw 'parameter 1 is not of type "Dom"';
            }
            if (this.exist() && d.exist()) {
                if (fnExist(this.node.removeChild)) {
                    this.node.removeChild(d.node);
                    return this;
                }
            }

        },
        destroy: function () {
            if (this.exist()) {
                if (fnExist(this.node.remove)) {
                    this.node.remove();
                }
            }
        },
        children: function () {
            var childs = EMPTY_VALUES.EMPTY_ARRAY;
            if (this.exist()) {
                this.node.children = defaultValue(this.node.children, EMPTY_VALUES.EMPTY_ARRAY);
                for (var i = 0; i < this.node.children.length; i++) {
                    var child = this.node.children[i];
                    childs.push(dom.of(child));
                }
            }
            return childs;
        },
        prev: function () {
            if (this.exist()) {
                return dom.of(this.node.previousElementSibling);
            }
        },
        next: function () {
            if (this.exist()) {
                return dom.of(this.node.nextElementSibling);
            }
        },
        parent: function () {
            if (this.exist()) {
                return dom.of(this.node.parentElement);
            }
        },
        before: function (d) {
            if (!(d instanceof dom)) {
                throw 'parameter 1 is not of type "Dom"';
            }
            if (this.exist() && d.exist()) {
                var p = d.parent();
                if (p.exist()) {
                    p.node.insertBefore(this.node, d.node);
                    return d;
                }
            }
        },
        after: function (d) {
            if (!(d instanceof dom)) {
                throw 'parameter 1 is not of type "Dom"';
            }
            if (this.exist() && d.exist()) {
                var p = d.parent();
                var n = d.next();

                if (p.exist()) {
                    if (n.exist()) {
                        this.before(n);
                    }
                    else {
                        p.append(this);
                    }
                    return d;
                }
            }
        }

    };
    impl(dom, dom_impl3);



    var timer_impl = {
        start: function () {
            if (fnExist(setTimeout)) {
                this.status = TIMER_STATUS.STARTING;
                var that = this;
                var timer_fn = function (p) {
                    if (that.status === TIMER_STATUS.STOP) {
                        that.releasePrevTimer();
                        that.status = TIMER_STATUS.STOPPED;
                    } else {
                        that.status = TIMER_STATUS.RUNNING;
                        that.run(p);
                        that.status = TIMER_STATUS.RUN;
                        that.releasePrevTimer();
                        that.status = TIMER_STATUS.STARTING;
                        that.id = setTimeout(timer_fn, that.interval, that.params);
                        that.status = TIMER_STATUS.STARTED;
                    }
                };
                this.id = setTimeout(timer_fn, this.interval, this.params);
                this.status = TIMER_STATUS.STARTED;
            }
            return this;
        },

        releasePrevTimer: function () {
            if (fnExist(clearTimeout)) {
                clearTimeout(this.id);
            }
            return this;
        },
        stop: function () {
            this.status = TIMER_STATUS.STOP;
            return this;
        }
    };

    impl(timer, timer_impl);

    //setTimeout每次只有一个执行所以不能当做多线程!而且按创建的先后顺序执行!!!
    var thread_impl = {
        start: function () {

            if (fnExist(setTimeout)) {
                this.status = THREAD_STATUS.STARTING;
                var that = this;
                this.id = setTimeout(function (p) {
                    that.status = THREAD_STATUS.RUNNING;
                    that.run(p);
                    that.status = THREAD_STATUS.RUN;
                    that.status = THREAD_STATUS.STOPPED;
                    that.release();
                }
                    , this.delay, this.params);
                this.status = THREAD_STATUS.STARTED;
            }

            return this;
        },
        release: function () {
            if (fnExist(clearTimeout)) {
                clearTimeout(this.id);
            }
            return this;
        },
        sleep: function (n) {
            sleep(n);
        },
    };
    impl(thread, thread_impl);

    var fps_static_impl = {
        exec: function (c) {
            if (p0(arguments) || !isFunction(c)) {
                throw 'first param must be function!';
            }
            return this.of(c).exec();
        },
        loop: function (c) {
            if (p0(arguments) || !isFunction(c)) {
                throw 'first param must be function!';
            }
            return this.of(c).loop();
        }

    };

    static_impl(fps, fps_static_impl);

    var fps_impl = {
        loop: function () {

            if (fnExist(requestAnimationFrame)) {
                this.status = FPS_STATUS.STARTING;
                var that = this;
                var frame_fn = function (p) {
                    if (that.status === FPS_STATUS.STOP) {
                        that.cancel();
                        this.status = FPS_STATUS.STOPPED;
                    }
                    else {
                        that.status = FPS_STATUS.RUNNING;
                        that.run(p);
                        that.status = FPS_STATUS.RUN;
                        that.cancel();
                        that.status = FPS_STATUS.STARTING;
                        that.id = requestAnimationFrame(frame_fn);
                        that.status = FPS_STATUS.STARTED;
                    }
                };
                this.id = requestAnimationFrame(frame_fn);
                this.status = FPS_STATUS.STARTED;
            }
            return this;
        },
        exec: function () {
            if (fnExist(requestAnimationFrame)) {
                this.status = FPS_STATUS.STARTING;
                var that = this;
                this.id = requestAnimationFrame(function (p) {
                    that.status = FPS_STATUS.RUNNING;
                    that.run(p);
                    that.status = FPS_STATUS.RUN;
                    that.cancel();
                    that.status = FPS_STATUS.STOPPED;
                });
                this.status = FPS_STATUS.STARTED;
            }
            return this;
        },
        stop: function () {
            this.status = FPS_STATUS.STOP;
            return this;
        },
        cancel: function () {
            if (fnExist(cancelAnimationFrame)) {
                cancelAnimationFrame(this.id);
            }
            return this;
        }

    };
    impl(fps, fps_impl);

    var pen_impl = {
        init: function (p) {
            // this.p = p;
            this.o(p);
        },

        create: function (c) {
            if (pnl1(arguments)) {
                var createFunctionStr = 'create' + c;
                var ps = Array.prototype.slice.call(arguments);
                ps.shift();
                return this.invoke(createFunctionStr, ps);
            }
        },
        //tool end.
        color: function (c) {

            return this.property('strokeStyle', arguments)
        },
        fillColor: function (c) {

            return this.property('fillStyle', arguments);
        },
        lineRect: function (x = 0, y = 0, w = 0, h = 0) {

            this.invoke('strokeRect', arguments);
            return this;
        },
        fillRect: function (x = 0, y = 0, w = 0, h = 0) {
            // this.fn('fillRect', x, y, w, h);
            //同名才可以调用!
            this.invoke(arguments);
            return this;
        },
        clearRect: function (x = 0, y = 0, w = 0, h = 0) {
            // this.fn('clearRect', x, y, w, h);
            this.invoke(arguments);
            return this;
        },
        text: function (t, x, y, ops = { fill: true }) {
            var maxWidth = ops.maxWidth;
            var fill = ops.fill || true;
            if (fill) {
                if (oExist(maxWidth)) {
                    this.fn('fillText', t, x, y, maxWidth);
                } else {
                    this.fn('fillText', t, x, y);
                }
            } else {
                if (oExist(maxWidth)) {
                    this.fn('strokeText', t, x, y, maxWidth);
                } else {
                    this.fn('strokeText', t, x, y);
                }
            }
            return this;
        },
        textSize: function (s) {

            return this.invoke('measureText', arguments);
        },
        lineWidth: function (n) {
            return this.property(arguments);
        },
        /**
         * ctx.lineCap = "butt";
         * ctx.lineCap = "round";
         * ctx.lineCap = "square";
         * @param {string} c 
         */
        lineCap: function (c) {
            return this.property(arguments);
        },
        /**
         * ctx.lineJoin = "bevel";
         * ctx.lineJoin = "round";
         * ctx.lineJoin = "miter";
         */
        lineJoin: function (j) {
            return this.property(arguments);
        },
        miterLimit: function (m) {
            return this.property(arguments);
        },
        lineDash: function (arr) {
            return this.property(arguments);
        },
        lineDashOffset: function (v) {
            return this.property(arguments);
        },
        //文本样式
        font: function (f) {
            return this.property(arguments);
        },
        textAlign: function (t) {
            return this.property(arguments);
        },
        textBaseline: function (t) {
            return this.property(arguments);
        },
        direction: function (t) {
            return this.property(arguments);
        },

        //渐变和图案
        createLinearGradient: function (x0, y0, x1, y1) {
            return this.create('LinearGradient', x0, y0, x1, y1);
        },
        createRadialGradient: function (x0, y0, r0, x1, y1, r1) {
            return this.create('RadialGradient', x0, y0, r0, x1, y1, r1);
        },
        /**
         * 
         * @param {Image} image 
         * @param {string} repetition 
         */
        createPattern: function (image, repetition) {
            return this.create('Pattern', image, repetition);
        },
        beginPath: function () {
            this.invoke(arguments);
            return this;
        },
        bp: function () {
            this.beginPath();
            return this;
        },
        closePath: function () {
            this.invoke(arguments);
            return this;
        },
        cp: function () {
            this.closePath();
            return this;
        },
        arc: function () {
            this.invoke(arguments);
            return this;
        },
        line: function () {
            this.invoke('stroke', arguments);
            return this;
        },
        fill: function () {
            this.invoke(arguments);
            return this;
        },
        arcTo: function () {
            this.invoke(arguments);
            return this;
        },
        rect: function () {
            this.invoke(arguments);
            return this;
        },
        shadowBlur: function () {
            return this.property(arguments);
        },
        shadowColor: function () {
            return this.property(arguments);
        },
        shadowOffsetX: function () {
            return this.property(arguments);
        },
        shadowOffsetY: function () {
            return this.property(arguments);
        },
        shadowPos: function (x, y) {
            if (pnl2(arguments)) {
                this.shadowOffsetX(x);
                this.shadowOffsetY(y);
                return this;
            }
            return [this.shadowOffsetX(), this.shadowOffsetY()];
        },
        moveTo: function () {
            this.invoke(arguments);
            return this;
        },
        lineTo: function () {
            this.invoke(arguments);
            return this;
        },
        bezierCurveTo: function () {
            this.invoke(arguments);
            return this;
        },
        quadraticCurveTo: function () {
            this.invoke(arguments);
            return this;
        },
        ellipse: function () {
            this.invoke(arguments);
            return this;
        },
        drawFocusIfNeeded: function () {
            this.invoke(arguments);
            return this;
        },
        scrollPathIntoView: function () {
            this.invoke(arguments);
            return this;
        },
        clip: function () {
            this.invoke(arguments);
            return this;
        },
        isPointInPath: function () {
            return this.invoke(arguments);
        },
        isPointInStroke: function () {
            return this.invoke(arguments);
        },
        rotate: function () {
            this.invoke(arguments);
            return this;
        },
        scale: function () {
            this.invoke(arguments);
            return this;
        },
        translate: function () {
            this.invoke(arguments);
            return this;
        },
        transform: function () {
            this.invoke(arguments);
            return this;
        },

        currentTransform: function () {
            return this.property(arguments);
        },
        globalAlpha: function () {
            return this.property(arguments);
        },
        globalCompositeOperation: function () {
            return this.property(arguments);
        },
        canvas: function () {
            return canvas.of(this.property());
        },

        setTransform: function () {
            this.invoke(arguments);
            return this;
        },
        resetTransform: function () {
            this.invoke(arguments);
            return this;
        },
        drawImage: function () {
            this.invoke(arguments);
            return this;
        },
        createImageData: function () {
            return this.invoke(arguments);
        },
        getImageData: function () {
            return this.invoke(arguments);
        },
        putImageData: function () {
            this.invoke(arguments);
            return this;
        },
        save: function () {
            this.invoke(arguments);
            return this;
        },
        restore: function () {
            this.invoke(arguments);
            return this;
        },
        addHitRegion: function () {
            this.invoke(arguments);
            return this;
        },
        removeHitRegion: function () {
            this.invoke(arguments);
            return this;
        },
        clearHitRegions: function () {
            this.invoke(arguments);
            return this;
        },



    };
    impl(pen, pen_impl);


    var canvas_static_impl = {
        from: function (s) {
            if (pnl1(s) && strNonEmpty(s)) {
                s = xy.d(s);
                //see dom and domlist get function!
                s = s.get(0);
                return canvas.of(s);
            }
            throw 'first parameter must be string related to canvas element: id,tag name,class and so on.';
        }
    };

    static_impl(canvas, canvas_static_impl);


    var canvas_impl = {
        pen: function (type = '2d') {
            if (this.exist() && fnExist(this.k('getContext'))) {
                //Illegal invocation
                // return this.k('getContext')('2d');
                return pen.of(this.get().getContext(type));
            }
        },
        /**
         * @override
         * canvas must use width/height attribute!
         * 
         * real size on canvas
         * it influences canvas api!
         * it's very important!
         * 
         */
        width: function (w, u = 'px') {
            if (p0(arguments)) {
                return this.clientWidth();
            }
            else if (pnl1(arguments) && isNumber(w)) {
                this.css('width', w + u);
                this.attr('width', w);
                return this;
            }
        },
        /**
         * @override
         * @param {number} h 
         * @param {string} u 
         */
        height: function (h, u = 'px') {
            if (p0(arguments)) {
                return this.clientHeight();
            }
            else if (pnl1(arguments) && isNumber(h)) {
                this.css('height', h + u);
                this.attr('height', h);
                return this;
            }
        },

        size: function (w, h) {
            if (p0(arguments)) {
                return [this.width(), this.height()];
            } else if (pnl2(arguments) && isNumber(w) && isNumber(h)) {
                this.width(w);
                this.height(h);
                return this;
            }
        }

    };
    impl(canvas, canvas_impl);

    /**
     * end
     */

    /**
     * global xy interfaces
     */

    var public_common_interfaces = {
        of_interface: of_interface,
        extend_interface: extend_interface,
        invoke_interface: invoke_interface,
        wrapper_interface: wrapper_interface,
    };

    // 为了解决和jQuery等框架的冲突，必须是函数，真操蛋！！！
    // xy 是对外开放的接口API
    var xy = function (p) {
        if (isFunction(p)) {
            dom.of(document).on('DOMContentLoaded', p);
        }
    };
    static_impl(xy, of_interface, extend_interface);

    var fn = {
        ready: function (f) {
            if (isFunction(f)) {
                // dom.of(document).on('DOMContentLoaded', f);
                this(f);
            }
        },
        crt: function (tag) {
            return dom.create(tag);
        },
        // 根据元素ID找到html对象
        byId: function (id) {
            return dom.of(document.getElementById(id));
        },
        byTag: function (tag) {
            return domlist.of(document.getElementsByTagName(tag));
        },
        byClass: function (cls) {
            return domlist.of(document.getElementsByClassName(cls));
        },
        byName: function (n) {
            return domlist.of(document.getElementsByName(n));
        },
        d: function (selector) {
            return query(document, selector);
        },
        createAjax: function createAjax() {
            return ajax.of();
        },
        q: function (params) {
            var ajax = this.createAjax();
            ajax.q(params);
        },
        addInterface: function (obj, public_common_interface) {
            if (pnl2(arguments)) {
                return shallowCopyObj(obj, public_common_interface);
            }
        },
        crt: function (tag) {
            return dom.create(tag);
        },

        isSymbol: isSymbol,
        // 判断对象是否为空
        isNumber: isNumber,
        isNull: isNull,
        isArray: isArray,
        // 判断变量是否未定义
        isUndefinded: isUndefinded,
        // 判断变量是否是字符串
        isStr: isStr,
        isBoolean: isBoolean,
        // 判断变量是否是函数
        isFunction: isFunction,
        // 过滤数组生成新的数组
        arrayFilter: arrayFilter,
        arrayMap: arrayMap,
        arrayReduce: arrayReduce,
        arrayForEach: arrayForEach,
        // 浅拷贝
        shallowCopyObj: shallowCopyObj,
        // 判断字符串是否是为空
        strIsEmpty: strIsEmpty,
        // 非空字符串
        strNonEmpty: strNonEmpty,
        // 根据指定符号拆分字符串成数组
        str2ListBySeparator: str2ListBySeparator,
        // 用指定符号合并字符串数组
        list2StrWithJoint: list2StrWithJoint,
        // 把空格字符串拆分成数组
        convertStr2ListByWs: convertStr2ListByWs,
        // 把字符串数组合并字符串
        convertList2StrWithWs: convertList2StrWithWs,
        defaultValue: defaultValue,
        fnExist: fnExist,
        oExist: oExist,
        sleep: sleep,
        ext: ext,
        impl: impl,
        static_impl: static_impl,
        inf_ext: inf_ext,
        inst_of: inst_of,
    };

    // set xy static methods
    xy.extend(fn);

    // provide some Object with outer
    var classes = {
        Dom: dom,
        DomList: domlist,
        Option: option,
        Ajax: ajax,
        Timer: timer,
        Thread: thread,
        FPS: fps,
        Canvas: canvas,
    };

    xy.extend(classes);

    var static_values = {
        interfaces: public_common_interfaces,
        EMPTY_VALUES: EMPTY_VALUES,
    };

    xy.extend(static_values);

    /**
     * end
     */



    window.xy = xy;
    return xy;

}));

