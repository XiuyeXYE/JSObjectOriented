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
		style:{},
		classList:{},
		getElementById:function(id){notSupportMethod();},
		getAttribute:function(k){notSupportMethod();},
		setAttribute:function(k,v){notSupportMethod();},
	}/* compatibility */;
	
	const EMPTY_ARRAY = [];
	const EMPTY_STRING = '';
	
	/**
	 * Utilities :
	 * 
	 * 
	 */
	
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
	
	function arrayFilter(a,f){
		if(isArray(a)&&isFunction(f)){
			var tmp = [];
			
			for(var i=0;i<a.length;i++){
				if(f(a[i]))tmp.push(a[i]);
			}
			
			return tmp;
		}
		return EMPTY_ARRAY;
	}
	
	function convertStr2ListByWs(s){
		if(isStr(s)&&!strIsEmpty(s)){
			return s.split(/\s+/);
		}
		return EMPTY_ARRAY;
	}
	
	function convertList2StrWithWs(a){
		
		if(isArray(a)){
			return a.join(' ')
		}
		return EMPTY_STRING;
	}
	
	function isNull(s){
		//注意null==undefined:true
		//所以用"==="
		return s === null;
	}
	
	function isUndefinded(s){
		//注意null==undefined:true
		//所以用"==="
		return s === undefined;
	}
	
	
	
	/**
	 * End.
	 */
	
	
	
	
		
	function dom(node) {
		this.node = node;
	};
	dom.prototype = {
		constructor : dom,
		attr : function(k, v) {
			if (arguments.length == 0) {
				throw "less than one parameter!";
			} else if (arguments.length == 1) {
				return this.node.getAttribute(k);
			} else if (arguments.length == 2) {
				this.node.setAttribute(k, v);
			}
		},
		css : function(k, v) {
			if (arguments.length == 0) {
				throw "less than one parameter!";
			} else if (arguments.length == 1) {
				return this.node.style[k];
			} else if (arguments.length == 2) {
				this.node.style[k] = v;
			}
		},
		cls:function(c,append=true){
			if(arguments.length==0){
				return convertStr2ListByWs(this.attr('class'));
			}
			else if(isStr(c)){
				var classList = convertStr2ListByWs(this.attr('class'));
				classList = arrayFilter(classList,function(d){return d !== c});
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
			
			byId:function(id) {
				return new dom(document.getElementById(id));
			},
		
			// 把空格字符串拆分成数组
			convertStr2ListByWs:convertStr2ListByWs,
			convertList2StrWithWs:convertList2StrWithWs,
			arrayFilter:arrayFilter,
			isNull:isNull,
			isUndefinded:isUndefinded,
			isStr:isStr,
			isFunction:isFunction,
			strIsEmpty:strIsEmpty
	};

	
	window.xy = xy;
	return xy;
}));
