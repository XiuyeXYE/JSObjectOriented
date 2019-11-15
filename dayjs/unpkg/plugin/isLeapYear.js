(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_isLeapYear = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c) {
    var proto = c.prototype;

    proto.isLeapYear = function () {
      return this.$y % 4 === 0 && this.$y % 100 !== 0 || this.$y % 400 === 0;
    };
  });

  return index;

})));
