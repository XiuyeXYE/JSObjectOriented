(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_advancedFormat = factory());
}(this, (function () { 'use strict';

  var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';

  var index = (function (o, c, d) {
    // locale needed later
    var proto = c.prototype;
    var oldFormat = proto.format;

    d.en.ordinal = function (number) {
      var s = ['th', 'st', 'nd', 'rd'];
      var v = number % 100;
      return "[" + number + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
    }; // extend en locale here


    proto.format = function (formatStr) {
      var _this = this;

      var locale = this.$locale();
      var utils = this.$utils();
      var str = formatStr || FORMAT_DEFAULT;
      var result = str.replace(/\[([^\]]+)]|Q|wo|ww|w|gggg|Do|X|x|k{1,2}|S/g, function (match) {
        switch (match) {
          case 'Q':
            return Math.ceil((_this.$M + 1) / 3);

          case 'Do':
            return locale.ordinal(_this.$D);

          case 'gggg':
            return _this.weekYear();

          case 'wo':
            return locale.ordinal(_this.week(), 'W');
          // W for week

          case 'w':
          case 'ww':
            return utils.s(_this.week(), match === 'w' ? 1 : 2, '0');

          case 'k':
          case 'kk':
            return utils.s(String(_this.$H === 0 ? 24 : _this.$H), match === 'k' ? 1 : 2, '0');

          case 'X':
            return Math.floor(_this.$d.getTime() / 1000);

          case 'x':
            return _this.$d.getTime();

          default:
            return match;
        }
      });
      return oldFormat.bind(this)(result);
    };
  });

  return index;

})));
