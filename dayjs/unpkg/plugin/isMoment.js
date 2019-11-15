(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_isMoment = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c, f) {
    f.isMoment = function (input) {
      return f.isDayjs(input);
    };
  });

  return index;

})));
