(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('dayjs')) :
  typeof define === 'function' && define.amd ? define(['dayjs'], factory) :
  (global.dayjs_locale_pl = factory(global.dayjs));
}(this, (function (dayjs) { 'use strict';

  dayjs = dayjs && dayjs.hasOwnProperty('default') ? dayjs['default'] : dayjs;

  var locale = {
    name: 'pl',
    weekdays: 'Niedziela_Poniedziałek_Wtorek_Środa_Czwartek_Piątek_Sobota'.split('_'),
    weekdaysShort: 'Ndz_Pon_Wt_Śr_Czw_Pt_Sob'.split('_'),
    weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
    months: 'Styczeń_Luty_Marzec_Kwiecień_Maj_Czerwiec_Lipiec_Sierpień_Wrzesień_Październik_Listopad_Grudzień'.split('_'),
    monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
    ordinal: function ordinal(n) {
      return n + ".";
    },
    weekStart: 1,
    relativeTime: {
      future: 'za %s',
      past: 'po %s',
      s: 'kilka sekund',
      m: 'minuta',
      mm: '%d minut',
      h: 'godzina',
      hh: '%d godzin',
      d: 'dzień',
      dd: '%d dni',
      M: 'miesiąc',
      MM: '%d miesięcy',
      y: 'rok',
      yy: '%d lat'
    },
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    }
  };
  dayjs.locale(locale, null, true);

  return locale;

})));
