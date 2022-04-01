import axios from 'axios';
import Response from './Response';
import Log from './Log';

export default class Http {

  instance;
  configs;

  /**
   * constructor
   *
   * @param object configs
   * {
   *    baseURL: <string: base url>, // or baseUrl
   *    timeout: <int: 60000>, // ms
   *    withCredentials: <boolean: false>,
   *    auth: <object>,
   *    maxRedirects: <int: 5>,
   *    responseType: <object>
   * }
   * @return void
   */
  constructor(configs) {
    this.configs = this._filterConfigs(this._resolveConfigs(configs));
    this.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'X-Requested-With': 'XMLHttpRequest',
      // 'X-Android-Package': 'com.pptv_fds_mobile_dev',
      // 'X-Android-Cert': '5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25',
      // 'X-Ios-Bundle-Identifier': 'com.pptv.eaty-consumer',
    };
    if (!this.instance) {
      // create new instance
      this.instance = axios.create();
    }
  }

  /**
   * Filtering keys of configs in allowed list
   *
   * @param json|object configs
   * @return json|object
   */
  _filterConfigs = (configs) => {
    let headersAllowed = this._headersAllowed();
    return Object.keys(configs).reduce((carry, key) => {
      key = (key === 'baseUrl') ? 'baseURL' : key;
      if (headersAllowed.indexOf(key) !== false) {
        carry[key] = configs[key];
      }
      return carry;
    }, {});
  }

  /**
   * Header keys were allowed
   *
   * @return array
   */
  _headersAllowed = () => ([
    'baseURL',
    'baseUrl',
    'timeout',
    'withCredentials',
    'auth',
    'maxRedirects',
    'responseType',
  ]);

  /**
   * Resovle configurations
   *
   * @param string|json|object configs
   * @return json|object
   */
  _resolveConfigs = (configs) => {
    if (typeof configs === 'object') {
      return configs;
    }
    return (typeof configs === 'string') ? { baseURL: configs } : {};
  }

  _resolveResponseData = (value) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (err) {};
    }
    return value;
  };

  _resolveInterceptorsRequest = (requestInterceptor) => {
    let interceptorsReq = [
      (config) => config,
      (error) => Promise.reject(error)
    ];
    if (typeof requestInterceptor === 'function') {
      interceptorsReq[0] = requestInterceptor;
      return interceptorsReq;
    }
    if (Array.isArray(requestInterceptor) && requestInterceptor.length > 0) {
      if (requestInterceptor.length === 1) {
        interceptorsReq[0] = requestInterceptor[0];
      } else {
        interceptorsReq = requestInterceptor;
      }
    }
    return interceptorsReq;
  };

  _resolveInterceptorsResponse = (responseInterceptor) => {
    let interceptorsRes = [
      (response) => {
        if (typeof response.data === 'string') {
          try {
            response.data = JSON.parse(response.data);
          } catch (err) {}
        }
        return response;
      },
      (error) => Promise.reject(error)
    ];
    if (typeof responseInterceptor === 'function') {
      interceptorsRes[0] = responseInterceptor;
      return interceptorsRes;
    }
    if (Array.isArray(responseInterceptor) && responseInterceptor.length > 0) {
      if (responseInterceptor.length === 1) {
        interceptorsRes[0] = responseInterceptor[0];
      } else {
        interceptorsRes = responseInterceptor;
      }
    }
    return interceptorsRes;
  };

  /**
   * Set configs
   *
   * @param string|json|array<object> key
   * @param mixed value
   * @return Http
   */
   setConfig = (key, value) => {
    if (typeof key === 'object') {
      this.configs = { ...this.configs, ...key };
    } else if (Array.isArray(key)) {
      this.configs = key.reduce((carry, item) => {
        carry = { ...carry, ...item };
        return carry;
      }, this.configs);
    } else if (typeof key === 'string') {
      this.configs[key] = value;
    }
    return this;
  }

  /**
   * Set headers
   *
   * @param json|object headers
   * @return Http
   */
   setHeaders = (headers = {}) => {
    if (typeof headers === 'object') {
      this.headers = { ...this.headers, ...headers };
    }
    return this;
  }

  interceptors = (request, response) => {
    this.instance.interceptors.request.use(...this._resolveInterceptorsRequest(request));
    this.instance.interceptors.response.use(...this._resolveInterceptorsResponse(response));
    return this;
  };

  /**
   * Http request
   *
   * @param string url
   * @param object|string paramsBody  [string: json string]
   * @param object|string paramsQuery [string: json string]
   * @return Promise
   */
  request = async (url, paramsBody = {}, paramsQuery = {}, options = {}, method = 'GET') => {
    try {
      options = options && (typeof options === 'object') ? options : {};
      paramsBody  = paramsBody && typeof paramsBody === 'object' ? JSON.stringify(paramsBody) : paramsBody;
      paramsQuery = paramsQuery && typeof paramsQuery === 'object' ? JSON.stringify(paramsQuery) : paramsQuery;
      let configs = this._buildConfigs({...options, url, method, body: paramsBody, params: paramsQuery});

      Log.track('[Http][Request] => ', configs);
      let responseResult = await this.instance.request(configs);
      Log.track('[Http][Response] => ', responseResult);

      return Response.success(this._resolveResponseData(responseResult.data), responseResult.status);
    } catch (e) {
      Log.track('[Http][Error] => ', e);
      return e.response
        ? Response.error(e.response.data, e.response.status)
        : Response.error(e.message, 442);
    }
  };

  get    = (url, query = {}, options = {}) => this.request(url, {}, query, options);
  put    = (url, body  = {}, query = {}, options = {}) => this.request(url, body, query, options, 'PUT');
  post   = (url, body  = {}, query = {}, options = {}) => this.request(url, body, query, options, 'POST');
  head   = (url, body  = {}, query = {}, options = {}) => this.request(url, body, query, options, 'HEAD');
  patch  = (url, body  = {}, query = {}, options = {}) => this.request(url, body, query, options, 'PATCH');
  delete = (url, body  = {}, query = {}, options = {}) => this.request(url, body, query, options, 'DELETE');

  _buildConfigs = (paramsConfig) => ({
    // url for the request
    url: '',
    // request method
    method: 'GET', // default
    // base url will be prepended to `url` unless `url` is absolute
    baseURL: '',
    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // The last function in the array must return a string, an ArrayBuffer, or a Stream
    transformRequest: [
      function (data, headers) {
        // Do whatever you want to transform the data
        return data;
      },
    ],
    // `transformResponse` allows changes to the response data to be made before it is passed to then/catch
    transformResponse: [
      function (data) {
        // Do whatever you want to transform the data
        return data;
      },
    ],
    // `headers` are custom headers to be sent
    headers: this.headers,
    // `params` are the URL parameters to be sent with the request
    params: JSON.stringify({}), //paramsQuery
    // `paramsSerializer` is an optional function in charge of serializing `params`
    // paramsSerializer: function(params) {
    //     return Qs.stringify(params, {arrayFormat: 'brackets'})
    // },
    // `data` is the data to be sent as the request body
    // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream
    data: JSON.stringify({}), // paramsBody
    // `timeout` specifies the number of milliseconds before the request times out.
    timeout: 30000,
    // `withCredentials` indicates whether or not cross-site Access-Control requests
    withCredentials: false, // default
    // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
    // This will set an `Authorization` header, overwriting any existing
    // `Authorization` custom headers you have set using `headers`.
    auth: {},
    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'XSRF-TOKEN', // default
    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default
    // `progress` allows handling of progress events for 'POST' and 'PUT uploads' as well as 'GET' downloads
    progress: function (progressEvent) {
      // Do whatever you want with the native progress event
    },
    // `maxContentLength` defines the max size of the http response content allowed
    // maxContentLength: 2000,
    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    // validateStatus: function (status) {
    //     return status >= 200 && status < 300; // default
    // },
    // `maxRedirects` defines the maximum number of redirects to follow in node.js.
    // If set to 0, no redirects will be followed.
    maxRedirects: 5, // default
    ...this.configs,
    ...paramsConfig
  });
}
