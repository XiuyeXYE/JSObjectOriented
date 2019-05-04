/**
 * 
 */

export default class Dom {
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

