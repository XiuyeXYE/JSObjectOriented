(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs_plugin_weekOfYear = factory());
}(this, (function () { 'use strict';

  var MS = 'millisecond';
  var D = 'day';
  var W = 'week';
  var Y = 'year';

  var index = (function (o, c, d) {
    var proto = c.prototype;

    proto.week = function (week) {
      if (week === void 0) {
        week = null;
      }

      if (week !== null) {
        return this.add((week - this.week()) * 7, 'day');
      }

      var weekStart = this.$locale().weekStart || 0; // d(this) clone is for badMutable plugin

      var endOfYear = d(this).endOf(Y);

      if (weekStart === 0 && endOfYear.day() !== 6 && this.month() === 11 && 31 - this.date() <= endOfYear.day()) {
        return 1;
      }

      var startOfYear = d(this).startOf(Y);
      var compareDay = startOfYear.subtract(startOfYear.day() - weekStart, D).subtract(1, MS);
      var diffInWeek = this.diff(compareDay, W, true);
      return Math.ceil(diffInWeek);
    };

    proto.weeks = function (week) {
      if (week === void 0) {
        week = null;
      }

      return this.week(week);
    };
  });

  return index;

})));
