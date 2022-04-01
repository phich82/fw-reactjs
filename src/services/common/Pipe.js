const P = {};
var hasError = false;
var currentValue;

const Pipe = value => {
  /*** Validate string or numeric ***/
  function _onlyAcceptStringOrNumber(input) {
    return typeof input === 'string' || typeof input === 'number';
  }

  /*** Validate date ***/
  function _checkDateValid(input) {
    return !isNaN(Date.parse(new Date(input)));
  }

  function _validateStandardDateTimeFormat(datetime) {
    let split = (datetime || currentValue).toString().split(' ');
    let dateStr = split[0].toString().replace(/\s+/gi, '');

    if (!_isYYYYMMDD(dateStr)) {
      return false;
    }

    let timeStr = (split[1] || '').replace(/\s+/gi, '');
    let hhmmss = null;

    if (!timeStr) {
      hhmmss = '00:00:00';
    } else if (_isHHMMSS(timeStr, 1)) {
      hhmmss = timeStr + ':00:00';
    } else if (_isHHMMSS(timeStr, 2)) {
      hhmmss = timeStr + ':00';
    } else if (_isHHMMSS(timeStr)) {
      hhmmss = timeStr;
    }

    return hhmmss ? dateStr + 'T' + hhmmss : false;
  }

  function _isYYYYMMDD(date) {
    return /^\d{1,4}-\d{1,2}-\d{1,2}$/gi.test(date);
  }

  function _isHHMMSS(time, type) {
    let result = false;
    switch (type) {
      case 1:
        result = /^\d{1,2}$/g.test(time);
        break;
      case 2:
        result = /^\d{1,2}:\d{1,2}$/g.test(time);
        break;
      default:
        //result = /^([0-1][0-9]?|2[0-3]?)(:[0-5]?[0-9]?)?(:[0-5]?[0-9]?)?$/gi.test(time);
        result = /^\d{1,2}:\d{1,2}:\d{1,2}$/g.test(time);
    }
    return result;
  }

  /*** Format date ***/
  function formatDate(date, format) {
    let o = new Date(date);

    // process timezone
    // o = new Date(date).addMinutes(o.getTimezoneOffset());
    let utc = o.getTime() + o.getTimezoneOffset() * 60 * 1000; // miliseconds
    o.setTime(utc);

    let y = o.getFullYear();
    let m = o.getMonth();
    let d = o.getDate();
    let h = o.getHours();
    let i = o.getMinutes();
    let s = o.getSeconds();

    let pad = function(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return format
      .replace('yyyy', y)
      .replace('YYYY', y)
      .replace('yy', (y + "").substring(2))
      .replace('YY', (y + "").substring(2))
      .replace('MMMM', months[m])
      .replace('MMM', months[m].substring(0, 3))
      .replace('MM', pad(m + 1, 2))
      .replace('dd', pad(d, 2))
      .replace('d', d)
      .replace(/M(?![ao])/, m + 1)
      .replace('DD', days[o.getDay()])
      .replace(/D(?!e)/, days[o.getDay()].substring(0, 3))
      .replace('HH', pad(h, 2))
      .replace('H', h)
      .replace('mm', pad(i, 2))
      .replace('m', i)
      .replace('ss', pad(s, 2))
      .replace('s', s);
  }

  /*** Format number: [string: {thousand_symbol}|{decimal_symbol}|{decimal_length} or array: [{thousand_symbol}, {decimal_symbol}, {decimal_length}] ***/
  function formatNumber(input, format, prefix, postfix) {
    if (!format) {
      return Number(input);
    }

    input = input.toString();
    if (input.indexOf(',') !== -1) {
      input = input.replace('.', '').replace(',', '.');
    }

    let basePartOrigin = input.split('.').shift().toString();
    let decimalPartOrigin = input.replace(/^([-,+])?[^.]+/, '').replace('.', '');

    let symbolsFormat  = (typeof format === 'string') ? format.split('|') : format;
    let thousandSymbol = symbolsFormat[0] || '';
    let decimalsSymbol = symbolsFormat[1] || '.';
    let decimalsLength = symbolsFormat[2] || 0;

    let decimals = decimalPartOrigin.length < decimalsLength
                    ? decimalPartOrigin + '0'.repeat(decimalsLength - decimalPartOrigin.length)
                    : decimalPartOrigin.substr(0, decimalsLength);

    let base = '';
    let basePartOriginLength = basePartOrigin.length;

    if (basePartOriginLength < 4) {
      base += basePartOrigin;
    } else {
      let numNotThreeDigitsGroup = basePartOriginLength % 3;
      if (numNotThreeDigitsGroup) {
        base += basePartOrigin.substr(0, numNotThreeDigitsGroup);
        basePartOrigin = basePartOrigin.substr(numNotThreeDigitsGroup);
      }
      while (basePartOrigin.length > 0) {
        base += (base && thousandSymbol) + basePartOrigin.substr(0, 3);
        basePartOrigin = basePartOrigin.substr(3);
      }
    }

    return (prefix || '') + base + (decimals && (decimalsSymbol + decimals)) + (postfix || '');
  }

  currentValue = value;

  /**
   * Get last value after convertion done
   *
   * @return string
   */
  P.done = function() {
    let output = currentValue;
    currentValue = null;
    hasError = false;
    return output;
  };

  /*** ===== START DEFINE TRANSFORMERS HERE ===== ***/
  /**
   * Convert string to lowercase string
   *
   * @return object
   */
  P.lowercase = function() {
    if (hasError) { return this; }
    currentValue = currentValue.toString().toLowerCase();
    return this;
  };

  /**
   * Convert string to uppercase string
   *
   * @return object
   */
  P.uppercase = function() {
    if (hasError) { return this; }
    currentValue = currentValue.toString().toUpperCase();
    return this;
  };

  /**
   * Format given date to specified date format
   *
   * @param  string  format  [Only included day, month, year]
   *
   * @return object
   */
  P.date = function(format) {
    try {
      // {yyyy}-{mm}-{dd}T{hh}:{mm}:{ss}
      let yyyymmddThhmmss = _validateStandardDateTimeFormat(currentValue);
      if (yyyymmddThhmmss === false) { hasError = true; }
      if (hasError || !_checkDateValid(yyyymmddThhmmss)) {
        hasError = true;
        return this;
      }
      currentValue = formatDate(yyyymmddThhmmss, format || 'MM-dd-YYYY');
    } catch (e) {
      hasError = true;
    }
    return this;
  };

  /**
   * Convert string to datetime string
   *
   * @param string  format  [day, month, year, hour, minute, second]
   *
   * @return object
   */
  P.datetime = function(format) {
    try {
      // {yyyy}-{mm}-{dd}T{hh}:{mm}:{ss}
      let yyyymmddThhmmss = _validateStandardDateTimeFormat(currentValue);
      if (yyyymmddThhmmss === false) { hasError = true; }
      if (hasError || !_checkDateValid(yyyymmddThhmmss)) {
        hasError = true;
        return this;
      }
      currentValue = formatDate(yyyymmddThhmmss, format || 'MM-dd-YYYY HH:mm:ss');
    } catch (e) {
      hasError = true;
    }
    return this;
  };

  /**
   * Convert string to specified number format
   *
   * @param string  format   [string: {thousand_symbol}|{decimal_symbol}|{decimal_length} or array: [{thousand_symbol}, {decimal_symbol}, {decimal_length}]]
   * @param string  postfix  [appended string]
   *
   * @return object
   */
  P.number_format = function(format, prefix, postfix) {
    if (hasError) { return this; }
    currentValue = formatNumber(currentValue, format, prefix, postfix);
    return this;
  };

  /*** ===== END - DEFINE TRANSFORMERS HERE ===== ***/

  if (!_onlyAcceptStringOrNumber(value)) {
    hasError = true;
  }

  return P;
};

/**
 * Add new pipe
 *
 * @param string name
 * @param func transformValue
 * @return void
 */
Pipe.extend = function (name, transformValue) {
  if (typeof name !== 'string') {
    throw new Error(`Pipe name must be a string. But it is: ${JSON.stringify(name)}`);
  }

  P[name] = function() {
    let args = [].slice.call(arguments);
    if (hasError) { return this; }
    currentValue = transformValue(currentValue, ...args);
    if (typeof currentValue === 'boolean') {
      hasError = currentValue;
    }
    return this;
  };
};

export default Pipe;
