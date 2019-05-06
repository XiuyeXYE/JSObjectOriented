/**
 * 
 */
export default class Dom{


    static DOM = new Dom(document); 

    constructor(node) {
        if(arguments.length<1){
            throw 'Dom constructor must has one parameter:Node';
        }
        this.node = node;
    }

    rmSelf(){
        if(!!this.node.remove)
            this.node.remove();
    }

    value(v){
        // undefined == null : true
        // undefined === null : false
        // if(!!v||v=='' || v === null){
        //     this.node.value = v;
        //     return;
        // }
        // if(v === undefined){
        //     this.node.value = '';
        //     return;
        // }
        if(arguments.length>0){
            if(v !== undefined ){
                this.node.value = v;
            }
            else{
                this.node.value = '';
            }
        }
        

        return this.node.value;
    }

    rmChild(node){
        this.node.removeChild(node);
    }

    append(node){
        this.node.appendChild(node);
    }

    set(attr,value){
        this.node.setAttribute(attr,value);
    }

    get(attr){
        return this.node.getAttribute(attr);
    }

    rm(attr){
        this.node.removeAttribute(attr);
    }



    on(e, callback) {
        if (arguments.length < 2) {
            throw "error:this method has two parameters.";
        }
        this.node.addEventListener(e, callback);
    }
    off(e, callbck) {
        if (arguments.length < 2) {
            throw "error:this method has two parameters.";
        }
        this.node.removeEventListener(e, callback);
    }

    trigger(e){
        this.node.dispatchEvent(new CustomEvent(e));
    }

    click(callback,only=false){

        if(arguments.length==0){
            this.trigger('click');
            return;
        }

        if(only){
            this.node.onclick = callback;
            return;
        }
        this.on("click",callback);
    }

    static create(node,nType){
        switch(nType){
            case Node.ELEMENT_NODE:
                return document.createElement(node);
            case Node.TEXT_NODE:
                return document.createTextNode(node);
        }
        
    }

    static d(node){
        // 用系统自带的选择器api，就不用自己写状态机了
        let elements = document.querySelectorAll(node);
        if(elements.length==0){
            return;
        }
        if(elements.length==1){
            return new Dom(elements[0]);
        }
        if(elements.length>1){
            return new DomList(elements);
        }
    } 
    static byId(id) {
        return new Dom(document.getElementById(id));
    }
    static byClass(clsName) {
        return new Dom(document.getElementsByClassName(clsName));
    }
    static byTagName(tagName) {
        return new Dom(document.getElementsByTagName(tagName));
    }
    static byName(name) {
        return new Dom(document.getElementsByName(name));
    }

    static after(callback){
        // let dom = new Dom(document);
        Dom.DOM.on('DOMContentLoaded',callback);
    }

}
Object.freeze(Dom);
class DomList{
    constructor(elements){
    	let domList = [];
        let i=0;
    	elements.forEach((d)=>{
            domList.push(new Dom(d));
            this[i++] = d;
        });
        this.length = i-1;

        this.domList = domList;
        
    }

    item(index){
        return this.domList[index];
    }

    forEach(callback){
    	this.domList.forEach(callback);
    }
    
    rmSelf(){
        this.forEach(node=>node.rmSelf());
    }

    value(v){
        if(arguments.length>0){
            this.forEach(node=>node.value(v));
        }
        let vs = [];
        this.forEach(node=>{if(arguments.length>0){vs.push(node.value())}});
        return vs;
    }

    rmChild(n){
        this.forEach(node=>node.rmChild(n));
    }

    append(n){
        this.forEach(node=>node.append(n));
    }

    set(attr,value){
        this.forEach(node=>node.set(attr,value));
    }

    get(attr){
    	let vs = [];
    	this.forEach(node=>vs.push(node.get(attr)));
        return vs;
    }

    rm(attr){
        this.forEach(node=>node.rm(attr));
    }



    on(e, callback) {
        if (arguments.length < 2) {
            throw "error:this method has two parameters.";
        }
        this.forEach(node=>node.on(e,callback));
    }
    off(e, callbck) {
        if (arguments.length < 2) {
            throw "error:this method has two parameters.";
        }
        this.forEach(node=>node.off(callback));
    }

    trigger(e){
        this.forEach(node=>node.trigger(e));
    }

    click(callback,only=false){

        if(arguments.length==0){
            this.trigger('click');
            return;
        }

        if(only){
            this.forEach(node=>node.onclick=callback);
            return;
        }
        this.on("click",callback);
    }

   

}

// export default Dom;
// export Dom;

