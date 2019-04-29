/**
 * 
 * 
 * 
 */


export default class Ajax{
	static TYPE_GET='GET';
	static TYPE_POST='POST';
	static TYPE_PUT='PUT';
	static TYPE_DELETE='DELETE';
	static DATA_TYPE_DEFAULT='';
	static DATA_TYPE_JSON='json';
	static DATA_TYPE_TEXT='text';
	static DATA_TYPE_BLOB='blob';
	static DATA_TYPE_DOM='document';
	static DATA_TYPE_BUFFER='arraybuffer';
	constructor(){
        this.xhr = new XMLHttpRequest;
        this.headers = [];
	}
	header(h,v){
		this.headers.push([h,v]);
	}
	request(params,async=true){
		let method=Ajax.TYPE_GET;
		let url='';
		let data;
		let dataType=Ajax.DATA_TYPE_DEFAULT;
		let success;
		if(!!params){
			url = params.url;
			data = params.data;
			method = !!params.type?params.type:Ajax.TYPE_GET;
			success = params.success;
			dataType = !!params.dataType?params.dataType:Ajax.DATA_TYPE_DEFAULT;
		}
        this.xhr.open(method,url,async);
        for(let header of this.headers){
            let [h,v] = header;
            this.xhr.setRequestHeader(h,v);
        }
        this.xhr.responseType = dataType;
        
		this.xhr.onreadystatechange=(e)=>{
		    let xhrt = e.target;
			if(xhrt.readyState==XMLHttpRequest.DONE&&xhrt.status==200){
				if(!!success)
					success(xhrt.response,xhrt);
			}
		}
		this.xhr.send(data);
	}
	static create(){
		return new Ajax();
	}
	
}

