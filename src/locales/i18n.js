import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { ENV } from '../config';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {translation: require('./lang/en.json')},
  jp: {translation: require('./lang/jp.json')},
  vn: {translation: require('./lang/vn.json')},
};

/**
 * Creating own plugins
 *
 * https://www.i18next.com/misc/creating-own-plugins
 */
/**
 * Used to load data for i18next.
 */
const Backend = {
  type: 'backend',
  /************** MAIN **************/
  init: function(services, backendOptions, i18nextOptions) {
    console.log('[Backend][Init] => ', {services, backendOptions, i18nextOptions})
  },
  /************** END - MAIN **************/
  read: function read(language, namespace, callback) {
    console.log('[Backend][Read] => ', {language, namespace, callback})
  },
  /** Save the missing translation */
  create: function create(languages, namespace, key, fallbackValue) {
    console.log('[Backend][Create] => ', {languages, namespace, key, fallbackValue})
  },
  /** Load multiple languages and namespaces. For backends supporting multiple resources loading */
  readMulti: function readMulti(languages,  namespaces, callback) {
    console.log('[Backend][ReadMulti] => ', {languages,  namespaces, callback})
  },
  /** Store the translation. For backends acting as cache layer */
  save: function save(language, namespace, data) {
    console.log('[Backend][Save] => ', {language, namespace, data})
  },
  loadUrl: function loadUrl(url, callback, languages, namespaces) {
    console.log('[Backend][LoadUrl] => ', {url, callback, languages, namespaces})
  }
};

/**
 * Used to detect language in user land.
 */
const LanguageDetector = {
  type: 'languageDetector',
  // If this is set to true, your detect function receives a callback function that you should
  // call with your language, useful to retrieve your language stored in AsyncStorage for example
  async: false,
  init: function(services, detectorOptions, i18nextOptions) {
    /* use services and options */
    console.log('[LanguageDetector] xxx => ', services, detectorOptions, i18nextOptions);
    this.services = services;
    this.detectorOptions = detectorOptions || {};
    this.i18nextOptions = i18nextOptions || {};
  },
  detect: function(callback) { // You'll receive a callback if you passed async true
    /* return detected language */
    // callback('de'); if you used the async flag
    let langsMap = { vi: 'vn' };
    let lang = 'en';
    if (typeof navigator !== 'undefined' && navigator.language) {
      let lang = navigator.language.split('-')[0];
      if (langsMap[lang]) {
        lang = langsMap[lang];
      }
    }
    return this.async ? callback(lang) : lang;
  },
  cacheUserLanguage: function(lang) {
    /* cache language */
    let detectorOptions = {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      // cache user language
      caches: ['localStorage'],
    };
    if (typeof this.detectorOptions === 'object') {
      detectorOptions = Object.assign(detectorOptions, this.detectorOptions);
    }
    if (!Array.isArray(detectorOptions.caches) || detectorOptions.caches.length < 1) {
      return;
    }
    // cache on localStorage
    if (detectorOptions.caches.indexOf('localStorage') !== -1 &&
        detectorOptions.lookupLocalStorage &&
        window !== 'undefined' && window.localStorage && window.localStorage.setItem
    ) {
      window.localStorage.setItem(detectorOptions.lookupLocalStorage, lang);
    }
    // Cache on sessionStorage
    if (detectorOptions.caches.indexOf('sessionStorage') !== -1 &&
        detectorOptions.lookupSessionStorage &&
        window !== 'undefined' && window.sessionStorage && window.sessionStorage.setItem
    ) {
      window.sessionStorage.setItem(detectorOptions.lookupSessionStorage, lang);
    }
  }
};

/**
 * Used to extend or manipulate the translated values before returning them in `t` function.
 */
const PostProcessor = {
  /** Unique name */
  name: 'PostProcessorModule',
  type: 'postProcessor',
  process: function process(value, key, options, translator) {

  }
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // passes i18n down to react-i18next
  .use(initReactI18next)
  // init i18next (https://www.i18next.com/overview/configuration-options)
  .init({
    resources,
    lng: '',
    // lng: ENV.DEFAULT_LOCALE || 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: ENV.DEFAULT_LOCALE || 'en',
    interpolation: {
      format: (value, format, lng) => {
        // { "key2": "{{text, uppercase}} just uppercased" }
        if (format === 'uppercase') {
          return value.toUpperCase();
        }
        // { "key": "The current date is {{date, MM/DD/YYYY}}" }
        if(value instanceof Date) {
          //return moment(value).format(format);
        }
        return value;
      },
      escapeValue: false // react already safes from xss
    },
    // LanguageDetector options (plugins)
    detection: {
      // order and from where user language should be detected
      order: ["path", "localStorage", "htmlTag", "cookie", "navigator"],
      // keys or params to lookup language from
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      // cache user language on
      caches: ["localStorage", "cookie"],
      excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
      // optional expire and domain for set cookie
      cookieMinutes: 10,
      cookieDomain: 'myDomain',
      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement,
      // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
      cookieOptions: { path: '/', sameSite: 'strict' }
    },
    // Backend options (plugins)
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    // Options for cache layer (plugins)
    // cache: {

    // }
  });

i18n.on('languageChanged', function(lang) {
  console.log('[Changed to language => ', lang);
});

// i18n.addResourceBundle('en', 'namespace1', {
//   key: 'hello from namespace 1'
// });

export const keyExistLocales = key => {
  if (i18n.exists) {
    return i18n.exists(key);
  }
  let isExist = false;
  try {
    let o = resources[i18n.language || 'en']['translation'];
    console.log('o => ', o)
    let v;
    key.split('.').forEach((k, idx) => {
      if (idx === 0 && !o.hasOwnProperty(k)) {
        throw new Error(`Key [${k}] not exists in: ${JSON.stringify(o)}`);
      } else if (idx > 0 && !v.hasOwnProperty(k)) {
        throw new Error(`Key [${k}] not exists in: ${JSON.stringify(v)}`);
      }
      v = o[k];
    });
    isExist = true;
  } catch (err) {
    console.log('[KeyExistLocales][Error] => ', err);
    isExist = false;
  }
  return isExist;
};

export default i18n;
