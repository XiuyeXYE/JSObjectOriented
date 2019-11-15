(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_weekday = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c) {
    var proto = c.prototype;

    proto.weekday = function (input) {
      var weekStart = this.$locale().weekStart || 0;
      var $W = this.$W;
      var weekday = ($W < weekStart ? $W + 7 : $W) - weekStart;

      if (this.$utils().u(input)) {
        return weekday;
      }

      return this.subtract(weekday, 'day').add(input, 'day');
    };
  });

  return index;

})));
