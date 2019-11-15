(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('dayjs')) :
  typeof define === 'function' && define.amd ? define(['dayjs'], factory) :
  (global.dayjs_locale_ur = factory(global.dayjs));
}(this, (function (dayjs) { 'use strict';

  dayjs = dayjs && dayjs.hasOwnProperty('default') ? dayjs['default'] : dayjs;

  var locale = {
    name: 'ur',
    weekdays: 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ'.split('_'),
    months: 'جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر'.split('_'),
    weekStart: 1,
    weekdaysShort: 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ'.split('_'),
    monthsShort: 'جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر'.split('_'),
    weekdaysMin: 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ'.split('_'),
    ordinal: function ordinal(n) {
      return n;
    },
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd، D MMMM YYYY HH:mm'
    },
    relativeTime: {
      future: '%s بعد',
      past: '%s قبل',
      s: 'چند سیکنڈ',
      m: 'ایک منٹ',
      mm: '%d منٹ',
      h: 'ایک گھنٹہ',
      hh: '%d گھنٹے',
      d: 'ایک دن',
      dd: '%d دن',
      M: 'ایک ماہ',
      MM: '%d ماہ',
      y: 'ایک سال',
      yy: '%d سال'
    }
  };
  dayjs.locale(locale, null, true);

  return locale;

})));
