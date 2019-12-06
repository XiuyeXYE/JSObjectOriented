/**
 * My class definition and  and API
 */
; (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ?
        module.exports = factory() :
        typeof define === 'function' && define.amd ?
            define(factory) :
            (global = global || self, global.xy = factory());
}(this, function () {



    //1.System definition:
    // var Array = this.Array;
    // var JSON = this.JSON;
    // console.log(this);//node:this <=> global;browser:this <=> window

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
        OBJECT: {
            get: function () {
                return {}
            }
        },
        ARRAY: {
            get: function () {
                return [];
            }
        },
        STRING: {
            get: function () {
                return '';
            }
        }
    });

    if (fnExist(Object.freeze)) {
        Object.freeze(EMPTY_VALUES);
    }

    //3.Basic core function:

    function whatType(a) {
        return typeof a;
    }

    function whatClass(o) {
        if (oExist(o)) {
            return o.constructor;
        }
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
        return EMPTY_VALUES.ARRAY;
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
        return EMPTY_VALUES.STRING;
    }
    //array to string using ' ' to link
    function convertList2StrWithWs(a) {
        return list2StrWithJoint(a, ' ');
    }
    //array filter
    function arrayFilter(a, f) {
        if (isArray(a) && isFunction(f)) {
            var tmp = EMPTY_VALUES.ARRAY;
            for (var i = 0; i < a.length; i++) {
                if (f(a[i], i, a)) tmp.push(a[i]);
            }
            return tmp;
        }
        return EMPTY_VALUES.ARRAY;
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
        var tmp = EMPTY_VALUES.ARRAY;
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
    * not compare types ! only compare values!
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
                else if (!isArray(a) && !isArray(b)) {
                    var akeys = enumKeys(a);
                    var bkeys = enumKeys(b);
                    var alen = akeys.length;
                    var blen = bkeys.length;
                    if (!eq(alen, blen)) {
                        return false;
                    }
                    for (var i = 0; i < alen; i++) {
                        var key = akeys[i];
                        if (!(key in b) || !deepEQ(a[key], b[key])) {
                            return false;
                        }
                    }
                } else {// one is array,another is object,cannot be compared!
                    return false;
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


    //15.math function
    function max(a, b) {
        if (pgt(arguments, 2)) {
            var m = arguments[0];
            for (var i = 1; i < len(arguments); i++) {
                m = max(m, arguments[i]);
            }
            return m;
        } else {
            return a > b ? a : b;
        }
    }

    function min(a, b) {
        if (pgt(arguments, 2)) {
            var m = arguments[0];
            for (var i = 1; i < len(arguments); i++) {
                m = min(m, arguments[i]);
            }
            return m;
        } else {
            return a > b ? b : a;
        }
    }

    function pmax() {
        var m = len(arguments[0]);
        for (var i = 1; i < len(arguments); i++) {
            m = max(m, len(arguments[i]));
        }
        return m;
    }

    function pmin() {
        var m = len(arguments[0]);
        for (var i = 1; i < len(arguments); i++) {
            m = min(m, len(arguments[i]));
        }
        return m;
    }

    /**
     * core Class API
    */
    //copy obj
    function simpleCopy(dest, src) {
        var pNum = len(arguments);
        if (pNum == 0) {
            return EMPTY_VALUES.OBJECT;
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
                default:
                case "object":

                    if (isArray(src)) {
                        dest = isArray(dest) ? dest : EMPTY_VALUES.ARRAY;
                    }
                    else {
                        dest = oExist(dest) && !isArray(dest) ? dest : EMPTY_VALUES.OBJECT;
                    }
                    var keys = enumKeys(src);
                    for (var i = 0; i < len(keys); i++) {
                        var key = keys[i];
                        dest[key] = src[key];
                    }
                    break;
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
            return EMPTY_VALUES.OBJECT;
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
                default:
                case "object":

                    if (isArray(src)) {
                        dest = isArray(dest) ? dest : EMPTY_VALUES.ARRAY;
                    }
                    else {
                        dest = oExist(dest) && !isArray(dest) ? dest : EMPTY_VALUES.OBJECT;
                    }
                    var keys = enumKeys(src);
                    for (var i = 0; i < len(keys); i++) {
                        var key = keys[i];
                        dest[key] = deepCopy(dest[key], src[key]);
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
                    throw 'Class ' + clazz.name + ' only one!';
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
                throw 'Class cannot inherit from itself!';
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
            var static_members = enumKeys(src);
            for (var i = 0; i < len(static_members); i++) {
                var static_member = static_members[i];
                dest[static_member] = src[static_member];
            }
            // for (var static_member in src) {
            //     dest[static_member] = src[static_member];
            // }
            //核心4：定义超类构造方法，base() = super()
            // 重复定义会报错，所以不用if去check base存在不存在
            //base 只有继承的派生类才有！
            //methods_obj代表本类的成员定义在其中
            //apply super => function
            Object.defineProperty(methods_obj, 'base', {
                //要考虑构造函数执行顺序！！！
                //从父类到子类依次执行构造
                //<=>super 每一个匿名函数都是新的
                value: function () {
                    var supCon = this.base.caller;
                    if (fnExist(supCon) && oExist(supCon.prototype)
                        && oExist(supCon.prototype.__proto__)
                        && fnExist(supCon.prototype.__proto__.constructor)) {
                        supCon = supCon.prototype.__proto__.constructor;
                        if (!eq(supCon, Object) && this instanceof supCon) {
                            supCon.apply(this, arguments);
                        }
                        else {
                            throw "this.base() is only called by subclass constructor";
                        }
                    } else {
                        throw "this.base() is only called by subclass constructor";
                    }
                },
                configurable: false,
                enumerable: false,
                writable: false,
            });
            //apply super => obj . call function
            if (fnExist(methods_obj.base)) {
                methods_obj.base.__proto__ = src.prototype;
            }
            return dest;
        } else {
            throw 'First param and second param are all functions!';
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
        var last_inf = EMPTY_VALUES.OBJECT;
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
                    var keys = enumKeys(cOrI);
                    for (var i = 0; i < len(keys); i++) {//m : 成员 函数或变量！
                        m = keys[i];
                        //存在检验,名字检验
                        if (!(m in obj)) {
                            return false;
                        }
                        //性质检验
                        var inf_m = cOrI[m];
                        //可能存在覆盖所以这么做，取原型链上的
                        //存在一个问题，中间子类覆盖问题？
                        var obj_m = (obj.__proto__)[m];

                        //值不等，prototype定义变量，是所有对象共用的，值必须一样
                        //可能 接口覆盖，函数也是引用！
                        if (obj_m !== inf_m) {
                            return false;
                        }

                        var m_type_in_inf = whatType(inf_m);
                        var m_type_in_obj = whatType(obj_m);
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
                        // if (m_type_in_obj === 'function') {
                        //     //参数个数
                        //     if (obj_m.length !== inf_m.length) {
                        //         return false;
                        //     }
                        // }

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
        //not good way!
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
            args = args || EMPTY_VALUES.ARRAY;
            if (isStr(args) || !oExist(args.length)) {//string, number,boolean,symbol; later 3 not have length!
                var tmp = EMPTY_VALUES.ARRAY;
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
                var ps = EMPTY_VALUES.ARRAY;
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
            args = args || EMPTY_VALUES.ARRAY;

            var ps = EMPTY_VALUES.ARRAY;
            ps[0] = f;
            // if (isFunction(this.invoke.caller)) {
            // 	ps[0] = this.invoke.caller.name;
            // }
            // var args = EMPTY_VALUES.ARRAY;
            // if (p1(arguments)) {
            // 	args = aorf || EMPTY_VALUES.ARRAY;
            // } else if (pnl2(arguments)) {
            // 	ps[0] = aorf;
            // 	args = a || EMPTY_VALUES.ARRAY;
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

    var inst_of_insterface = {
        inst_of: function (superClazz) {
            return inst_of(this, superClazz);
        }
    };

    var clone_interface = {
        clone: function () {
            var that = whatClass(this);
            return deepCopy(new that(...arguments), this);//per elem is new copy!
        }
    };

    var equals_interface = {
        equals: function (obj) {
            if (oExist(obj)
                &&
                fnExist(obj.hashCode)
                &&
                fnExist(this.hashCode)
                &&
                !eq(this.hashCode(), obj.hashCode())
            ) {
                return false;
            }
            return eq(whatClass(a), whatClass(b)) && deepEQ(this, obj);
        }
    };

    var hash_interface = {
        hashCode: function () {
            return hashCodeI(this);
        }
    };





    var object_default_insterfaces = inf_ext(
        inst_of_insterface,
        equals_interface,
        clone_interface,
        inst_string_interface,
        hash_interface);

    var std_interfaces = {
        static_of_interface: static_of_interface,
        extend_interface: extend_interface,
        inst_wrapper_interface: inst_wrapper_interface,
        inst_string_interface: inst_string_interface,
        inst_of_insterface: inst_of_insterface,
        clone_interface: clone_interface,
        equals_interface: equals_interface,
        hash_interface: hash_interface,
        object_default_insterfaces: object_default_insterfaces
    };



    //11.Common data structure
    function Set(arr) {
        notInstanceof(this, Set, "Constructor Set requires 'new' at Set!!!");
        this.data = EMPTY_VALUES.ARRAY;
        arr = arr || EMPTY_VALUES.ARRAY;
        if (pnl(arr, 1)) {
            for (var i = 0; i < len(arr); i++) {
                this.add(arr[i]);
            }
        }
    }

    impl(Set, object_default_insterfaces);

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
            return this;
        },
        list: function () {
            return this.data;
        },
        entries: function () {
            var i = 0;
            var that = this;
            return {
                next: function () {
                    while (i < that.capacity) {
                        return { value: that.data[i++], done: false };
                    }
                    return { done: true }
                },
                [Symbol.iterator]: function () { return this; }
            };
        },
        [Symbol.iterator]: function () {
            var i = 0;
            var that = this;
            return {
                next: function () {
                    while (i < that.capacity) {
                        return { value: that.data[i++], done: false };
                    }
                    return { done: true }
                },
            };
        },
        // entries: function* () {
        //     for (var i = 0; i < len(this.data); i++) {
        //         yield [this.data[i], this.data[i]];
        //     }
        // },
        // [Symbol.iterator]: function* () {
        //     for (var i = 0; i < len(this.data); i++) {
        //         yield this.data[i];
        //     }
        // }
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
        this.data = EMPTY_VALUES.ARRAY;
        arr = arr || EMPTY_VALUES.ARRAY;
        if (pnl(arr, 1)) {
            for (var i = 0; i < len(arr); i++) {
                this.add(arr[i][0], arr[i][1]);
            }
        }
    }

    impl(Map, object_default_insterfaces);

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
                        f(this.data[i][0], this.data[i][1], this);
                    }
                }
            }
        },
        keys: function () {
            var keyss = EMPTY_VALUES.ARRAY;
            for (var i = 0; i < this.size(); i++) {
                keyss.push(this.data[i][0]);
            }
            return keyss;
        },
        values: function () {
            var valuess = EMPTY_VALUES.ARRAY;
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
                    break;
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
        entries: function () {
            var i = 0;
            var that = this;
            return {
                next: function () {
                    while (i < that.capacity) {
                        return { value: that.data[i++], done: false };
                    }
                    return { done: true }
                },
                [Symbol.iterator]: function () { return this; }
            };
        },
        [Symbol.iterator]: function () {
            var i = 0;
            var that = this;
            return {
                next: function () {
                    while (i < that.capacity) {
                        return { value: that.data[i++], done: false };
                    }
                    return { done: true }
                },
            };
        },
        // entries: function* () {
        //     for (var i = 0; i < len(this.data); i++) {
        //         yield this.data[i];
        //     }
        // },
        // [Symbol.iterator]: function* () {
        //     for (var i = 0; i < len(this.data); i++) {
        //         yield this.data[i];
        //     }
        // },
    };

    impl(Map, Map_impl);


    function ValueMap(arr) {
        this.base(arr);
    }

    ext(ValueMap, Map);

    var ValueMap_impl = {
        elemEQ: function (a, b) {
            return deepEQ(a, b) && eq(whatClass(a), whatClass(b));
        },
    }

    impl(ValueMap, ValueMap_impl);

    var digits = [
        '0', '1', '2', '3', '4', '5',
        '6', '7', '8', '9', 'a', 'b',
        'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'
    ];

    var digitsMap = new Map();
    for (var i = 0; i < len(digits); i++) {
        digitsMap.set(digits[i], i);
    }


    function charCode(s, i) {
        if (isNumber(i) && strNonEmpty(s)) {
            return s.charCodeAt(i);
        }
        throw new Error("First param string and second param integer!");
    }
    function toLowerCase(s) {
        if (strNonEmpty(s)) {
            return s.toLowerCase();
        }
        throw new Error("First param string!");
    }
    function toUpperCase(s) {
        if (strNonEmpty(s)) {
            return s.toUpperCase();
        }
        throw new Error("First param string!");
    }

    function parseInt10(i) {
        if (isNumber(i)) {
            return Math.floor(i);
        }
        else {
            return parseInt(i);
        }
    }

    var numRegExp = /^[+-]?(0[box]?)?\w*$/;

    function checkRadixAndNumber(s, radix) {
        if (!numRegExp.test(s)) {
            throw new Error("Input first param must be a number string and and sign only one +/-!.");
        }
        s = toLowerCase(s);
        var sign = '+';
        if (eq(s.charAt(0), '-')) {
            sign = '-';
            s = s.substring(1);
        } else if (eq(s.charAt(0), '+')) {
            // sign = '+';
            s = s.substring(1);
        }

        if (eq(s.charAt(0), '0')) {
            var radixI = 8;
            s = s.substring(1);
            if (eq(s.charAt(0), 'o')) {
                // radix = 8;
                s = s.substring(1);
            }
            else if (eq(s.charAt(0), 'x')) {
                radixI = 16;
                s = s.substring(1);
            } else if (eq(s.charAt(0), 'b')) {
                radixI = 2;
                s = s.substring(1);
            } else if (eq(len(s), 0)) {
                radixI = radix;
            }
            radix = radixI;
        }

        if (!radix || lt(radix, 2) || gt(radix, 36)) {
            throw new Error("Radix between 2 and 36.");
        }

        for (var i = 0; i < len(s); i++) {
            if (nlt(digitsMap.get(s.charAt(i)), radix)) {
                throw new Error("Input number cannot greater than radix: " + radix);
            }
        }
        s = str2ListBySeparator(s, '');
        s = clearOpenZeroI(s);
        return [list2StrWithJoint(s, ''), radix, sign];
    }

    function checkBigIntegerNumber10(a) {
        if (oExist(a) && oExist(a.length)) {
            for (var i = 0; i < len(a); i++) {
                if (!((a[i] >= 0 && a[i] <= 9) || (a[i] >= '0' && a[i] <= '9'))) {
                    throw "Not a integer number string."
                }
            }
        } else {
            throw "Not a integer number string.";
        }
    }

    function initZero(nums) {
        for (var i = 0; i < len(nums); i++) {
            nums[i] = 0;
        }
    }

    function clearOpenZeroI(nums) {
        var openZero = 0;
        while (eq(nums[openZero], 0)) {
            openZero++;
        }
        nums = nums.slice(openZero);
        if (eq(len(nums), 0)) {
            nums = [0];
        }
        return nums;
    }

    function clearOpenZeroS(nums) {
        var openZero = 0;
        while (eq(nums[openZero], '0')) {
            openZero++;
        }
        nums = nums.slice(openZero);
        if (eq(len(nums), 0)) {
            nums = '0';
        }
        return nums;
    }

    var int10RegExp = /^[+-]?\d*$/;

    function whatSign(s) {
        return s.startsWith('-') ? '-' : '+';
    }

    function getRidOfSign(s) {
        if (eq(s.charAt(0), '-')) {
            s = s.substring(1);
        } else if (eq(s.charAt(0), '+')) {
            s = s.substring(1);
        }
        return s;
    }

    /**
     * 
     * @param {String} a 
     * @param {String} b 
     */
    function addInt10(a, b) {
        //check decimal format
        if (!(int10RegExp.test(a) && int10RegExp.test(b))) {
            throw new Error("params must be decimal number and sign only one +/-!");
        }
        //calc sign
        var asign = whatSign(a);
        var bsign = whatSign(b);

        a = getRidOfSign(a);
        b = getRidOfSign(b);


        checkBigIntegerNumber10(a);
        checkBigIntegerNumber10(b);

        a = clearOpenZeroS(a);
        b = clearOpenZeroS(b);

        //determine end sign
        if (eqInt10(a, b) && !eq(asign, bsign)) {
            return '0';
        }
        else if (ltInt10(a, b)) {//a > b ,indeed
            var tmp = a;//data swap
            a = b;
            b = tmp;
            tmp = bsign;//sign swap
            bsign = asign;
            asign = tmp;
        }
        var finalSign = asign;

        var radix = 10;
        var nums = EMPTY_VALUES.ARRAY;
        var le = pmax(a, b);
        nums.length = le + 1;
        initZero(nums);
        var i = len(a) - 1;
        var j = len(b) - 1;
        var k = 0;
        //core 1
        while (i >= 0 && j >= 0) {
            if (eq(asign, bsign)) {//for +
                nums[k++] = parseInt10(a[i--]) + parseInt10(b[j--]);
            } else {//for -
                nums[k++] = parseInt10(a[i--]) - parseInt10(b[j--]);
            }
        }
        while (i >= 0) {
            nums[k++] = parseInt10(a[i--]);
        }
        // while (j >= 0) {//this is error,max num rest!!!Do you understand?!!!
        //     nums[k++] = parseInt10(b[j--]);
        // }

        // core 2
        for (var n = 0; n < len(nums); n++) {
            if (eq(asign, bsign)) {//+ handler
                if (nums[n] >= radix) {
                    nums[n + 1] += parseInt10(nums[n] / radix);
                    nums[n] %= radix;
                }
            } else {//- handler
                if (nums[n] < 0) {//because of '-',don't have num >= radix;
                    nums[n + 1] -= 1;
                    nums[n] += radix;
                }
            }

        }
        nums.reverse();
        nums = clearOpenZeroI(nums);
        var s = list2StrWithJoint(nums, '');
        if (eq(finalSign, '-')) {
            s = '-' + s;
        }
        return s;
    }

    /**
     * 
     * @param {String} a 
     * @param {String} b 
     */
    function multiplyInt10(a, b) {

        if (!(int10RegExp.test(a) && int10RegExp.test(b))) {
            throw new Error("params must be decimal number and sign only one +/-!");
        }

        //calc sign
        var asign = whatSign(a);
        var bsign = whatSign(b);

        a = getRidOfSign(a);
        b = getRidOfSign(b);

        checkBigIntegerNumber10(a);
        checkBigIntegerNumber10(b);

        a = clearOpenZeroS(a);
        b = clearOpenZeroS(b);

        var finalSign = eq(asign, bsign) ? '+' : '-';

        var radix = 10;
        var nums = EMPTY_VALUES.ARRAY;
        // var le = pmax(a, b);
        // nums.length = le * 2 + 1;
        nums.length = len(a) + len(b);
        initZero(nums);
        //core 1
        var k = 0;
        for (var i = len(a) - 1; i >= 0; i--) {
            for (var j = len(b) - 1; j >= 0; j--) {
                nums[len(a) - 1 - i + k++] += parseInt10(a[i]) * parseInt10(b[j]);
                // console.log(len(a) - 1 - i + k - 1, nums[len(a) - 1 - i + k - 1], parseInt10(a[i]), parseInt10(b[j]));
            }
            k = 0;
        }
        //core 2
        for (var n = 0; n < len(nums); n++) {
            if (nums[n] >= radix) {
                nums[n + 1] += parseInt10(nums[n] / radix);
                nums[n] %= radix;
            }

        }
        nums.reverse();
        nums = clearOpenZeroI(nums);
        var s = list2StrWithJoint(nums, '');
        if (eq(finalSign, '-')) {
            s = '-' + s;
        }
        return s;

    }

    function addInt10One(s) {
        // checkBigIntegerNumber10(s);
        return addInt10(s, '1');
    }

    function compareInt10(a, b) {
        checkBigIntegerNumber10(a);
        checkBigIntegerNumber10(b);
        if (len(a) > len(b)) {
            return 1;
        } else if (len(a) < len(b)) {
            return -1;
        }
        var i = 0;
        while (eq(a[i], b[i]) && i < len(a)) {
            i++;
        }
        if (eq(i, len(a))) {
            return 0;
        }
        else if (a[i] > b[i]) {
            return 1;
        } else if (a[i] < b[i]) {
            return -1;
        }
        return 0;
    }

    function gtInt10(a, b) {
        return compareInt10(a, b) > 0;
    }
    function ltInt10(a, b) {
        return compareInt10(a, b) < 0;
    }
    function eqInt10(a, b) {
        return eq(compareInt10(a, b), 0);
    }

    /**
     * 
     * @param {String} s 
     * @param {String} p 
     */
    function powerInt10(s, p) {
        if (!int10RegExp.test(s)) {
            throw new Error("params must be decimal number and sign only one +/-!");
        }
        var finalSign = whatSign(s);
        s = getRidOfSign(s);
        checkBigIntegerNumber10(s);
        s = clearOpenZeroS(s);
        var num = '1';
        p = String(p);
        for (var i = '0'; ltInt10(i, p); i = addInt10One(i)) {
            num = multiplyInt10(num, s);
        }
        if (eq(finalSign, '-')) {
            num = '-' + num;
        }
        return num;
    }
    /**
     * 
     * @param {String} a 
     * @param {String} b 
     */
    function substractInt10(a, b) {
        //check decimal format
        if (!(int10RegExp.test(a) && int10RegExp.test(b))) {
            throw new Error("params must be decimal number and sign only one +/-!");
        }
        //calc sign
        // var asign = whatSign(a);
        var bsign = whatSign(b);

        // a = getRidOfSign(a);
        b = getRidOfSign(b);

        //exchange sign '+' and '-'
        b = eq(bsign, '-') ? b : '-' + b;

        return addInt10(a, b);

    }

    /**
     * 
     * @param {String} a 
     * @param {STring} b 
     */
    function divideInt10(a, b) {
        //check decimal format
        if (!(int10RegExp.test(a) && int10RegExp.test(b))) {
            throw new Error("params must be decimal number and sign only one +/-!");
        }
        //calc sign
        var asign = whatSign(a);
        var bsign = whatSign(b);

        a = getRidOfSign(a);
        b = getRidOfSign(b);


        checkBigIntegerNumber10(a);
        checkBigIntegerNumber10(b);

        a = clearOpenZeroS(a);
        b = clearOpenZeroS(b);

        if (eq(b, '0')) {
            throw new Error("divisor cannot be zero or 0");
        }

        var finalSign = eq(asign, bsign) ? '+' : '-';

        if (eq(a, '0')) {
            return eq(finalSign, '-') ? '-0' : '0';
        }

        //core
        var radix = '10';
        var quotient = '0';
        while (!(ltInt10(a, b))) {
            var rest = String(len(a) - len(b));
            var rest10 = powerInt10(radix, rest);
            var qn = multiplyInt10(b, rest10);
            if (gtInt10(qn, a)) {
                rest = substractInt10(rest, '1');
                rest10 = powerInt10(radix, rest);
            }
            qn = multiplyInt10(b, rest10);
            a = substractInt10(a, qn);
            quotient = addInt10(quotient, rest10);
        }


        if (eq(finalSign, '-')) {
            quotient = '-' + quotient;
        }
        return quotient;

    }

    /**
     * 
     * @param {String} a 
     * @param {String} b 
     */
    function modInt10(a, b) {
        //check decimal format
        if (!(int10RegExp.test(a) && int10RegExp.test(b))) {
            throw new Error("params must be decimal number and sign only one +/-!");
        }
        //calc sign
        // var asign = whatSign(a);
        // var bsign = whatSign(b);

        a = getRidOfSign(a);
        b = getRidOfSign(b);


        checkBigIntegerNumber10(a);
        checkBigIntegerNumber10(b);

        a = clearOpenZeroS(a);
        b = clearOpenZeroS(b);

        if (eq(b, '0')) {
            throw new Error("divisor cannot be zero or 0");
        }

        // var finalSign = asign;

        if (eq(a, '0')) {
            return eq(finalSign, '-') ? '-0' : '0';
        }

        //core
        var radix = '10';
        // var quotient = '0';
        while (!(ltInt10(a, b))) {
            var rest = String(len(a) - len(b));
            var rest10 = powerInt10(radix, rest);
            var qn = multiplyInt10(b, rest10);
            if (gtInt10(qn, a)) {
                rest = substractInt10(rest, '1');
                rest10 = powerInt10(radix, rest);
            }
            qn = multiplyInt10(b, rest10);
            a = substractInt10(a, qn);
            // quotient = addInt10(quotient, rest10);
        }


        // if (eq(finalSign, '-')) {
        //     a = '-' + a;
        // }
        return a;

    }

    /**
     * 
     * @param {String} a 
     * @param {String} b 
     */
    function divideAndRemainderInt10(a, b) {
        //check decimal format
        if (!(int10RegExp.test(a) && int10RegExp.test(b))) {
            throw new Error("params must be decimal number and sign only one +/-!");
        }
        //calc sign
        var asign = whatSign(a);
        // var bsign = whatSign(b);

        a = getRidOfSign(a);
        b = getRidOfSign(b);


        checkBigIntegerNumber10(a);
        checkBigIntegerNumber10(b);

        a = clearOpenZeroS(a);
        b = clearOpenZeroS(b);

        if (eq(b, '0')) {
            throw new Error("divisor cannot be zero or 0");
        }

        var finalSign = asign;

        if (eq(a, '0')) {
            return [eq(finalSign, '-') ? '-0' : '0', '0'];
        }

        //core
        var radix = '10';
        var quotient = '0';
        while (!(ltInt10(a, b))) {
            var rest = String(len(a) - len(b));
            var rest10 = powerInt10(radix, rest);
            var qn = multiplyInt10(b, rest10);
            if (gtInt10(qn, a)) {
                rest = substractInt10(rest, '1');
                rest10 = powerInt10(radix, rest);
            }
            qn = multiplyInt10(b, rest10);
            a = substractInt10(a, qn);
            quotient = addInt10(quotient, rest10);
        }


        if (eq(finalSign, '-')) {
            quotient = '-' + quotient;
        }

        return [quotient, a];

    }

    /**
     * 
     * @param {String} s 
     * @param {Number} radix 
     */
    function radixToInt10(s, radix) {

        var result = checkRadixAndNumber(s, radix);
        s = clearOpenZeroS(result[0]);
        radix = result[1];
        var sign = result[2];
        //core

        if (isNumber(radix) && !eq(radix, 10)) {
            var os = '0';
            radix = String(radix);
            for (var i = len(s) - 1; i >= 0; i--) {
                os = addInt10(os,
                    multiplyInt10(
                        String(digitsMap.get(s[i])),
                        powerInt10(radix, len(s) - i - 1)
                    )
                );//have to multiply n*radix^N
            }
            s = os;
        }


        if (eq(sign, '-')) {
            s = '-' + s;
        }

        return s;
    }

    /**
     * 
     * @param {String} s 
     * @param {Number} radix 
     */
    function int10ToRadix(s, radix) {
        if (!int10RegExp.test(s)) {
            throw new Error("params must be decimal number and sign only one +/-!");
        }

        var sign = whatSign(s);

        s = getRidOfSign(s);

        checkBigIntegerNumber10(s);

        s = clearOpenZeroS(s);
        //core
        if (isNumber(radix) && !eq(radix, 10)) {
            radix = String(radix);
            var radixNum = EMPTY_VALUES.ARRAY;
            var result = divideAndRemainderInt10(s, radix);
            radixNum.push(digits[result[1]]);
            while (!eq(result[0], '0')) {
                result = divideAndRemainderInt10(result[0], radix);
                radixNum.push(digits[result[1]]);
            }
            radixNum.reverse();
            s = list2StrWithJoint(radixNum, '');
        }

        if (eq(sign, '-')) {
            s = '-' + s;
        }

        return s;

    }


    function BigInteger(s, radix = 10) {
        ntfs(this, BigInteger);
        var r = checkRadixAndNumber(s, radix);
        this.s = r[0];
        this.data = str2ListBySeparator(this.s, '');
        this.radix = r[1];
        this.sign = r[2];
    }

    var BigInteger_impl = {
        int10: function () {//new bigint obj
            return new BigInteger(this.int10Value());
        },
        intRadix: function (r) {
            return new BigInteger(this.intRadixValue(r));
        },
        intRadixValue: function (r) {
            return int10ToRadix(this.int10Value(), r);
        },
        unsignedInt10Value: function () {//string
            // var data = EMPTY_VALUES.ARRAY;
            // var s = '0';
            // var radix = String(this.radix);
            // for (var i = len(this.s) - 1; i >= 0; i--) {
            //     s = addInt10(s,
            //         multiplyInt10(
            //             String(digitsMap.get(this.s[i])),
            //             powerInt10(radix, len(this.s) - i - 1)
            //         )
            //     );//have to multiply n*radix^N
            // }
            // return s;

            return radixToInt10(this.s, this.radix);
        },
        int10Value: function () {
            var sign = this.sign;
            if (eq(sign, '+')) {
                sign = '';
            }
            return sign + this.unsignedInt10Value()
        },
        add: function (a) {
            notInstanceof(a, BigInteger, "param must be BigInteger object!");
            var aData = a.int10Value();
            var oData = this.int10Value();
            return new BigInteger(addInt10(aData, oData));
        },
        multiply: function (a) {
            notInstanceof(a, BigInteger, "param must be BigInteger object!");
            var aData = a.int10Value();
            var oData = this.int10Value();
            return new BigInteger(multiplyInt10(aData, oData));
        },
        substract: function (a) {
            notInstanceof(a, BigInteger, "param must be BigInteger object!");
            var aData = a.int10Value();
            var oData = this.int10Value();
            return new BigInteger(substractInt10(aData, oData));
        },
        divide: function (a) {
            notInstanceof(a, BigInteger, "param must be BigInteger object!");
            var aData = a.int10Value();
            var oData = this.int10Value();
            return new BigInteger(divideInt10(oData, aData));
        },
        mod: function (a) {
            notInstanceof(a, BigInteger, "param must be BigInteger object!");
            var aData = a.int10Value();
            var oData = this.int10Value();
            return new BigInteger(modInt10(oData, aData));
        },
        power: function (n) {
            //One:
            // var sum = BigInteger.ONE;
            // n = String(n);
            // for (var i = '0'; ltInt10(i, n); i = addInt10One(i)) {
            //     sum = sum.multiply(this);
            // }
            // return sum;
            //Two:
            return new BigInteger(powerInt10(this.int10Value(), String(n)));
        },
        negate: function () {
            return new BigInteger(
                eq(this.sign, '-')
                    ?
                    '+' + this.unsignedInt10Value()
                    :
                    '-' + this.unsignedInt10Value());
        },
        addOne: function () {
            return this.add(BigInteger.ONE);
        },
        toString: function (r) {
            if (isNumber(r) && !eq(this.radix, r)) {
                return this.intRadixValue(r);
            }
            return this.s;
        },
        // toJSON: function (r) {//JSON.stringify()!
        //     return this.toString(r);
        // }
    };

    impl(BigInteger, BigInteger_impl);

    var BigInteger_static_impl = {
        ZERO: new BigInteger('0'),
        ONE: new BigInteger('1'),
    };
    static_impl(BigInteger, BigInteger_static_impl);



    //very useful code for generating hash value!
    function hashCodeS(k) {
        // if (oExist(k) && fnExist(k.hashCode)) {
        //     return k.hashCode();
        // }
        var digitLimit = 10;
        var kType = whatType(k);
        switch (kType) {
            case "number":
            case "bigint":
            // return k;
            // break;
            case "string":
            case "boolean":
            case "symbol":
            case "undefined":
            case "function":
                k = String(k) + kType;
                break;
            default:
            case "object":
                k = JSON.stringify(k) + whatClass(k);//+ whatType(k) + whatClass(k);
                break;
        }
        var h = '0';
        for (var i = 0; i < len(k); i++) {
            h = addInt10(multiplyInt10('33', h), String(charCode(k, i)));
            if (gt(len(h), digitLimit)) {//folder! compress!
                var m = len(h) / digitLimit;
                var n = parseInt10(m);
                if (n < m) {
                    n++;
                }
                var sh = '0';
                for (var j = 0; j < n; j++) {
                    sh = addInt10(sh, h.substring(j * digitLimit, digitLimit))
                }
                h = sh;
                h = h.substring(len(h) - digitLimit);
            }
        }
        var sign = whatSign(h);
        if (eq(sign, '-')) {
            h = h.substring(1);
        }
        return h;
    }

    function hashCodeI(k) {
        // if (oExist(k) && fnExist(k.hashCode)) {
        //     return k.hashCode();
        // }
        var kType = whatType(k);
        switch (kType) {
            case "number":
                return k;
            case "bigint":
            case "string":
            case "boolean":
            case "symbol":
            case "undefined":
            case "function":
                k = String(k) + kType;
                break;
            default:
            case "object":
                k = JSON.stringify(k) + whatClass(k);//+ whatType(k) + whatClass(k);
                break;
        }
        var h = 0;
        for (var i = 0; i < len(k); i++) {
            h = h * 33 + charCode(k, i);
            //javascript 按位操作符 有大小限制 限制为32位！
            // h = (h << 5 + h) + charCode(k, i);//have some errors!
            // the following code : limit bits and clear sign '-'
            h = (h >>> 16) ^ (h << 16);//average a little
            h >>>= 1;//去符号 clear '-'
            h = h ^ (h >>> 16);
        }
        return h;
    }


    function HashNode(k, v, hash) {
        this.k = k;
        this.v = v;
        this.hash = hash;
    }

    //According to key's value to get value
    //not key's reference!!!
    function HashMap(cap, factor) {
        this.loadFactor = factor || HashMap.DEFAULT_LOAD_FACTOR;
        this.capacity = cap || HashMap.DEFAULT_INITIAL_CAPACITY;
        if (gt(this.capacity, HashMap.MAXIMUM_CAPACITY)) {
            this.capacity = HashMap.MAXIMUM_CAPACITY;
        }
        this.data = EMPTY_VALUES.ARRAY;
        this.data.length = this.capacity;
        this.saved = 0;//saved elem nums
        this.count = 0;//1 dimension array elem count
        this.deepth = 0;//bucket deepth
    }

    impl(HashMap, object_default_insterfaces);

    var HashMap_impl = {
        elemEQ: function (a, b) {
            return deepEQ(a, b) && eq(whatClass(a), whatClass(b))
        },
        resize: function () {
            if (nlt(this.capacity, HashMap.MAXIMUM_CAPACITY)) {
                return;
            }
            var tmp = EMPTY_VALUES.ARRAY;
            this.capacity = tmp.length = this.capacity * 2;
            if (gt(len(tmp), HashMap.MAXIMUM_CAPACITY)) {
                this.capacity = tmp.length = HashMap.MAXIMUM_CAPACITY;
            }
            this.count = 0;
            this.deepth = 0;
            for (var i = 0; i < this.capacity; i++) {
                if (oExist(this.data[i])) {
                    for (var j = 0; j < len(this.data[i]); j++) {
                        var en = this.data[i][j];
                        if (oExist(en)) {
                            var idx = this.index(en.hash);
                            if (!oExist(tmp[idx])) {
                                tmp[idx] = EMPTY_VALUES.ARRAY;
                                this.count++;
                            }
                            tmp[idx].push(en);
                            this.deepth = max(this.deepth, len(tmp[idx]));
                        }
                    }
                }
            }
            this.data = tmp;
            // this.capacity = this.data.length;
        },
        clear: function () {
            this.data.length = 0;
        },
        delete: function (k) {
            return this.remove(k);
        },
        remove: function (k) {
            var idx = this.index(this.hash(k));
            var j = -1;
            if (oExist(this.data[idx])) {
                for (var i = 0; i < len(this.data[idx]); i++) {
                    var en = this.data[idx][i];
                    if (this.elemEQ(k, en.k)) {//type same!
                        j = i;
                        break;
                    }
                }
            }
            if (!eq(j, -1)) {
                if (eq(len(this.data[idx]), 1)) {
                    this.data[idx] = undefined;
                    this.count--;
                } else {
                    for (var i = j; i < len(this.data[idx]) - 1; i++) {
                        this.data[idx][i] = this.data[idx][i + 1];
                    }
                    this.data[idx].length--;
                }
                this.saved--;
            }
        },
        size: function () {
            return this.saved;
        },
        refRatio: function () {
            return this.count / this.capacity;
        },
        savedRatio: function () {
            return this.saved / this.capacity;
        },
        get: function (k) {
            var idx = this.index(this.hash(k));
            if (oExist(this.data[idx])) {
                for (var i = 0; i < len(this.data[idx]); i++) {
                    var en = this.data[idx][i];
                    if (this.elemEQ(k, en.k)) {
                        return en.v;
                    }
                }
            }
        },
        set: function (k, v) {
            return this.add(k, v);
        },
        put: function (k, v) {
            return this.add(k, v);
        },
        hash: function (k) {
            return k && k.hashCode ? k.hashCode() : hashCodeI(k);
        },
        index: function (h) {
            return h % this.capacity;//common way!
            // return parseInt10(modInt10(hashCodeS(k), String(this.capacity)));
            // return hashCodeI(k) & this.capacity-1;//have some risks!
        },
        add: function (k, v) {
            var h = this.hash(k);
            var idx = this.index(h);
            var en = new HashNode(k, v, h);
            if (!oExist(this.data[idx])) {
                this.data[idx] = EMPTY_VALUES.ARRAY;
                this.data[idx].push(en);
                this.saved++;
                this.count++;
            }
            else {
                var notCovered = true;
                for (var i = 0; i < len(this.data[idx]); i++) {
                    var oEn = this.data[idx][i];
                    if (this.elemEQ(k, oEn.k)) {//coverage!
                        oEn.v = v;
                        notCovered = false;
                        break;
                    }
                }
                if (notCovered) {
                    this.data[idx].push(en);
                    this.saved++;
                }
            }

            this.deepth = max(this.deepth, len(this.data[idx]));

            //Don't care about this.saved and index out of array!!!
            //Index cannot greater than length of array for ever!!!
            if (this.count >= this.loadFactor * this.capacity) {
                this.resize();
            }

            return this;
        },
        forEach: function (f, a) {//a => this => other obj
            if (isFunction(f)) {
                for (var i = 0; i < this.capacity; i++) {
                    if (oExist(this.data[i])) {
                        for (var j = 0; j < len(this.data[i]); j++) {
                            if (oExist(a)) {
                                f.call(a, this.data[i][j].k, this.data[i][j].v, this);
                            } else {
                                f(this.data[i][j].k, this.data[i][j].v, this);
                            }
                        }
                    }

                }
            }
        },
        keys: function () {
            var keyss = EMPTY_VALUES.ARRAY;
            for (var i = 0; i < this.capacity; i++) {
                if (oExist(this.data[i])) {
                    for (var j = 0; j < len(this.data[i]); j++) {
                        keyss.push(this.data[i][j].k);
                    }
                }
            }
            return keyss;
        },
        values: function () {
            var valuess = EMPTY_VALUES.ARRAY;
            for (var i = 0; i < this.capacity; i++) {
                if (oExist(this.data[i])) {
                    for (var j = 0; j < len(this.data[i]); j++) {
                        valuess.push(this.data[i][j].v);
                    }
                }
            }
            return valuess;
        },
        has: function (k) {
            var idx = this.index(this.hash(k));
            if (oExist(this.data[idx])) {
                for (var i = 0; i < len(this.data[idx]); i++) {
                    if (this.elemEQ(k, this.data[idx][i].k)) {
                        return true;
                    }
                }
            }
            return false;
        },
        entries: function () {
            var i = 0;
            var j = 0;
            var that = this;
            return {
                next: function () {
                    while (i < that.capacity) {
                        if (oExist(that.data[i])) {
                            if (j < len(that.data[i])) {
                                return { value: that.data[i][j++], done: false };
                            }
                            j = 0;
                        }
                        i++;
                    }
                    return { done: true }
                },
                [Symbol.iterator]: function () { return this; }
            };
        },

        [Symbol.iterator]: function () {
            var i = 0;
            var j = 0;
            var that = this;
            return {
                next: function () {
                    while (i < that.capacity) {
                        if (oExist(that.data[i])) {
                            if (j < len(that.data[i])) {
                                return { value: that.data[i][j++], done: false };
                            }
                            j = 0;
                        }
                        i++;
                    }
                    return { done: true }
                }
            };
        },
        // entries: function* () {
        //     for (var i = 0; i < this.capacity; i++) {
        //         if (oExist(this.data[i])) {
        //             for (var j = 0; j < len(this.data[i]); j++) {
        //                 yield this.data[i][j];
        //             }
        //         }
        //     }
        // },
        // [Symbol.iterator]: function* () {
        //     for (var i = 0; i < this.capacity; i++) {
        //         if (oExist(this.data[i])) {
        //             for (var j = 0; j < len(this.data[i]); j++) {
        //                 yield this.data[i][j];
        //             }
        //         }
        //     }
        // },
    };

    impl(HashMap, HashMap_impl);

    var HashMap_static_impl = {
        DEFAULT_INITIAL_CAPACITY: 1 << 4,
        DEFAULT_LOAD_FACTOR: 0.75,
        MAXIMUM_CAPACITY: 1 << 30,
        // DIGIT_LIMIT: 10
    };

    static_impl(HashMap, HashMap_static_impl);

    //12.Plugins dev

    var plugins = EMPTY_VALUES.ARRAY;
    var pluginId = 0;

    function uuid() {
        // return new Date().getTime();
        return pluginId++;
    }

    function Plugin(t, f, name) {
        ntfs(this, Plugin);
        if (oExist(t) && fnExist(f)) {
            this.t = t;
            this.f = f;
            this.name = name || f.name;
            if (!isStr(this.name) || strIsEmpty(this.name) || /^\d/.test(this.name)) {
                throw "Plugin name must be string and not start with number!";
            }
            this.loaded = false;
            this.pId = uuid();
        } else {
            throw "Plugin must have two parameters:type and function!";
        }
    }

    Plugin.TYPE_CALL = 1;
    // Plugin.TYPE_MEMBER = 2;
    Plugin.TYPE_FUNCTION = 3;
    Plugin.TYPE_CLASS = 5;

    function allPlugins() {
        return plugins;
    }

    function hasPlugin(iOrFOrN) {
        for (var i = 0; i < len(plugins); i++) {
            var v = plugins[i];
            var flag = false;
            if (isFunction(iOrFOrN)) {
                flag = eq(v.f, iOrFOrN);
            }
            else if (isNumber(iOrFOrN)) {
                flag = eq(v.pId, iOrFOrN);
            }
            else if (isStr(iOrFOrN)) {
                flag = eq(v.name, iOrFOrN);
            }
            if (flag) {
                return flag;
            }
        }
        return false;
    }

    function addPlugin(t, f, name) {
        if (!oExist(t) || !isFunction(f)) {
            throw "first plugin type,second plugin function,indeed!";
        }
        name = name || f.name;
        for (var i = 0; i < len(plugins); i++) {
            var v = plugins[i];
            if (eq(v.f, f) || eq(v.name, name) || oExist(xy[name])) {
                throw "Plugin exists or plugin name conflicts !!!";
                // return false;
            }
        }
        if (!eq(t, Plugin.TYPE_CALL)) {
            xy[name] = f;
        }
        var ot = new Plugin(t, f, name);
        ot.loaded = true;
        plugins.push(ot);
        return ot.pId;
    }

    function removePlugin(iOrFOrN) {
        var a = len(plugins);
        plugins = arrayFilter(plugins, function (v, i, a) {
            var flag = false;//true:exist!
            if (isFunction(iOrFOrN)) {
                flag = eq(v.f, iOrFOrN);
            }
            else if (isNumber(iOrFOrN)) {
                flag = eq(v.pId, iOrFOrN);
            }
            else if (isStr(iOrFOrN)) {
                flag = eq(v.name, iOrFOrN);
            }
            if (flag && !eq(v.t, Plugin.TYPE_CALL)) {
                delete xy[v.name];
            }
            return !flag;
        });
        return gt(a, len(plugins));
    }

    function clearPlugins() {
        arrayForEach(plugins, function (v, i, a) {
            if (!eq(v.t, Plugin.TYPE_CALL)) {
                delete xy[v.name];
            }
        });
        plugins.length = 0;
        return peq(plugins, 0);
    }







    //9.Open API functions

    var fn = {
        T: whatType,
        C: whatClass,
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
        dv: defaultValue,
        lt: lt,
        nlt: nlt,
        gt: gt,
        ngt: ngt,
        len: len,
        eq: eq,
        pgt: pgt,
        pnl: pnl,
        peq: peq,
        deepEQ: deepEQ,
        fnExist: fnExist,
        oExist: oExist,
        openInterval: openInterval,
        closedInterval: closedInterval,
        min: min,
        max: max,
        pmax: pmax,
        pmin: pmin,
        compareInt10: compareInt10,
        gtInt10: gtInt10,
        ltInt10: ltInt10,
        eqInt10: eqInt10,
        addInt10: addInt10,
        powerInt10: powerInt10,
        addInt10One: addInt10One,
        compareInt10: compareInt10,
        multiplyInt10: multiplyInt10,
        substractInt10: substractInt10,
        divideInt10: divideInt10,
        modInt10: modInt10,
        divideAndRemainderInt10: divideAndRemainderInt10,
        radixToInt10: radixToInt10,
        int10ToRadix: int10ToRadix,
        hashCodeS: hashCodeS,
        hashCodeI: hashCodeI,
        ext: ext,
        impl: impl,
        static_impl: static_impl,
        inf_ext: inf_ext,
        inst_of: inst_of,
        notInstanceof: notInstanceof,
        ntfs: ntfs
    };

    var interfaces = {
        std: std_interfaces
    }

    var classes = {
        EMPTY: EMPTY_VALUES,
        Set: Set,
        ValueSet: ValueSet,
        Map: Map,
        ValueMap: ValueMap,
        BigInteger: BigInteger,
        HashMap: HashMap
    };

    var pluginsDEV = {
        // plugins: plugins,
        Plugin: Plugin,
        allPlugins: allPlugins,
        addPlugin: addPlugin,
        removePlugin: removePlugin,
        clearPlugins: clearPlugins,
        hasPlugin: hasPlugin
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

    // this.xy = xy;
    // export default xy;
    return xy;

}));
