/**
 *
 *
 *
 */


(function(global, factory) {
	factory(global);
}(typeof window !== "undefined" ? window : this, function(window) {

	var xy = window.xy;

	var AJAX_TYPE = {
			TYPE_GET:'GET',
			TYPE_POST:'POST',
			TYPE_PUT:'PUT',
			TYPE_DELETE:'DELETE',
			DATA_TYPE_DEFAULT:'',
			DATA_TYPE_JSON:'json',
			DATA_TYPE_TEXT:'text',
			DATA_TYPE_BLOB:'blob',
			DATA_TYPE_DOM:'document',
			DATA_TYPE_BUFFER:'arraybuffer'
	};



	function ajax(){
		this.xhr = new XMLHttpRequest;
	}

	function createAjax(){
		return new ajax();
	}

	ajax = xy.shallowCopyObj(ajax, AJAX_TYPE);

	ajax.prototype = {
		constructor:ajax,
		q:function(params,async=true){
			var method=AJAX_TYPE.TYPE_GET;
			var url='';
			var data;
			var dataType=AJAX_TYPE.DATA_TYPE_DEFAULT;
			var success;
			if(!!params){
				url = params.url;
				data = params.data;
				method = !!params.type?params.type:AJAX_TYPE.TYPE_GET;
				success = params.success;
				dataType = !!params.dataType?params.dataType:AJAX_TYPE.DATA_TYPE_DEFAULT;
			}
	        this.xhr.open(method,url,async);
	        for(var h in this.headers){
	            var v = headers[h];
	            this.xhr.setRequestHeader(h,v);
	        }
	        this.xhr.responseType = dataType;

			this.xhr.onreadystatechange=function(e){
			    var xhrt = e.target;
				if(xhrt.readyState==XMLHttpRequest.DONE&&xhrt.status==200){
					if(!!success)
						success(xhrt.response,xhrt);
				}
			};
			this.xhr.send(data);
		}
	};

	//static methods
	var fn = {
			createAjax:createAjax,
			q:function(params,async=true){
				var ajax = this.createAjax();
				ajax.q(params, async);
			},
	};


	//static fields
	var clses = {
		Ajax:ajax
	};

	xy.extend(clses,fn);


	return ajax;

}));

