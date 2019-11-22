/**
 * My API for Ajax
 */

; (function (global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function (window) {

    var xy = window.xy;
    if (!xy) {
        throw "Need xy.js framework!!!";
    }

    //Ajax 
    var XMLHttpRequest = window.XMLHttpRequest;

    /**
     *
     * Ajax API
     *
     */

    var AJAX_TYPE = {
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
    };



    function Ajax() {
        xy.notInstanceof(this, Ajax, 'Constructor Ajax requires "new"!');
        if (xy.fnExist(XMLHttpRequest)) {
            this.xhr = new XMLHttpRequest;
        }
    }

    xy.static_impl(Ajax, xy.std.extend_interface);
    xy.impl(Ajax, xy.std.extend_interface);
    Ajax.extend(AJAX_TYPE);

    var Ajax_impl = {
        exist: function () {
            return xy.oExist(this.xhr);
        },
        q: function (params) {
            if (this.exist()) {
                params = xy.dv(params, xy.EMPTY.OBJECT);
                var url = xy.dv(params.url, xy.EMPTY.STRING);
                var data = params.data;
                var method = xy.dv(params.type, AJAX_TYPE.TYPE_GET);
                var success = params.success;
                var error = params.error;
                var dataType = xy.dv(params.dataType, AJAX_TYPE.DATA_TYPE_DEFAULT);
                var headers = xy.dv(params.headers, xy.EMPTY.OBJECT);
                var async = xy.dv(params.async, true);

                this.xhr.open(method, url, async);
                for (var h in headers) {
                    var v = headers[h];
                    this.xhr.setRequestHeader(h, v);
                }
                this.xhr.responseType = dataType;

                this.xhr.onreadystatechange = function (e) {
                    var xhrt = e.target;
                    if (xhrt.readyState == XMLHttpRequest.DONE) {
                        if (xhrt.status == 200 && xy.fnExist(success)) {
                            success(xhrt.response, xhrt);
                        }
                        else if (xy.fnExist(error)) {
                            error(xhrt.response, xhrt);
                        }
                    }
                };
                this.xhr.send(data);
            }

        }
    };

    xy.impl(Ajax, Ajax_impl);

    function q(params) {
        new Ajax().q(params);
    }

    xy.addPlugin(xy.Plugin.TYPE_CLASS, Ajax);
    xy.addPlugin(xy.Plugin.TYPE_FUNCTION, q);



}));
