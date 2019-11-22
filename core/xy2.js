/**
 * My class definition and  and API
 */
; (function (global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function (window) {



    //1.System definition:
    var Array = window.Array;
    var JSON = window.JSON;


    //5.Array length op!
    //==0
    // function p0(arr) {
    //     return arr.length == 0;
    // }
    //>0
    // function pgt0(arr) {
    //     return arr.length > 0;
    // }
    // not less than:>=
    // function pnl0(arr) {
    //     return arr.length >= 0;
    // }
    //==1
    function p1(arr) {
        return arr.length == 1;
    }
    //>=1
    // function pnl1(arr) {
    //     return arr.length >= 1;
    // }

    function p2(arr) {
        return arr.length == 2;
    }
    // function pl2(arr) {
    //     return arr.length < 2;
    // }

    // function p3(arr) {
    //     return arr.length == 3;
    // }
    // function pgt2(arr) {
    //     return arr.length > 2;
    // }
    // function pgt3(arr) {
    //     return arr.length > 3;
    // }
    // not less than : >=
    function pnl2(arr) {
        return arr.length >= 2;
    }

    // function pnl3(arr) {
    //     return arr.length >= 3;
    // }

    //2.Value definition:
    /**
	 * Empty value has a value, not repeatable and  not null or not undefined.
	 */
    var EMPTY_VALUES = {};
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

    //3.Basic core function:

    function whatType(a) {
        return typeof a;
    }

    //check boolean
    function isBoolean(b) {
        return typeof b === 'boolean';
    }
    //check number,but not Number!!!new Number is object.
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
    function isUndefined(s) {
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
        return typeof a === 'symbol';
    }
    function isBigInt(a) {
        return typeof a === 'bigint';
    }
    function isObject(a) {
        return typeof a === 'object';
    }

    //Keys include symbol!
    function enumKeys(a) {
        var keys = Object.keys(a);
        if (fnExist(Object.getOwnPropertySymbols)) {
            keys = keys.concat(Object.getOwnPropertySymbols(a));
        }
        return keys;
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

    //4.Basic tools function:

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

    function arrayLike2Array(a) {
        return Array.prototype.slice.call(a);
    }


    //check multiple number type is all number!
    function checkNumberType(a) {
        if (p1(arguments)) {
            if (!isNumber(a)) throw 'params must be number!';
        }
        else if (pnl2(arguments)) {//because of pnl depends on checkNumberType,so do this.
            for (var i = 0; i < arguments.length; i++) {
                checkNumberType(arguments[i]);
            }
        }
        return true;
    }


    function gt(a, b) {
        checkNumberType(a, b);
        return a > b;
    }

    function ngt(a, b) {
        return !gt(a, b);
    }

    function lt(a, b) {
        checkNumberType(a, b);
        return a < b;
    }

    function nlt(a, b) {
        return !lt(a, b);
    }

    //适用任何类型
    function eq(x, y) {
        // SameValue algorithm
        if (x === y) { // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
        // return a === b;
    }

    /**
    * very good deeply equals tools!!!
    * hey,hey,hey !!!
    */
    function deepEQ(a, b) {
        var at = whatType(a);
        var bt = whatType(b);
        if (!eq(at, bt)) {
            return false;
        }
        switch (at) {
            case "string":
            case "number":
            case "bigint":
            case "boolean":
            case "symbol":
            case "undefined":
            case "function":
                if (!eq(a, b)) {
                    return false;
                }
                break;
            case "object":
                if (eq(a, b)) {
                    return true;
                }
                if (isArray(a) && isArray(b)) {
                    var alen = a.length;
                    var blen = b.length;
                    if (!eq(alen, blen)) {
                        return false;
                    }
                    else {
                        for (var i = 0; i < alen; i++) {
                            if (!deepEQ(a[i], b[i])) {
                                return false;
                            }
                        }
                    }
                }
                else {
                    var akeys = enumKeys(a);
                    var bkeys = enumKeys(b);
                    var alen = akeys.length;
                    var blen = bkeys.length;
                    if (!eq(alen, blen)) {
                        return false;
                    }
                    for (var i = 0; i < alen; i++) {
                        var key = akeys[i];
                        if (!oExist(b[key]) || !deepEQ(a[key], b[key])) {
                            return false;
                        }
                    }
                }
                break;
        }
        return true;
    }
    //Array or Array image : length
    function len(arr) {
        if (oExist(arr) && oExist(arr.length)) {
            return arr.length;
        }
        return 0;
    }

    //greater than
    function pgt(arr, n) {
        return gt(len(arr), n);//len(arr) > n;
    }

    //not less than
    function pnl(arr, n) {
        return nlt(len(arr), n);//len(arr) >= n;
    }

    function peq(arr, n) {
        return eq(len(arr), n);
    }

    //between start and end!
    function openInterval(args, start, end) {
        return args.length > start && args.length < end;
    }
    function closedInterval(args, start, end) {
        return args.length >= start && args.length <= end;
    }

    //o not instance of c,will raise exception!
    function notInstanceof(o, c, msg) {
        if (!(o instanceof c)) {
            throw msg;
        }
    }

    function ntfs(o, c) {
        notInstanceof(o, c, "Constructor requires 'new'!!!");
    }

    /**
     * core Class API
    */
    //copy obj
    function simpleCopy(dest, src) {
        var pNum = len(arguments);
        if (pNum == 0) {
            return EMPTY_VALUES.EMPTY_OBJECT;
        }
        else if (pNum == 2) {
            var st = whatType(src);
            switch (st) {
                case "string":
                case "number":
                case "bigint":
                case "boolean":
                case "symbol":
                case "undefined":
                case "function":
                    dest = src;
                    break;
                case "object":

                    if (isArray(src)) {
                        dest = isArray(dest) ? dest : EMPTY_VALUES.EMPTY_ARRAY;
                        // dest.length = src.length;
                        for (var i = 0; i < len(src); i++) {
                            dest[i] = src[i];
                        }

                    }
                    else {

                        dest = oExist(dest) && !isArray(dest) ? dest : EMPTY_VALUES.EMPTY_OBJECT;
                        var keys = enumKeys(src);
                        for (var i = 0; i < len(keys); i++) {
                            var key = keys[i];
                            dest[key] = src[key];
                        }

                    }
                    break;
            }

            for (var key in src) {
                dest[key] = src[key];
            }
        } else {// >2
            for (var i = 1; i < pNum; i++) {
                dest = simpleCopy(dest, arguments[i]);
            }
        }
        return dest;
    }

    /**
     * 深度拷贝，但是可能会有属性类型转换问题，
     * 比如 [] -> {}
     *  {} -> []
     * @param {*} dest 
     * @param {*} src 
     */
    function deepCopy(dest, src) {
        var pNum = len(arguments);
        if (pNum == 0) {
            return EMPTY_VALUES.EMPTY_OBJECT;
        }
        else if (pNum == 2) {

            var st = whatType(src);
            switch (st) {
                case "string":
                case "number":
                case "bigint":
                case "boolean":
                case "symbol":
                case "undefined":
                case "function":
                    dest = src;
                    break;
                case "object":

                    if (isArray(src)) {
                        dest = isArray(dest) ? dest : EMPTY_VALUES.EMPTY_ARRAY;
                        // dest.length = src.length;
                        for (var i = 0; i < len(src); i++) {
                            dest[i] = deepCopy(dest[i], src[i]);
                        }

                    }
                    else {

                        dest = oExist(dest) && !isArray(dest) ? dest : EMPTY_VALUES.EMPTY_OBJECT;
                        var keys = enumKeys(src);
                        for (var i = 0; i < len(keys); i++) {
                            var key = keys[i];
                            dest[key] = deepCopy(dest[key], src[key]);
                        }

                    }
                    break;
            }


        } else {// >2
            for (var i = 1; i < pNum; i++) {
                dest = deepCopy(dest, arguments[i]);
            }
        }
        return dest;
    }

    //6.Class definition keywords

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
        if (pgt(arguments, 2)) {
            //check itself multiple
            var check_m = new Map();
            // console.log(504,Map);
            for (var i = 0; i < arguments.length; i++) {
                var clazz = arguments[i];
                if (!isFunction(clazz)) {
                    throw arguments[i] + ' is not a function!';
                }
                if (oExist(check_m.get(clazz))) {
                    throw 'class ' + clazz.name + ' only one!';
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
                throw 'class cannot inherit from itself!';
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
            //last expr = inherit prototype methods and fields
            //为了 impl实现不背覆盖 ，this is OK ，out of order for impl and ext.
            //核心2：instanceof OK
            methods_obj.__proto__ = src.prototype;
            // dest.prototype = Object.create(src.prototype);
            // dest.prototype.constructor = dest;
            // methods_obj = dest.prototype;//re eq
            //核心3：inherit static methods and fields
            for (var static_member in src) {
                dest[static_member] = src[static_member];
            }
            //核心4：定义超类构造方法，base() = super()
            // 重复定义会报错，所以不用if去check base存在不存在
            //base 只有继承的派生类才有！
            //methods_obj代表本类的成员定义在其中
            Object.defineProperty(methods_obj, 'base', {
                //要考虑构造函数执行顺序！！！
                //从父类到子类依次执行构造
                //<=>super 每一个匿名函数都是新的
                value: function () {
                    var supCon = this.base.caller;
                    if (fnExist(supCon)) {
                        supCon = supCon.prototype.__proto__.constructor;
                        supCon.apply(this, arguments);
                    }
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
        if (pgt(arguments, 2)) {
            var finalClass = clazz;
            for (var i = arguments.length - 1; i > 0; i--) {
                finalClass = impl(clazz, arguments[i]);
            }
            return finalClass;
        } else if (isFunction(clazz) && oExist(inf)) {
            simpleCopy(clazz.prototype, inf);
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
        if (pgt(arguments, 2)) {
            var finalClass = clazz;
            for (var i = arguments.length - 1; i > 0; i--) {
                finalClass = static_impl(clazz, arguments[i]);
            }
            return finalClass;
        } else if (isFunction(clazz) && oExist(inf)) {
            return simpleCopy(clazz, inf);
        }
    }


    //接口继承 需要返回！有个多态的问题需要解决啊，
    //干脆不支持继承函数多态吧！
    //interface1 extends interface2
    function inf_ext() {
        var last_inf = EMPTY_VALUES.EMPTY_OBJECT;
        var ps = Array.prototype.slice.call(arguments);
        ps.unshift(last_inf);
        return simpleCopy.apply(null, ps);
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
        } else if (pgt(arguments, 2)) {
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


    //7.standard interfaces

    /**
     * public common interfaces
     * definition:
     */

    // var static_of_interface = {
    // 	valueOf: function (d) {
    // 		return new this(d);
    // 	},
    // 	of: function (d) {
    // 		return this.valueOf(d);
    // 	},

    // };
    //es6 new feature ...args
    var static_of_interface = {
        valueOf: function (...d) {
            return new this(...d);
        },
        of: function (...d) {
            return this.valueOf(...d);
        },
        // valueOf: function () {
        //     var that = this;
        //     for (var i = 0; i < arguments.length; i++) {
        //         that = that.bind(null/*not useful*/, arguments[i]);
        //     }

        //     // 有个bug 就是在shell控制台的时候,function. 和 function.字符 会执行 new that!
        //     return new that();

        //     // var o = new this.apply(o,arguments);
        //     // return o;
        // },
        // of: function () {
        //     // var that = this;
        //     // for (var i = 0; i < arguments.length; i++) {
        //     //     that = that.bind(this/*not useful*/, arguments[i]);
        //     // }
        //     // return new that();
        //     return this.valueOf.apply(this, arguments);
        // },
    };

    //extend interface
    var extend_interface = {

        extend: function () {
            // for (var i = 0; i < arguments.length; i++) {
            //     simpleCopy(this, arguments[i]);
            // }
            //arguments => array
            var ps = arrayLike2Array(arguments);
            ps.unshift(this);
            return simpleCopy.apply(null, ps);
        },

    };



    /**
     * 调用接口,
     * 1."直接"调用底层对象的方法和属性.
     * 2.直接根据上层方法调用底层相同方法名接口!相当于包装类
     */
    var inst_invoke_interface = {

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
            if (pnl(args, 1)) {
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
            if (pnl(arguments, 1) && fnExist(this.k(f))) {
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
    var inst_wrapper_interface = inst_invoke_interface;


    var inst_string_interface = {
        toString: function () {
            if (oExist(JSON)) {
                return JSON.stringify(this);
            }
            return this;
        },
    };

    var std_interfaces = {
        static_of_interface: static_of_interface,
        extend_interface: extend_interface,
        inst_wrapper_interface: inst_wrapper_interface,
        inst_string_interface: inst_string_interface,
    };



    //11.Common data structure
    function Set(arr) {
        notInstanceof(this, Set, "Constructor Set requires 'new' at Set!!!");
        this.data = EMPTY_VALUES.EMPTY_ARRAY;
        arr = arr || EMPTY_VALUES.EMPTY_ARRAY;
        if (pnl(arr, 1)) {
            for (var i = 0; i < len(arr); i++) {
                this.add(arr[i]);
            }
        }
    }

    var Set_impl = {
        size: function () {
            return len(this.data);
        },
        clear: function () {
            this.data.length = 0;
        },
        elemEQ: function (a, b) {
            return eq(a, b);
        },
        delete: function (v) {
            for (var i = 0; i < this.size(); i++) {
                if (this.elemEQ(v, this.data[i])) {
                    for (var j = i; j < this.size() - 1; j++) {
                        this.data[j] = this.data[j + 1];
                    }
                    this.data.length--;
                    return true;
                }
            }
            return false;
        },
        forEach: function (f, a) {
            if (isFunction(f)) {
                for (var i = 0; i < this.size(); i++) {
                    if (oExist(a)) {
                        f.call(a, this.data[i], this.data[i], this);
                    } else {
                        f(this.data[i], this.data[i], this);
                    }
                }
            }
        },
        keys: function () {
            return this.list();
        },
        values: function () {
            return this.list();
        },
        has: function (d) {
            for (var i = 0; i < this.data.length; i++) {
                if (this.elemEQ(this.data[i], d)) {
                    return true;
                }
            }
            return false;
        },
        add: function (d) {
            if (!this.has(d)) {
                this.data.push(d);
            }

        },
        list: function () {
            return this.data;
        },
        entries: function* () {
            for (var i = 0; i < len(this.data); i++) {
                yield [this.data[i], this.data[i]];
            }
        },
        [Symbol.iterator]: function* () {
            for (var i = 0; i < len(this.data); i++) {
                yield this.data[i];
            }
        }
    }

    impl(Set, Set_impl);

    function ValueSet(arr) {
        //       notInstanceof(this, ValueSet, "Set using new!!!");
        this.base(arr);
    }

    ext(ValueSet, Set);

    var ValueSet_impl = {
        elemEQ: function (a, b) {
            return deepEQ(a, b);
        },
    };

    impl(ValueSet, ValueSet_impl);


    function Map(arr) {
        notInstanceof(this, Map, "Constructor Map requires 'new' at Map!!!");
        this.data = EMPTY_VALUES.EMPTY_ARRAY;
        arr = arr || EMPTY_VALUES.EMPTY_ARRAY;
        if (pnl(arr, 1)) {
            for (var i = 0; i < len(arr); i++) {
                this.add(arr[i][0], arr[i][1]);
            }
        }
    }

    var Map_impl = {
        elemEQ: function (a, b) {
            return eq(a, b);
        },
        size: function () {
            return len(this.data);
        },
        clear: function () {
            this.data.length = 0;
        },
        delete: function (k) {
            for (var i = 0; i < this.size(); i++) {
                if (this.elemEQ(k, this.data[i][0])) {
                    for (var j = i; j < this.size() - 1; j++) {
                        this.data[j] = this.data[j + 1];
                    }
                    this.data.length--;
                    return true;
                }
            }
            return false;
        },
        forEach: function (f, a) {
            if (isFunction(f)) {
                for (var i = 0; i < this.size(); i++) {
                    if (oExist(a)) {
                        f.call(a, this.data[i][0], this.data[i][1], this);
                    } else {
                        f(this.data[i], this.data[i], this);
                    }
                }
            }
        },
        keys: function () {
            var keyss = EMPTY_VALUES.EMPTY_ARRAY;
            for (var i = 0; i < this.size(); i++) {
                keyss.push(this.data[i][0]);
            }
            return keyss;
        },
        values: function () {
            var valuess = EMPTY_VALUES.EMPTY_ARRAY;
            for (var i = 0; i < this.size(); i++) {
                valuess.push(this.data[i][1]);
            }
            return valuess;
        },
        has: function (k) {
            for (var i = 0; i < this.size(); i++) {
                if (this.elemEQ(k, this.data[i][0])) {
                    return true;
                }
            }
            return false;
        },
        set: function (k, v) {
            return this.add(k, v);
        },
        add: function (k, v) {
            var nonHave = true;
            for (var i = 0; i < this.size(); i++) {
                var en = this.data[i];
                if (this.elemEQ(k, en[0])) {
                    en[1] = v;
                    nonHave = false;
                }
            }
            if (nonHave) {
                this.data.push([k, v]);
            }
            return this;
        },
        get: function (k) {
            for (var i = 0; i < this.size(); i++) {
                var en = this.data[i];
                if (this.elemEQ(k, en[0])) {
                    return en[1];
                }
            }
        },
        entries: function* () {
            for (var i = 0; i < len(this.data); i++) {
                yield this.data[i];
            }
        },
        [Symbol.iterator]: function* () {
            for (var i = 0; i < len(this.data); i++) {
                yield this.data[i];
            }
        },
    };

    impl(Map, Map_impl);

    function ValueMap(arr) {
        this.base(arr);
    }

    ext(ValueMap, Map);

    var ValueMap_impl = {
        elemEQ: function (a, b) {
            return deepEQ(a, b);
        },
    }

    impl(ValueMap, ValueMap_impl);

    //12.Plugins dev

    var plugins = EMPTY_VALUES.EMPTY_ARRAY;
    var pluginId = 0;


    function Plugin(t, f) {
        ntfs(this, Plugin);
        if (oExist(t) && fnExist(f)) {
            this.t = t;
            this.f = f;
            this.loaded = false;
            this.pId = pluginId++;
        } else {
            throw "Plugin must have two parameters:type and function";
        }
    }

    Plugin.TYPE_CALL = 1;
    // Plugin.TYPE_MEMBER = 2;
    Plugin.TYPE_FUNCTION = 3;
    Plugin.TYPE_CLASS = 5;

    function allPlugins() {
        return plugins;
    }

    function addPlugin(t, f) {
        if (!eq(t, Plugin.TYPE_CALL)) {
            if (oExist(xy[f.name])) {
                throw "Plugin exists or plugin name conflicts !!!";
            }
            xy[f.name] = f;
        }
        var ot = new Plugin(t, f);
        ot.loaded = true;
        plugins.push(ot);
        return ot.pId;
    }

    function rmPlugin(iOrF) {
        plugins = arrayFilter(plugins, function (v, i, a) {

            if (isFunction(iOrF)) {
                var flag = eq(v.f, iOrF);
            } else {
                var flag = eq(v.pId, iOrF);
            }
            if (flag && !eq(v.t, Plugin.TYPE_CALL)) {
                delete xy[v.f.name];
            }
            return flag;
        });

    }

    function clearPlugins() {
        arrayForEach(plugins, function (v, i, a) {
            if (!eq(v.t, Plugin.TYPE_CALL)) {
                delete xy[v.f.name];
            }
        });
        plugins.length = 0;
    }






    //9.Open API functions

    var fn = {
        // ready: function (f) {
        //     if (isFunction(f)) {
        //         // dom.of(document).on('DOMContentLoaded', f);
        //         this(f);
        //     }
        // },
        t: whatType,
        isSymbol: isSymbol,
        // 判断对象是否为空
        isNumber: isNumber,
        isNull: isNull,
        isArray: isArray,
        // 判断变量是否未定义
        isUndefined: isUndefined,
        // 判断变量是否是字符串
        isStr: isStr,
        isBoolean: isBoolean,
        // 判断变量是否是函数
        isFunction: isFunction,
        isBigInt: isBigInt,
        isObject: isObject,
        enumKeys: enumKeys,
        // 过滤数组生成新的数组
        arrayFilter: arrayFilter,
        arrayMap: arrayMap,
        arrayReduce: arrayReduce,
        arrayForEach: arrayForEach,
        arrayLike2Array: arrayLike2Array,
        // 浅拷贝
        simpleCopy: simpleCopy,
        //深度拷贝
        deepCopy: deepCopy,
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
        lt: lt,
        nlt: nlt,
        gt: gt,
        ngt: ngt,
        len: len,
        eq: eq,
        pgt: pgt,
        pnl: pnl,
        p: peq,
        deepEQ: deepEQ,
        fnExist: fnExist,
        oExist: oExist,
        openInterval: openInterval,
        closedInterval: closedInterval,
        ext: ext,
        impl: impl,
        static_impl: static_impl,
        inf_ext: inf_ext,
        inst_of: inst_of,
        notInstanceof: notInstanceof,

    };

    var interfaces = {
        std_interfaces: std_interfaces,
    }

    var classes = {
        Set: Set,
        ValueSet: ValueSet,
        Map: Map,
        ValueMap: ValueMap,
    };

    var pluginsDEV = {
        // plugins: plugins,
        Plugin: Plugin,
        allPlugins: allPlugins,
        addPlugin: addPlugin,
        rmPlugin: rmPlugin,
        clearPlugins: clearPlugins,
    }

    // For nothing of conflict of JQuery ... frameworks, it must be function.
    // xy is open and outside API.
    function xy(p) {
        for (var i = 0; i < len(plugins); i++) {
            var plugin = plugins[i];
            if (eq(Plugin.TYPE_CALL, plugin.t)) {
                plugin.f(p);
            }
        }
        // if (isFunction(p)) {
        //     dom.of(document).on('DOMContentLoaded', p);
        // } else if (strNonEmpty(p)) {
        //     return xy.d(p);
        // }
    };

    static_impl(xy, extend_interface);

    xy.extend(fn);
    xy.extend(classes);
    xy.extend(interfaces);
    xy.extend(pluginsDEV);





    window.xy = xy;
    return xy;
}));
