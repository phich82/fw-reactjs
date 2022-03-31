import i18n, { keyExistLocales } from './i18n';

const t = (key, options = {}) => i18n.t(key, options);
const trans = t;
const translate = t;
const changeLocale = lang => i18n.changeLanguage(lang);

export {
  t,
  i18n,
  trans,
  translate,
  changeLocale,
  keyExistLocales,
};
