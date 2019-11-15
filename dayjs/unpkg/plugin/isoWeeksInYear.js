(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_isoWeeksInYear = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c) {
    var proto = c.prototype;

    proto.isoWeeksInYear = function () {
      var isLeapYear = this.isLeapYear();
      var last = this.endOf('y');
      var day = last.day();

      if (day === 4 || isLeapYear && day === 5) {
        return 53;
      }

      return 52;
    };
  });

  return index;

})));
