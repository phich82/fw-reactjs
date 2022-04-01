
const __ = {};

__.isStr = function(s) {
  return typeof s === 'string';
};

__.isString = __.isStr;

__.isFn = function(f) {
  return typeof f === 'function';
};

__.isFunction = __.isFn;

__.notEmptyObj = function(o) {
  return typeof o === 'object' && !Array.isArray(o) && Object.keys(o || {}).length > 0;
};

__.isObjectNotEmpty = function(o) {
  return !!o && typeof o === 'object' && Object.keys(o).length > 0;
};

__.isArrayNotEmpty = function(v) {
  return Array.isArray(v) && v.length > 0;
};

__.chunkArray = function(arr, n) {
  return [...Array(Math.ceil(arr.length / n))].map((_, i) => arr.slice(n * i, n + n * i));
};

__.isJsonString = function(jsonStr) {
  let isJson = false;
  try {
    JSON.parse(jsonStr);
    isJson = true;
  } catch (error) {
    isJson = false;
  }
  return isJson;
};

__.capitalize = function(s) {
  return this.isStr(s) ? s[0].toUpperCase() + s.slice(1) : s;
}

__.extend = function(obj) {
  [].slice.call(arguments, 1).forEach(function(source) {
    for (var attr in source) {
      obj[attr] = source[attr];
    }
  });
  return obj;
};

__.isArray = function(v) {
  return {}.toString.call(v) === '[object Array]';
};

__.isNumber = function(value) {
  return typeof value === 'number' && !isNaN(value);
};

__.isNumeric = function (num) {
  num += '';
  return !isNaN(num) && !isNaN(parseFloat(num));
};

__.isInteger = function(v) {
  return this.isNumber(v) && v % 1 === 0;
};

__.isBoolean = function(v) {
  return typeof v === 'boolean';
};

__.isBool = __.isBoolean;

__.isObject = function(obj) {
  return !Array.isArray(obj) && obj === Object(obj);
};

__.isDate = function(obj) {
  return obj instanceof Date;
};

__.isDefined = function(v) {
  return v !== null && v !== undefined;
};

__.isPromise = function(p) {
  return !!p && this.isFn(p.then);
};

__.isJqueryElement = function(o) {
  return o && this.isString(o.jquery);
};

__.isDomElement = function(o) {
  if (!o) {
    return false;
  }

  if (!o.querySelectorAll || !o.querySelector) {
    return false;
  }

  if (this.isObject(document) && o === document) {
    return true;
  }

  // http://stackoverflow.com/a/384380/699304
  /* istanbul ignore else */
  if (typeof HTMLElement === "object") {
    return o instanceof HTMLElement;
  }
  return o &&
    typeof o === "object" &&
    o !== null &&
    o.nodeType === 1 &&
    typeof o.nodeName === "string";
};

__.isEmpty = function(v) {
  // Null and undefined are empty
  if (!this.isDefined(v)) {
    return true;
  }

  // functions are non empty
  if (this.isFn(v)) {
    return false;
  }

  // Whitespace only strings are empty
  if (this.isString(v)) {
    return /^\s*$/.test(v);
  }

  // For arrays we use the length property
  if (this.isArray(v)) {
    return v.length === 0;
  }

  // Dates have no attributes but aren't empty
  if (this.isDate(v)) {
    return false;
  }

  // If we find at least one property we consider it non empty
  if (this.isObject(v)) {
    for (let attr in v) {
      return false;
    }
    return true;
  }

  return false;
};

// "Prettifies" the given string.
// Prettifying means replacing [.\_-] with spaces as well as splitting camel case words.
__.prettify = function(str) {
  if (this.isNumber(str)) {
    // If there are more than 2 decimals round it to two
    if ((str * 100) % 1 === 0) {
      return "" + str;
    }
    return parseFloat(Math.round(str * 100) / 100).toFixed(2);
  }
  var _this = this;
  if (this.isArray(str)) {
    return str.map(function(s) { return _this.prettify(s); }).join(", ");
  }

  if (this.isObject(str)) {
    if (!this.isDefined(str.toString)) {
      return JSON.stringify(str);
    }
    return str.toString();
  }

  // Ensure the string is actually a string
  str = "" + str;

  return str
    // Splits keys separated by periods
    .replace(/([^\s])\.([^\s])/g, '$1 $2')
    // Removes backslashes
    .replace(/\\+/g, '')
    // Replaces - and - with space
    .replace(/[_-]/g, ' ')
    // Splits camel cased words
    .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
      return "" + m1 + " " + m2.toLowerCase();
    })
    .toLowerCase();
};

__.stringifyValue = function(value, options) {
  var prettify = options && options.prettify || this.prettify;
  return prettify(value);
};

__.contains = function(obj, value) {
  if (!this.isDefined(obj)) {
    return false;
  }
  if (this.isArray(obj)) {
    return obj.indexOf(value) !== -1;
  }
  return value in obj;
};

__.unique = function(array) {
  if (!this.isArray(array)) {
    return array;
  }
  return array.filter(function(el, index, array) {
    return array.indexOf(el) == index;
  });
};

__.forEachKeyInKeypath = function(object, keypath, callback) {
  if (!this.isString(keypath)) {
    return undefined;
  }

  var key = ""
    , i
    , escape = false;

  for (i = 0; i < keypath.length; ++i) {
    switch (keypath[i]) {
      case '.':
        if (escape) {
          escape = false;
          key += '.';
        } else {
          object = callback(object, key, false);
          key = "";
        }
        break;

      case '\\':
        if (escape) {
          escape = false;
          key += '\\';
        } else {
          escape = true;
        }
        break;

      default:
        escape = false;
        key += keypath[i];
        break;
    }
  }

  return callback(object, key, true);
};

__.getDeepObjectValue = function(obj, keypath) {
  if (!this.isObject(obj)) {
    return undefined;
  }

  var _this = this;
  return this.forEachKeyInKeypath(obj, keypath, function(obj, key) {
    if (_this.isObject(obj)) {
      return obj[key];
    }
  });
};

__.getNestedKeyObjectValue = (obj, key) => {
  let o = { ...obj };
  let v;
  key.split('.').forEach((k, idx) => {
    if (idx === 0 && !o.hasOwnProperty(k)) {
      throw new Error(`Key [${k}] not exists in: ${JSON.stringify(o)}`);
    } else if (idx > 0 && !v.hasOwnProperty(k)) {
      throw new Error(`Key [${k}] not exists in: ${JSON.stringify(v)}`);
    }
    v = o[k];
  });
  return v;
};

// This returns an object with all the values of the form.
// It uses the input name as key and the value as value
// So for example this:
// <input type="text" name="email" value="foo@bar.com" />
// would return:
// {email: "foo@bar.com"}
__.collectFormValues = function(form, options) {
  var values = {}
    , i
    , j
    , input
    , inputs
    , option
    , value;

  if (this.isJqueryElement(form)) {
    form = form[0];
  }

  if (!form) {
    return values;
  }

  options = options || {};

  inputs = form.querySelectorAll("input[name], textarea[name]");
  for (i = 0; i < inputs.length; ++i) {
    input = inputs.item(i);

    if (this.isDefined(input.getAttribute("data-ignored"))) {
      continue;
    }

    var name = input.name.replace(/\./g, "\\\\.");
    value = this.sanitizeFormValue(input.value, options);
    if (input.type === "number") {
      value = value ? +value : null;
    } else if (input.type === "checkbox") {
      if (input.attributes.value) {
        if (!input.checked) {
          value = values[name] || null;
        }
      } else {
        value = input.checked;
      }
    } else if (input.type === "radio") {
      if (!input.checked) {
        value = values[name] || null;
      }
    }
    values[name] = value;
  }

  inputs = form.querySelectorAll("select[name]");
  for (i = 0; i < inputs.length; ++i) {
    input = inputs.item(i);
    if (this.isDefined(input.getAttribute("data-ignored"))) {
      continue;
    }

    if (input.multiple) {
      value = [];
      for (j in input.options) {
        option = input.options[j];
          if (option && option.selected) {
          value.push(this.sanitizeFormValue(option.value, options));
        }
      }
    } else {
      var _val = typeof input.options[input.selectedIndex] !== 'undefined' ? input.options[input.selectedIndex].value : /* istanbul ignore next */ '';
      value = this.sanitizeFormValue(_val, options);
    }
    values[input.name] = value;
  }

  return values;
};

__.sanitizeFormValue = function(value, options) {
  if (options.trim && this.isString(value)) {
    value = value.trim();
  }

  if (options.nullify !== false && value === "") {
    return null;
  }
  return value;
};

// Remove all errors who's error attribute is empty (null or undefined)
__.pruneEmptyErrors = function(errors) {
  var _this = this;
  return errors.filter(function(error) {
    return !_this.isEmpty(error.error);
  });
};

export default __;
