(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('dayjs')) :
  typeof define === 'function' && define.amd ? define(['dayjs'], factory) :
  (global.dayjs_locale_tzm = factory(global.dayjs));
}(this, (function (dayjs) { 'use strict';

  dayjs = dayjs && dayjs.hasOwnProperty('default') ? dayjs['default'] : dayjs;

  var locale = {
    name: 'tzm',
    weekdays: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    months: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
    weekStart: 6,
    weekdaysShort: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    monthsShort: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
    weekdaysMin: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    ordinal: function ordinal(n) {
      return n;
    },
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    relativeTime: {
      future: 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
      past: 'ⵢⴰⵏ %s',
      s: 'ⵉⵎⵉⴽ',
      m: 'ⵎⵉⵏⵓⴺ',
      mm: '%d ⵎⵉⵏⵓⴺ',
      h: 'ⵙⴰⵄⴰ',
      hh: '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
      d: 'ⴰⵙⵙ',
      dd: '%d oⵙⵙⴰⵏ',
      M: 'ⴰⵢoⵓⵔ',
      MM: '%d ⵉⵢⵢⵉⵔⵏ',
      y: 'ⴰⵙⴳⴰⵙ',
      yy: '%d ⵉⵙⴳⴰⵙⵏ'
    }
  };
  dayjs.locale(locale, null, true);

  return locale;

})));
