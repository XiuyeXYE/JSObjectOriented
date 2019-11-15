(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_minMax = factory());
}(this, (function () { 'use strict';

  var index = (function (o, c, d) {
    var sortBy = function sortBy(method, dates) {
      if (!dates.length) {
        return d();
      }

      if (dates.length === 1 && dates[0].length > 0) {
        var _dates = dates;
        dates = _dates[0];
      }

      var result;
      var _dates2 = dates;
      result = _dates2[0];

      for (var i = 1; i < dates.length; i += 1) {
        if (!dates[i].isValid() || dates[i][method](result)) {
          result = dates[i];
        }
      }

      return result;
    };

    d.max = function () {
      var args = [].slice.call(arguments, 0); // eslint-disable-line prefer-rest-params

      return sortBy('isAfter', args);
    };

    d.min = function () {
      var args = [].slice.call(arguments, 0); // eslint-disable-line prefer-rest-params

      return sortBy('isBefore', args);
    };
  });

  return index;

})));
