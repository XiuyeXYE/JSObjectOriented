(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_toObject = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c) {
    var proto = c.prototype;

    proto.toObject = function () {
      return {
        years: this.$y,
        months: this.$M,
        date: this.$D,
        hours: this.$H,
        minutes: this.$m,
        seconds: this.$s,
        milliseconds: this.$ms
      };
    };
  });

  return index;

})));
