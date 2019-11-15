(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dayjs = factory());
}(this, (function () { 'use strict';

  var SECONDS_A_MINUTE = 60;
  var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
  var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
  var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
  var MILLISECONDS_A_SECOND = 1e3;
  var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND; // English locales

  var MS = 'millisecond';
  var S = 'second';
  var MIN = 'minute';
  var H = 'hour';
  var D = 'day';
  var W = 'week';
  var M = 'month';
  var Q = 'quarter';
  var Y = 'year';
  var DATE = 'date';
  var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
  var INVALID_DATE_STRING = 'Invalid Date'; // regex

  var REGEX_PARSE = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/;
  var REGEX_FORMAT = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

  var padStart = function padStart(string, length, pad) {
    var s = String(string);
    if (!s || s.length >= length) return string;
    return "" + Array(length + 1 - s.length).join(pad) + string;
  };

  var padZoneStr = function padZoneStr(instance) {
    var negMinuts = -instance.utcOffset();
    var minutes = Math.abs(negMinuts);
    var hourOffset = Math.floor(minutes / 60);
    var minuteOffset = minutes % 60;
    return "" + (negMinuts <= 0 ? '+' : '-') + padStart(hourOffset, 2, '0') + ":" + padStart(minuteOffset, 2, '0');
  };

  var monthDiff = function monthDiff(a, b) {
    // function from moment.js in order to keep the same result
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
    var anchor = a.clone().add(wholeMonthDiff, M);
    var c = b - anchor < 0;
    var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
    return Number(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
  };

  var absFloor = function absFloor(n) {
    return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
  };

  var prettyUnit = function prettyUnit(u) {
    var special = {
      M: M,
      y: Y,
      w: W,
      d: D,
      h: H,
      m: MIN,
      s: S,
      ms: MS,
      Q: Q
    };
    return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
  };

  var isUndefined = function isUndefined(s) {
    return s === undefined;
  };

  var U = {
    s: padStart,
    z: padZoneStr,
    m: monthDiff,
    a: absFloor,
    p: prettyUnit,
    u: isUndefined
  };

  // We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
  var en = {
    name: 'en',
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
  };

  var L = 'en'; // global locale

  var Ls = {}; // global loaded locale

  Ls[L] = en;

  var isDayjs = function isDayjs(d) {
    return d instanceof Dayjs;
  }; // eslint-disable-line no-use-before-define


  var parseLocale = function parseLocale(preset, object, isLocal) {
    var l;
    if (!preset) return L;

    if (typeof preset === 'string') {
      if (Ls[preset]) {
        l = preset;
      }

      if (object) {
        Ls[preset] = object;
        l = preset;
      }
    } else {
      var name = preset.name;
      Ls[name] = preset;
      l = name;
    }

    if (!isLocal) L = l;
    return l;
  };

  var dayjs = function dayjs(date, c, pl) {
    if (isDayjs(date)) {
      return date.clone();
    } // eslint-disable-next-line no-nested-ternary


    var cfg = c ? typeof c === 'string' ? {
      format: c,
      pl: pl
    } : c : {};
    cfg.date = date;
    return new Dayjs(cfg); // eslint-disable-line no-use-before-define
  };

  var wrapper = function wrapper(date, instance) {
    return dayjs(date, {
      locale: instance.$L,
      utc: instance.$u,
      $offset: instance.$offset // todo: refactor; do not use this.$offset in you code

    });
  };

  var Utils = U; // for plugin use

  Utils.l = parseLocale;
  Utils.i = isDayjs;
  Utils.w = wrapper;

  var parseDate = function parseDate(cfg) {
    var date = cfg.date,
        utc = cfg.utc;
    if (date === null) return new Date(NaN); // null is invalid

    if (Utils.u(date)) return new Date(); // today

    if (date instanceof Date) return new Date(date);

    if (typeof date === 'string' && !/Z$/i.test(date)) {
      var d = date.match(REGEX_PARSE);

      if (d) {
        if (utc) {
          return new Date(Date.UTC(d[1], d[2] - 1, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, d[7] || 0));
        }

        return new Date(d[1], d[2] - 1, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, d[7] || 0);
      }
    }

    return new Date(date); // everything else
  };

  var Dayjs =
  /*#__PURE__*/
  function () {
    function Dayjs(cfg) {
      this.$L = this.$L || parseLocale(cfg.locale, null, true);
      this.parse(cfg); // for plugin
    }

    var _proto = Dayjs.prototype;

    _proto.parse = function parse(cfg) {
      this.$d = parseDate(cfg);
      this.init();
    };

    _proto.init = function init() {
      var $d = this.$d;
      this.$y = $d.getFullYear();
      this.$M = $d.getMonth();
      this.$D = $d.getDate();
      this.$W = $d.getDay();
      this.$H = $d.getHours();
      this.$m = $d.getMinutes();
      this.$s = $d.getSeconds();
      this.$ms = $d.getMilliseconds();
    } // eslint-disable-next-line class-methods-use-this
    ;

    _proto.$utils = function $utils() {
      return Utils;
    };

    _proto.isValid = function isValid() {
      return !(this.$d.toString() === INVALID_DATE_STRING);
    };

    _proto.isSame = function isSame(that, units) {
      var other = dayjs(that);
      return this.startOf(units) <= other && other <= this.endOf(units);
    };

    _proto.isAfter = function isAfter(that, units) {
      return dayjs(that) < this.startOf(units);
    };

    _proto.isBefore = function isBefore(that, units) {
      return this.endOf(units) < dayjs(that);
    };

    _proto.$g = function $g(input, get, set) {
      if (Utils.u(input)) return this[get];
      return this.set(set, input);
    };

    _proto.year = function year(input) {
      return this.$g(input, '$y', Y);
    };

    _proto.month = function month(input) {
      return this.$g(input, '$M', M);
    };

    _proto.day = function day(input) {
      return this.$g(input, '$W', D);
    };

    _proto.date = function date(input) {
      return this.$g(input, '$D', DATE);
    };

    _proto.hour = function hour(input) {
      return this.$g(input, '$H', H);
    };

    _proto.minute = function minute(input) {
      return this.$g(input, '$m', MIN);
    };

    _proto.second = function second(input) {
      return this.$g(input, '$s', S);
    };

    _proto.millisecond = function millisecond(input) {
      return this.$g(input, '$ms', MS);
    };

    _proto.unix = function unix() {
      return Math.floor(this.valueOf() / 1000);
    };

    _proto.valueOf = function valueOf() {
      // timezone(hour) * 60 * 60 * 1000 => ms
      return this.$d.getTime();
    };

    _proto.startOf = function startOf(units, _startOf) {
      var _this = this;

      // startOf -> endOf
      var isStartOf = !Utils.u(_startOf) ? _startOf : true;
      var unit = Utils.p(units);

      var instanceFactory = function instanceFactory(d, m) {
        var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
        return isStartOf ? ins : ins.endOf(D);
      };

      var instanceFactorySet = function instanceFactorySet(method, slice) {
        var argumentStart = [0, 0, 0, 0];
        var argumentEnd = [23, 59, 59, 999];
        return Utils.w(_this.toDate()[method].apply( // eslint-disable-line prefer-spread
        _this.toDate(), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
      };

      var $W = this.$W,
          $M = this.$M,
          $D = this.$D;
      var utcPad = "set" + (this.$u ? 'UTC' : '');

      switch (unit) {
        case Y:
          return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

        case M:
          return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);

        case W:
          {
            var weekStart = this.$locale().weekStart || 0;
            var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
            return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
          }

        case D:
        case DATE:
          return instanceFactorySet(utcPad + "Hours", 0);

        case H:
          return instanceFactorySet(utcPad + "Minutes", 1);

        case MIN:
          return instanceFactorySet(utcPad + "Seconds", 2);

        case S:
          return instanceFactorySet(utcPad + "Milliseconds", 3);

        default:
          return this.clone();
      }
    };

    _proto.endOf = function endOf(arg) {
      return this.startOf(arg, false);
    };

    _proto.$set = function $set(units, _int) {
      var _C$D$C$DATE$C$M$C$Y$C;

      // private set
      var unit = Utils.p(units);
      var utcPad = "set" + (this.$u ? 'UTC' : '');
      var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
      var arg = unit === D ? this.$D + (_int - this.$W) : _int;

      if (unit === M || unit === Y) {
        // clone is for badMutable plugin
        var date = this.clone().set(DATE, 1);
        date.$d[name](arg);
        date.init();
        this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).toDate();
      } else if (name) this.$d[name](arg);

      this.init();
      return this;
    };

    _proto.set = function set(string, _int2) {
      return this.clone().$set(string, _int2);
    };

    _proto.get = function get(unit) {
      return this[Utils.p(unit)]();
    };

    _proto.add = function add(number, units) {
      var _this2 = this,
          _C$MIN$C$H$C$S$unit;

      number = Number(number); // eslint-disable-line no-param-reassign

      var unit = Utils.p(units);

      var instanceFactorySet = function instanceFactorySet(n) {
        var d = dayjs(_this2);
        return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
      };

      if (unit === M) {
        return this.set(M, this.$M + number);
      }

      if (unit === Y) {
        return this.set(Y, this.$y + number);
      }

      if (unit === D) {
        return instanceFactorySet(1);
      }

      if (unit === W) {
        return instanceFactorySet(7);
      }

      var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1; // ms

      var nextTimeStamp = this.$d.getTime() + number * step;
      return Utils.w(nextTimeStamp, this);
    };

    _proto.subtract = function subtract(number, string) {
      return this.add(number * -1, string);
    };

    _proto.format = function format(formatStr) {
      var _this3 = this;

      if (!this.isValid()) return INVALID_DATE_STRING;
      var str = formatStr || FORMAT_DEFAULT;
      var zoneStr = Utils.z(this);
      var locale = this.$locale();
      var $H = this.$H,
          $m = this.$m,
          $M = this.$M;
      var weekdays = locale.weekdays,
          months = locale.months,
          meridiem = locale.meridiem;

      var getShort = function getShort(arr, index, full, length) {
        return arr && (arr[index] || arr(_this3, str)) || full[index].substr(0, length);
      };

      var get$H = function get$H(num) {
        return Utils.s($H % 12 || 12, num, '0');
      };

      var meridiemFunc = meridiem || function (hour, minute, isLowercase) {
        var m = hour < 12 ? 'AM' : 'PM';
        return isLowercase ? m.toLowerCase() : m;
      };

      var matches = {
        YY: String(this.$y).slice(-2),
        YYYY: this.$y,
        M: $M + 1,
        MM: Utils.s($M + 1, 2, '0'),
        MMM: getShort(locale.monthsShort, $M, months, 3),
        MMMM: months[$M] || months(this, str),
        D: this.$D,
        DD: Utils.s(this.$D, 2, '0'),
        d: String(this.$W),
        dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
        ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
        dddd: weekdays[this.$W],
        H: String($H),
        HH: Utils.s($H, 2, '0'),
        h: get$H(1),
        hh: get$H(2),
        a: meridiemFunc($H, $m, true),
        A: meridiemFunc($H, $m, false),
        m: String($m),
        mm: Utils.s($m, 2, '0'),
        s: String(this.$s),
        ss: Utils.s(this.$s, 2, '0'),
        SSS: Utils.s(this.$ms, 3, '0'),
        Z: zoneStr // 'ZZ' logic below

      };
      return str.replace(REGEX_FORMAT, function (match, $1) {
        return $1 || matches[match] || zoneStr.replace(':', '');
      }); // 'ZZ'
    };

    _proto.utcOffset = function utcOffset() {
      // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
      // https://github.com/moment/moment/pull/1871
      return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
    };

    _proto.diff = function diff(input, units, _float) {
      var _C$Y$C$M$C$Q$C$W$C$D$;

      var unit = Utils.p(units);
      var that = dayjs(input);
      var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
      var diff = this - that;
      var result = Utils.m(this, that);
      result = (_C$Y$C$M$C$Q$C$W$C$D$ = {}, _C$Y$C$M$C$Q$C$W$C$D$[Y] = result / 12, _C$Y$C$M$C$Q$C$W$C$D$[M] = result, _C$Y$C$M$C$Q$C$W$C$D$[Q] = result / 3, _C$Y$C$M$C$Q$C$W$C$D$[W] = (diff - zoneDelta) / MILLISECONDS_A_WEEK, _C$Y$C$M$C$Q$C$W$C$D$[D] = (diff - zoneDelta) / MILLISECONDS_A_DAY, _C$Y$C$M$C$Q$C$W$C$D$[H] = diff / MILLISECONDS_A_HOUR, _C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff / MILLISECONDS_A_MINUTE, _C$Y$C$M$C$Q$C$W$C$D$[S] = diff / MILLISECONDS_A_SECOND, _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff; // milliseconds

      return _float ? result : Utils.a(result);
    };

    _proto.daysInMonth = function daysInMonth() {
      return this.endOf(M).$D;
    };

    _proto.$locale = function $locale() {
      // get locale object
      return Ls[this.$L];
    };

    _proto.locale = function locale(preset, object) {
      if (!preset) return this.$L;
      var that = this.clone();
      that.$L = parseLocale(preset, object, true);
      return that;
    };

    _proto.clone = function clone() {
      return Utils.w(this.$d, this);
    };

    _proto.toDate = function toDate() {
      return new Date(this.valueOf());
    };

    _proto.toJSON = function toJSON() {
      return this.isValid() ? this.toISOString() : null;
    };

    _proto.toISOString = function toISOString() {
      // ie 8 return
      // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
      // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      return this.$d.toISOString();
    };

    _proto.toString = function toString() {
      return this.$d.toUTCString();
    };

    return Dayjs;
  }();

  dayjs.prototype = Dayjs.prototype;

  dayjs.extend = function (plugin, option) {
    plugin(option, Dayjs, dayjs);
    return dayjs;
  };

  dayjs.locale = parseLocale;
  dayjs.isDayjs = isDayjs;

  dayjs.unix = function (timestamp) {
    return dayjs(timestamp * 1e3);
  };

  dayjs.en = Ls[L];
  dayjs.Ls = Ls;

  return dayjs;

})));
