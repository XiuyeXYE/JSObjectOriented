/**
 * http://usejsdoc.org/
 */

;
if (!xy) {
	throw "Need xy2.js framework!!!";
}


/**
 * 
 * Ajax API
 * 
 */

xy.D(function Ajax() {
	xy.notInstanceof(this, Ajax, 'Constructor Ajax requires "new"!');
	if (xy.fnExist(XMLHttpRequest)) {
		this.xhr = new XMLHttpRequest();
	}
}, {
	exist: function () {
		return xy.oExist(this.xhr);
	},
	q: function (params) {
		if (this.exist() && xy.oExist(params)) {

			var url = params.url;
			var data = params.data;
			var method = xy.dv(params.type, xy.Ajax.TYPE_GET);
			var success = params.success;
			var dataType = xy.dv(params.dataType, xy.Ajax.DATA_TYPE_DEFAULT);
			var headers = params.headers;
			var async = xy.dv(params.async, true);

			//set listener
			this.xhr.onerror = params.error;
			this.xhr.onloadstart = params.loadstart;
			this.xhr.onprogress = params.progress;
			this.xhr.onabort = params.abort;
			this.xhr.onload = params.load;
			this.xhr.ontimeout = params.timeout;
			this.xhr.onloadend = params.onloadend;

			this.xhr.open(method, url, async, params.user, params.password);

			if (xy.oExist(headers)) {
				for (var h in headers) {
					var v = headers[h];
					this.xhr.setRequestHeader(h, v);
				}
			}

			this.xhr.responseType = dataType;

			this.xhr.onreadystatechange = function (e) {
				if (params.readystatechange) {
					params.readystatechange(e);
				}
				var xhrt = e.target;
				if (xhrt.readyState == XMLHttpRequest.DONE) {
					if (xhrt.status == 200 && xy.fnExist(success)) {
						success(xhrt.response, xhrt);
					}
				}
			};
			if (params.withCredentials) {
				this.xhr.withCredentials = true;
			} else {
				this.xhr.withCredentials = false;
			}

			this.xhr.send(data);
		}

	}
}, {
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
}, true);

xy.D(function ajax(params) {
	new this.Ajax().q(params);
});


xy.D(function Socket(url, protocals) {
	// this.base(url,protocals);//not extends class !
	this.url = url;
	this.protocals = protocals;
	this.o(new WebSocket(url, protocals));
	this.events = new xy.HashMap();

	Object.defineProperties(this, {
		onopen: {
			get() {
				return this.k('onopen');
			},
			set(callback) {
				this.kv('onopen', callback);
			},
			enumerable: true,
			configurable: true
		},
		onerror: {
			get() {
				return this.k('onerror');
			},
			set(callback) {
				this.kv('onerror', callback);
			},
			enumerable: true,
			configurable: true
		},
		onmessage: {
			get() {
				return this.k('onmessage');
			},
			set(callback) {
				this.kv('onmessage', callback);
			},
			enumerable: true,
			configurable: true
		},
		onclose: {
			get() {
				return this.k('onclose');
			},
			set(callback) {
				this.kv('onclose', callback);
			},
			enumerable: true,
			configurable: true
		}
	});
}
	, {//implementations event
		registerEvent(e, c) {
			let events = this.events.get(e);
			if (!xy.isArray(events)) {
				events = xy.EMPTY.ARRAY;
				this.events.put(e, events);
			}
			if (xy.eq(events.indexOf(c), -1)) {
				events.push(c);
			}
		},
		unregisterEvent(e, c) {
			let events = this.events.get(e);
			if (!xy.isArray(events)) {
				return;
			}
			let idx = -1;
			if (!xy.eq(idx = events.indexOf(c), -1)) {
				events.splice(idx, 1);
			}
		},
		on() {
			this.invoke('addEventListener', arguments);
			this.registerEvent(arguments[0], arguments[1]);
			return this;
		},
		off() {
			this.invoke('removeEventListener', arguments);
			this.unregisterEvent(arguments[0], arguments[1]);
			return this;
		},
		once() {
			//listener wrap:
			let ps = xy.arrayLike2Array(arguments);
			let eventCallbackListener = ps[1];
			let that = this;
			if (xy.fnExist(eventCallbackListener)) {
				ps[1] = function () {
					//the following code does not run in function in the beginning of time!
					// xdebug(this);
					xy.fy(eventCallbackListener, this, arguments);
					xy.fy(that.off, that, ps);
				};
				// this.invoke('addEventListener', ps);
				xy.fy(this.on, this, ps);
			}
			return this;
		},
		emit(e, d) {
			return this.trigger(e, d);
		},
		trigger(e, d) {
			if (this.exist() && xy.pnl(arguments, 1) && xy.fnExist(this.k('dispatchEvent'))) {
				this.fn('dispatchEvent', new CustomEvent(e, { detail: d }));
			}
			return this;
		},
		send() {
			this.invoke(arguments);
		},
		close() {
			this.invoke(arguments);
		}
	},
	xy.f2j(WebSocket)
);


xy.I('Socket', xy.std.inst_wrapper_interface);
// xy.S('Socket',WebSocket);



//common API
xy.D(function ajaxPublicNetworkIP(callback) {// kind C IP
	const ipAPI = 'http://api.ipify.org?format=json';
	xy.ajax({
		url: ipAPI,
		success: callback
	});
});

xy.D(function fetchPublicNetworkIP(callback) {// kind C IP
	const ipAPI = 'http://api.ipify.org?format=json';
	fetch(ipAPI)
		.then(response => response.json())
		.then(data => data.ip).then(callback);
});


