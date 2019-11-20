/**
 * My API for dom 
 */

; (function (global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function (window) {


    xy = window.xy;
    if (!xy) {
        throw "Need xy.js framework!!!";
    }

    //document selector query dom
    function query(d, selector) {

        //default []
        var elems = d.querySelectorAll(selector);

        if (pnl2(elems)) {
            return domlist.of(elems);
        }

        return dom.of(elems[0]);
    }


    //html element
    function dom(node) {
        notInstanceof(this, dom, 'Constructor dom requires "new"!');
        this.init(node);
    }



    //basic
    var dom_impl = {
        //real constructor
        init: function (n) {
            this.node = n;
        },
        d: function (selector) {
            return query(this.node, selector);
        },
        exist: function () {
            return xy.oExist(this.node);
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
                if (xy.oExist(this.node) && xy.fnExist(this.node.getAttribute)) {
                    return this.node.getAttribute(k);
                }
                return EMPTY_VALUES.EMPTY_STRING;
            } else if (arguments.length >= 2) {
                if (xy.oExist(this.node) && xy.fnExist(this.node.setAttribute)) {
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
        cls: function (c, append) {
            append = append || true;
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
            if (this.exist() && xy.oExist(this.node.clientWidth)) {
                return this.node.clientWidth;
            }
            return 0;
        },
        clientHeight: function () {
            if (this.exist() && xy.oExist(this.node.clientHeight)) {
                return this.node.clientHeight;
            }
            return 0;
        },
        clientTop: function () {
            if (this.exist() && xy.oExist(this.node.clientTop)) {
                return this.node.clientTop;
            }
            return 0;
        },
        clientLeft: function () {
            if (this.exist() && xy.oExist(this.node.clientLeft)) {
                return this.node.clientLeft;
            }
            return 0;
        },
        offsetWidth: function () {
            if (this.exist() && xy.oExist(this.node.offsetWidth)) {
                return this.node.offsetWidth;
            }
            return 0;
        },
        offsetHeight: function () {
            if (this.exist() && xy.oExist(this.node.offsetHeight)) {
                return this.node.offsetHeight;
            }
            return 0;
        },
        offsetTop: function () {
            if (this.exist() && xy.oExist(this.node.offsetTop)) {
                return this.node.offsetTop;
            }
            return 0;
        },
        offsetLeft: function () {
            if (this.exist() && xy.oExist(this.node.offsetLeft)) {
                return this.node.offsetLeft;
            }
            return 0;
        },
        rect: function () {
            if (this.exist() && xy.fnExist(this.node.getBoundingClientRect)) {
                return this.node.getBoundingClientRect();
            }
            return EMPTY_VALUES.EMPTY_OBJECT;
        },
        width: function (w, u) {
            u = u || 'px';
            if (p0(arguments)) {
                return this.clientWidth();
            }
            else if (pnl1(arguments) && isNumber(w)) {
                this.css('width', w + u);
                return this;
            }
        },
        height: function (h, u) {
            u = u || 'px';
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
        },
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

    xy.impl(dom, dom_impl);

    var dom_static_impl = {
        create: function (tag) {
            return new this(document.createElement(tag));
        }
    };

    xy.static_impl(dom, dom_static_impl);

    function crtDom(tag) {
        return dom.create(tag);
    }





}));
