(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_isSameOrBefore = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c) {
    c.prototype.isSameOrBefore = function (that, units) {
      return this.isSame(that, units) || this.isBefore(that, units);
    };
  });

  return index;

})));
