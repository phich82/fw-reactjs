import { CONFIG, ENDPOINT } from '@config';
import { Http, HTTP_CODE, Log } from '@services';

/**
 * Types
 */
const SET_LOADING = 'APP/SET_LOADING';
const SET_THEME = 'APP/SET_THEME';
const CHANGE_LANGUAGE = 'APP/CHANGE_LANGUAGE';
const SHOW_MODAL_CONFIRM = 'APP/SHOW_MODAL_CONFIRM';
const HIDE_MODAL_CONFIRM = 'APP/HIDE_MODAL_CONFIRM';

export const actChangeLanguage = lang => ({
  type: CHANGE_LANGUAGE,
  payload: { lang },
});

export const actChangeTheme = theme => ({
  type: SET_THEME,
  payload: { theme },
});

export const setLoadingVisibility = isLoading => ({
  type: SET_LOADING,
  payload: { isLoading },
});

export const showModalConfirm = (isVisibility, title, description) => ({
  type: SHOW_MODAL_CONFIRM,
  payload: {
    isVisibility,
    title,
    description,
  },
});

export const hideModalConfirm = () => ({ type: HIDE_MODAL_CONFIRM });

const renderMessages = messages => {
  if (typeof messages === 'object') {
    for (const key in messages) {
      Log.info('[renderMessages][ErrorMessage] => ', messages[key][0]);
      return messages[key][0];
    }
  }
  return messages;
};

var requestCount = 0;
/** Use loading & error popup for another services */
export const withLoading = (dispatch, callback) => {
  dispatch(setLoadingVisibility(true));
  callback(
    // stopLoading
    () => {
      requestCount = 0;
      dispatch(setLoadingVisibility(false));
    },
    // showModalConfirm
    (isVisibility, title, description) =>
      dispatch(showModalConfirm(isVisibility, title, description)),
  );
};

export const initApplication = () => async (dispatch, getState) => {
  const decreaseRequestCount = () => {
    Log.info('[decreaseRequestCount][requestCount] => ', requestCount);
    requestCount--;
    Log.info('[decreaseRequestCount][requestCount--] => ', requestCount);
    if (requestCount <= 0) {
      requestCount = 0;
      Log.info('[decreaseRequestCount] => Hide the loading button');
      let isLoading = getState().modalReducer.isLoading;
      isLoading && dispatch(setLoadingVisibility(false));
    }
  };

  Http.instance.interceptors.request.use(
    config => {
      Log.info('[Http][Req] => ', config?.url, config);
      if (config.showSpinner) {
        Log.info('[Http][Req][requestCount: first] => ', requestCount);
        requestCount++;
        Log.info('[Http][Req][requestCount: increment] => ', requestCount);
        let isLoading = getState().modalReducer.isLoading;
        !isLoading && dispatch(setLoadingVisibility(true));
      }

      const { userInfo, lang } = getState().appReducers;

      if (userInfo) {
        config.headers.common['X-API-ACCESS-TOKEN'] = userInfo.userInfo.token;
        // config.headers.common.currency = userInfo.userInfo.language.toUpperCase();
        config.headers.common.currency = 'VND'; // TODO: dynamic currency
      }
      config.headers.common.locale = lang;

      return config;
    },
    err => {
      Log.info('[Http][Req][Error] => ', err?.config?.url, err);
      return Promise.reject(err);
    },
  );

  Http.instance.interceptors.response.use(
    res => {
      Log.info('[Http][Res] => ', res?.config?.url, res);

      const { code, message } = res.data;
      let isLoading = getState().modalReducer.isLoading;
      Log.info('[Http][Res][isLoading] => ', isLoading);

      // Only show error modal on demand for each APIs
      // let isCriticalCode = [
      //   HTTP_CODE.UNAUTHORIZED,
      //   // HTTP_CODE.INTERNAL_SERVER_ERROR,
      // ].includes(code);
      // if (res.config?.showErrorAuto === false && !isCriticalCode) {
      //   if (res.config?.stopLoadingAuto) {
      //     requestCount = 0;
      //     isLoading && dispatch(setLoadingVisibility(false));
      //   }
      //   return res;
      // }

      switch (code) {
        case HTTP_CODE.UNAUTHORIZED:
          requestCount = 0;
          isLoading && dispatch(setLoadingVisibility(false));
          // dispatch(signOut());
          // dispatch(cleanUpAfterSignOut());
          break;
        case HTTP_CODE.BAD_REQUEST:
          requestCount = 0;
          isLoading && dispatch(setLoadingVisibility(false));
          // const loginUrl = `${CONFIG.API_URL}${ENDPOINT.SIGN_IN}`;
          // if (res?.request?.responseURL != loginUrl) {
          //   dispatch(showModalConfirm(true, 'Error', renderMessages(message)));
          // }
          break;
        case HTTP_CODE.NOT_FOUND:
        case HTTP_CODE.INTERNAL_SERVER_ERROR:
          dispatch(showModalConfirm(true, 'Error', message));
          requestCount = 0;
          isLoading && dispatch(setLoadingVisibility(false));
          break;
        default:
          isLoading && res.config.showSpinner && decreaseRequestCount();
          break;
      }

      return res;
    },
    err => {
      Log.warn('[Http][Res][Error] => ', err?.config?.url, err);
      if (err.config.showSpinner) {
        requestCount = 0;
        let isLoading = getState().modalReducer.isLoading;
        isLoading && dispatch(setLoadingVisibility(false));
      }
      return Promise.reject(err);
    },
  );
};

/**
 * Reducers for entire app (will be cached)
 *
 * Important: Only store the important information of entire app (localization language & auth information)
 */

const initialState = {
  lang: 'en',
  theme: 'dark',
  user: null,
};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        lang: payload.lang,
      };
    }
    case SET_THEME: {
      return {
        ...state,
        theme: payload.theme,
      };
    }
    default:
      return state;
  }
};

/**
 * Reducers for modal (will not be cached)
 */
const initialModalState = {
  isLoading: false,
  modalConfirm: {
    isVisibility: false,
    title: '',
    description: '',
  },
};

export const modalReducer = (state = initialModalState, { type, payload }) => {
  switch (type) {
    case SET_LOADING: {
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    }
    case SHOW_MODAL_CONFIRM: {
      return {
        ...state,
        modalConfirm: {
          isVisibility: payload.isVisibility,
          title: payload.title,
          description: payload.description,
        },
      };
    }
    case HIDE_MODAL_CONFIRM: {
      return {
        ...state,
        modalConfirm: {
          isVisibility: false,
          title: '',
          description: '',
        },
      };
    }
    default:
      return state;
  }
};

export default reducers;
