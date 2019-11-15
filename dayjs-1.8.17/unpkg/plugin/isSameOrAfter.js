(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_isSameOrAfter = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c) {
    c.prototype.isSameOrAfter = function (that, units) {
      return this.isSame(that, units) || this.isAfter(that, units);
    };
  });

  return index;

})));
