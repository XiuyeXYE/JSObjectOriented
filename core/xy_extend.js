/**
 * my dom handler API class level function is not equal with obj function. class
 * function cannot be called by obj!!! obj function cannot be called by class!!!
 */
; (function (global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function (window) {

    // 'use strict';//not use caller

    //文档对象
    var document = window.document;
    //ajax 
    var XMLHttpRequest = window.XMLHttpRequest;
    //帧绘制回调
    var requestAnimationFrame = window.requestAnimationFrame;
    //删除
    var cancelAnimationFrame = window.cancelAnimationFrame;
    //定时器
    var setTimeout = window.setTimeout;
    //清理
    var clearTimeout = window.clearTimeout;
    //history
    var history = window.history;

    var Array = window.Array;

    //history

    var JSON = window.JSON;

    var xy = window.xy;





}));

