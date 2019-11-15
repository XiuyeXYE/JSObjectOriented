(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_dayOfYear = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c) {
    var proto = c.prototype;

    proto.dayOfYear = function (input) {
      var dayOfYear = Math.round((this.startOf('day') - this.startOf('year')) / 864e5) + 1;
      return input == null ? dayOfYear : this.add(input - dayOfYear, 'day');
    };
  });

  return index;

})));
