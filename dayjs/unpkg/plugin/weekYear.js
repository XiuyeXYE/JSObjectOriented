(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_weekYear = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c) {
    var proto = c.prototype;

    proto.weekYear = function () {
      var month = this.month();
      var weekOfYear = this.week();
      var year = this.year();

      if (weekOfYear === 1 && month === 11) {
        return year + 1;
      }

      return year;
    };
  });

  return index;

})));
