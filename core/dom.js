/**
 * My API for dom 
 */

; (function (global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function (window) {

    
    
    var xy = window.xy;
    
    if (!xy) {
        throw "Need xy2.js framework!!!";
    }
    
    var document = window.document || {};

    
    function hasString(str, subStr) {

        return xy.isStr(str) && xy.isStr(subStr) && !x.eq(str.indexOf(subStr), -1);
    }

    function hasComma(s) {
        return hasString(s, ',');
    }

    function hasGtSign(s) {
        return hasString(s, '>');
    }

    function hasWS(s) {
        return hasString(s, ' ');
    }

    function hasWellSign(s) {
        return hasString(s, '#');
    }

    function hasDotSign(s) {
        return hasString(s, '.');
    }

    function bySingleId(node, s) {
        return node.getElementById(s);
    }

    function bySingleClass(node, s) {
        return node.getElementsByClassName(s);
    }

    function bySingleTagName(node, s) {
        return node.getElementsByTagName(s);
    }

    function preSelectorHandler(selector) {
        selector = selector.replace(/^,|,$/, '');
        selector = selector.trim();
        return selector;
    }

    function push(elems, node) {
        if (xy.oExist(node)) {
            if (xy.isArray(node)) {
                elems.concat(node);
            } else {
                elems.push(node);
            }
        }
    }

    function query(selector, node = document, elems = []) {

        //预处理
        if (xy.xy.strNonEmpty(selector) || !xy.oExist(node)) {
            return null;
        }
        selector = preSelectorHandler(selector);
        //分割

        if (hasComma(selector)) {
            var subSeletors = selector.split(/\s*,\s*/);
            for (var i = 0; i < xy.len(subSeletors); i++) {
                node = query(subSeletors[i], document, elems);
                push(elems, node);
            }
        } else if (hasGtSign(selector)) {
            var subSeletors = selector.split(/\s*>\s*/);
            for (var i = 0; i < xy.len(subSeletors); i++) {
                node = query(subSeletors[i], node, elems);
            }
            // return node;
        } else if (hasWS(selector)) {
            var subSeletors = selector.split(/\s+/);
            for (var i = 0; i < xy.len(subSeletors); i++) {
                node = query(subSeletors[i], node, elems);
            }
            // return node;
        }

        //求元素
        if (xy.isArray(node)) {
            for (var i = 0; i < xy.len(node); i++) {
                push(elems, query(selector, node[i], elems));
            }
        } else if (hasWellSign(selector)) {
            selector = selector.replace('#', '');
            return bySingleId(node, selector);
        } else if (hasDotSign(selector)) {
            selector = selector.replace('.', '');
            return bySingleClass(node, selector);
        } else {
            return bySingleTagName(node, selector);
        }


        return elems;
    }

    //document selector query dom
    // function query(d, selector) {

    //     //default []
    //     var elems = d.querySelectorAll(selector);

    //     if (pnl2(elems)) {
    //         return domlist.of(elems);
    //     }

    //     return dom.of(elems[0]);
    // }





    //html element
    function Dom(node) {
        xy.notInstanceof(this, Dom, 'Constructor Dom requires "new"!');
        this.init(node);
    }



    //basic
    var Dom_impl = {
        //real constructor
        init: function (n) {
            this.node = n;
        },
        // d: function (selector) {
        //     return query(this.node, selector);
        // },
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
                return xy.EMPTY.STRING;
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
                return xy.str2ListBySeparator(this.attr('style'), /\s*;\s*/);
            } else if (arguments.length == 1) {
                var cssExprs = xy.str2ListBySeparator(this.attr('style'), /\s*;\s*/);
                cssExprs = xy.arrayFilter(cssExprs, function (cssExpr) {
                    if (xy.strNonEmpty(cssExpr) && cssExpr.indexOf(k) != -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                if (cssExprs.length >= 1) {
                    var vs = xy.EMPTY.ARRAY;
                    xy.arrayForEach(cssExprs, function (cssExpr) {
                        var cssKV = xy.str2ListBySeparator(cssExpr, /\s*:\s*/);
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
                return xy.EMPTY.STRING;
            } else if (arguments.length >= 2) {
                var newCssExpr = k + ':' + v;
                var cssExprs = xy.str2ListBySeparator(this.attr('style'), /\s*;\s*/);
                cssExprs = xy.arrayFilter(cssExprs, function (cssExpr) {
                    var cssKV = xy.str2ListBySeparator(cssExpr, /\s*:\s*/);
                    if (cssKV.length == 2) {
                        return cssKV[0] !== k;
                    }
                    // <=>clear wrong css
                    return false;
                });
                cssExprs.push(newCssExpr);
                return this.attr('style', xy.list2StrWithJoint(cssExprs, ';'));
            }
        },
        cls: function (c, append) {
            append = append || true;
            if (arguments.length == 0) {
                return xy.convertStr2ListByWs(this.attr('class'));
            }
            else if (xy.isStr(c)) {
                // 如果是空字符串直接返回!
                if (xy.strIsEmpty(c)) {
                    return;
                }
                var classList = xy.convertStr2ListByWs(this.attr('class'));
                classList = xy.arrayFilter(classList,
                    function (d) {
                        return d !== c;
                    });
                if (append) {
                    classList.push(c);
                }
                var classStr = xy.convertList2StrWithWs(classList);
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
            return xy.EMPTY.OBJECT;
        },
        width: function (w, u) {
            u = u || 'px';
            if (xy.p(arguments, 0)) {
                return this.clientWidth();
            }
            else if (pnl1(arguments) && isNumber(w)) {
                this.css('width', w + u);
                return this;
            }
        },
        height: function (h, u) {
            u = u || 'px';
            if (xy.p(arguments, 0)) {
                return this.clientHeight();
            }
            else if (pnl1(arguments) && isNumber(h)) {
                this.css('height', h + u);
                return this;
            }
        },
        full: function (h) {
            if (xy.p(arguments, 0)) {
                return this.k('outerHTML');
            } else {
                //will changes node,no return!
                this.kv('outerHTML', h);
            }
        },
        html: function (h) {
            h = xy.dv(h, xy.EMPTY.STRING);
            if (this.exist()) {
                //bug: 不是所有的属性，都可以用这种方式检验属性啊
                //因为空字符串''也是false！！！
                //直接用吧，即可
                // if (!!this.node.innerHTML) {
                if (xy.p(arguments, 0)) {
                    return this.node.innerHTML;
                }
                this.node.innerHTML = h;
                // }
            }

        },
        text: function (t) {
            t = xy.dv(t, xy.EMPTY.STRING);
            if (this.exist()) {
                // if (!!this.node.innerText) {
                if (xy.p(arguments, 0)) {
                    return this.node.innerText;
                }
                this.node.innerText = t;
                // }
            }

        },
        //fix bug:var v and function v conflict!!!
        value: function (v) {
            v = xy.dv(v, xy.EMPTY.STRING);
            if (this.exist()) {
                if (xy.p(arguments, 0)) {
                    return this.attr('value');
                }
                this.attr('value', v);
            }
        }

    };

    xy.impl(Dom, Dom_impl);

    var Dom_static_impl = {
        create: function (tag) {
            return new this(document.createElement(tag));
        }
    };

    xy.static_impl(Dom, Dom_static_impl);

    function crtDom(tag) {
        return Dom.create(tag);
    }


    xy.addPlugin(xy.Plugin.TYPE_CLASS, Dom);
    xy.addPlugin(xy.Plugin.TYPE_FUNCTION, crtDom);


    return xy;

}));
