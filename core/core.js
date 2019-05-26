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

//in general,self -> function.prototype  -> {} -> null
//3 level
//not extends constructor!
//single inheritance
/**
 * 
 * superclass : base
 * 只支持单继承!
 * 
 * @param {function|class} dest 
 * @param {function|class} src 
 */
function ext(dest, src) {
    if (pgt2(arguments)) {
        var finalClass = dest;
        for (var i = arguments.length - 1; i > 0; i--) {
            finalClass = ext(arguments[i - 1], arguments[i]);
        }
        return finalClass;
    } else if (isFunction(dest) && isFunction(src)) {
        //up search
        var methods_obj = dest.prototype;
        var sup = methods_obj.__proto__;
        var supLevel = 0;
        while (oExist(sup)) {
            sup = sup.__proto__;
            supLevel++;
        }
        if (gt(supLevel, 1)) {
            throw dest.name + ' cannot support multiple inheritance!';
        }
        //laste expr =
        //instanceof OK
        // methods_obj.__proto__ = src.prototype;
        //可以让impl和extends可以任意顺序
        shallowCopyObj(methods_obj.__proto__, src.prototype);
        methods_obj.__proto__.constructor = src.prototype.constructor;
        if (!fnExist(methods_obj.base)) {
            methods_obj.base = function () {//<=>super
                var f = this.__proto__.__proto__;//super
                var fcon = f.constructor;
                console.log('fcon=', fcon);
                fcon.apply(this, arguments);
            }
        }
        return dest;
    }
}

/**
 * i : {} 
 * d : function
 * 把对象作为接口
 * 
 */
//implements interfaces
function impl(clazz, inf) {
    if (pgt2(arguments)) {
        var finalClass = clazz;
        for (var i = arguments.length - 1; i > 0; i--) {
            finalClass = impl(clazz, arguments[i]);
            console.log('finalClass === clazz', finalClass === clazz);
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
* 
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
        shallowCopyObj.apply(this, ps);
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