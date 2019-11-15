(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_toArray = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c) {
    var proto = c.prototype;

    proto.toArray = function () {
      return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms];
    };
  });

  return index;

})));
