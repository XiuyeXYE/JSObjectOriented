/**
 * 
 */
(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "XYDom requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : 
	this, 
	function( window, noGlobal ) {
	var document = window.document;
	function dom(node){
		this.node = node;
	};
	
	dom.prototype.attr=function(k,v){
		if(arguments.length==0){
			throw "less than one parameter!";
		}
		else if(arguments.length==1){
			return this.node.getAttribute(k);
		}
		else if(arguments.length==2){
			this.node.setAttribute(k,v);
		}
	};
	dom.prototype.css=function(k,v){
		if(arguments.length==0){
			throw "less than one parameter!";
		}
		else if(arguments.length==1){
			return this.node.style[k];
		}
		else if(arguments.length==2){
			this.node.style[k] = v;
		}
	}
	//为了解决和jQuery等框架的冲突，必须是函数，真操蛋！！！
	var xy = function(){};
	xy.__proto__.byId=function(id){
		return new dom(document.getElementById(id));
	}
	
	window.xy = xy;
	return xy;
}));

