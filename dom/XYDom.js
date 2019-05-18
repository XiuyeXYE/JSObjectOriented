/**
 *
 */
(function(global, factory) {
	factory(global);
}(typeof window !== "undefined" ? window : this, function(window) {

	function notSupportMethod(){
		throw "function "+notSupportMethod.caller.name+" not supported by this document.";
	}
	var document = window.document || {
// style:{},
// classList:{},
		getElementById:function(id){notSupportMethod();},
		getAttribute:function(k){notSupportMethod();},
		setAttribute:function(k,v){notSupportMethod();},
	}/* compatibility */;

	// 这种方式是错误的!!!因为是引用,所以只想同一个
	// 不要定义静态变量赋初始值,否则容易出bug
	// const EMPTY_ARRAY = [];
	// const EMPTY_STRING = '';

	/**
	 * Utilities :
	 *
	 *
	 */


	function isNull(s){
		// 注意null==undefined:true
		// 所以用"==="
		return s === null;
	}

	function isUndefinded(s){
		// 注意null==undefined:true
		// 所以用"==="
		return s === undefined;
	}

	function isStr(s){
		return typeof s === 'string';
	}

	function isArray(a){
		return Array.isArray(a);
	}

	function isFunction(f){
		return typeof f === 'function';
	}

	function strIsEmpty(s){
		return s.length == 0;
	}

	function strNonEmpty(s){
		return isStr(s)&&!strIsEmpty(s);
	}



	function str2ListBySeparator(s,separator){
		if(strNonEmpty(s)){
			return s.split(separator);
		}
		return [];
	}

	function convertStr2ListByWs(s){
		return str2ListBySeparator(s,/\s+/);
	}

	function list2StrWithJoint(a,joint){

		if(isArray(a)){
			return a.join(joint);
		}
		return '';
	}

	function convertList2StrWithWs(a){
		return list2StrWithJoint(a,' ');
	}


	function arrayFilter(a,f){
		if(isArray(a)&&isFunction(f)){
			var tmp = [];
			for(var i=0;i<a.length;i++){
				if(f(a[i]))tmp.push(a[i]);
			}
			return tmp;
		}
		return [];
	}

	function arrayForEach(a,f){
		if(isArray(a)&&isFunction(f)){
			for(var i=0;i<a.length;i++){
				f(a[i]);
			}
		}else{
			throw 'First param:array,second param:function!';
		}
	}


	/**
	 * End.
	 */





	function dom(node) {
		this.node = node;
	};
	dom.prototype = {
		constructor : dom,
		//
		attr : function(k, v) {
			if (arguments.length == 0) {
				throw "less than one parameter!";
			} else if (arguments.length == 1) {
				return this.node.getAttribute(k);
			} else if (arguments.length >= 2) {
				this.node.setAttribute(k, v);
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
		css:function(k, v) {
			if (arguments.length == 0) {
				return str2ListBySeparator(this.attr('style'), /\s*;\s*/);
			} else if (arguments.length == 1) {
				var cssExprs = str2ListBySeparator(this.attr('style'), /\s*;\s*/);
				cssExprs = arrayFilter(cssExprs,function(cssExpr){
					if(strNonEmpty(cssExpr)&&cssExpr.indexOf(k)!=-1){
						return true;
					}
					else{
						return false;
					}
				});

				if(cssExprs.length >= 1){
					var vs = [];
					arrayForEach(cssExprs,function(cssExpr){
						var cssKV = str2ListBySeparator(cssExpr,/\s*:\s*/);
						if(cssKV.length==2){
							vs.push(cssKV[1]);
						}
					});
					if(vs.length == 1){
						return vs[0];
					}
					else if(vs.length > 1){
						return vs;
					}
				}
				return '';
			} else if (arguments.length >= 2) {
				var newCssExpr = k+':'+v;
				var cssExprs = str2ListBySeparator(this.attr('style'), /\s*;\s*/);
				cssExprs = arrayFilter(cssExprs,function(cssExpr){
					var cssKV = str2ListBySeparator(cssExpr,/\s*:\s*/);
					if(cssKV.length==2){
						return cssKV[0] !== k;
					}
					//<=>clear wrong css
					return false;
				});
				cssExprs.push(newCssExpr);
				return this.attr('style',list2StrWithJoint(cssExprs,';'));
			}
		},
		cls:function(c,append=true){
			if(arguments.length==0){
				return convertStr2ListByWs(this.attr('class'));
			}
			else if(isStr(c)){
				//如果是空字符串直接返回!
				if(strIsEmpty(c)){
					return;
				}
				var classList = convertStr2ListByWs(this.attr('class'));
				classList = arrayFilter(classList,
					function(d){
							return d !== c;
					});
				if(append){
					classList.push(c);
				}
				var classStr = convertList2StrWithWs(classList);
				this.attr('class',classStr);

			}else{
				throw 'First parameter must be string!';
			}
		}

	};

	// 为了解决和jQuery等框架的冲突，必须是函数，真操蛋！！！
	var xy = function() {
	};

	xy.__proto__ = {
			constructor:xy.constructor,

			// 根据元素ID找到html对象
			byId:function(id) {
				return new dom(document.getElementById(id));
			},

			// 把空格字符串拆分成数组
			convertStr2ListByWs:convertStr2ListByWs,
			// 把字符串数组合并字符串
			convertList2StrWithWs:convertList2StrWithWs,
			// 过滤数组生成新的数组
			arrayFilter:arrayFilter,
			// 判断对象是否为空
			isNull:isNull,
			isArray:isArray,
			// 判断变量是否未定义
			isUndefinded:isUndefinded,
			// 判断变量是否是字符串
			isStr:isStr,
			// 判断字符串是否是为空
			strIsEmpty:strIsEmpty,
			// 非空字符串
			strNonEmpty:strNonEmpty,
			// 判断变量是否是函数
			isFunction:isFunction,
			// 根据指定符号拆分字符串成数组
			str2ListBySeparator:str2ListBySeparator,
			// 用指定符号合并字符串数组
			list2StrWithJoint:list2StrWithJoint,
			arrayForEach:arrayForEach,
	};


	window.xy = xy;
	return xy;
}));
