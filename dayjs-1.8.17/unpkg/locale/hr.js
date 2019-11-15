(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('dayjs')) :
  typeof define === 'function' && define.amd ? define(['dayjs'], factory) :
  (global.dayjs_locale_hr = factory(global.dayjs));
}(this, (function (dayjs) { 'use strict';

  dayjs = dayjs && dayjs.hasOwnProperty('default') ? dayjs['default'] : dayjs;

  var locale = {
    name: 'hr',
    weekdays: 'Nedjelja_Ponedjeljak_Utorak_Srijeda_Četvrtak_Petak_Subota'.split('_'),
    weekdaysShort: 'Ned._Pon._Uto._Sri._Čet._Pet._Sub.'.split('_'),
    weekdaysMin: 'Ne_Po_Ut_Sr_Če_Pe_Su'.split('_'),
    months: 'Siječanj_Veljača_Ožujak_Travanj_Svibanj_Lipanj_Srpanj_Kolovoz_Rujan_Listopad_Studeni_Prosinac'.split('_'),
    monthsShort: 'Sij._Velj._Ožu._Tra._Svi._Lip._Srp._Kol._Ruj._Lis._Stu._Pro.'.split('_'),
    weekStart: 1,
    formats: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    relativeTime: {
      future: 'za %s',
      past: 'prije %s',
      s: 'sekunda',
      m: 'minuta',
      mm: '%d minuta',
      h: 'sat',
      hh: '%d sati',
      d: 'dan',
      dd: '%d dana',
      M: 'mjesec',
      MM: '%d mjeseci',
      y: 'godina',
      yy: '%d godine'
    },
    ordinal: function ordinal(n) {
      return n + ".";
    }
  };
  dayjs.locale(locale, null, true);

  return locale;

})));
