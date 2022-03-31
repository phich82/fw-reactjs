import { keyExistLocales, trans } from '../../locales';

const PREFIX_VALIDATION_LOCALE = 'validation_field_';

const isJsonString = function(jsonStr) {
  let isJson = false;
  try {
    JSON.parse(jsonStr);
    isJson = true;
  } catch (error) {
    isJson = false;
  }
  return isJson;
};

const accessJson = (json, keys) => {
  let o = { ...json };
  let v;
  keys.split('.').forEach((k, idx) => {
    if (idx === 0 && !o.hasOwnProperty(k)) {
      throw new Error(`Key [${k}] not exists in: ${JSON.stringify(o)}`);
    } else if (idx > 0 && !v.hasOwnProperty(k)) {
      throw new Error(`Key [${k}] not exists in: ${JSON.stringify(v)}`);
    }
    v = o[k];
  });
  return v;
};

const checkKeyExists = (json, keys) => {
  let isExist = true;
  try {
    accessJson(json, keys);
  } catch (err) {
    isExist = false;
  }
  return isExist;
};

const transToLocale = field => {
  let keyCheck = `${PREFIX_VALIDATION_LOCALE}${field}`;
  if (keyExistLocales(keyCheck)) {
    field = trans(keyCheck);
  }
  return field;
};

const resolveValidationMessage = (messages, field, rule, targetKey, appendFields = {}) => {
  console.log({messages, field, rule, targetKey, appendFields})
  // if (checkKeyExists(messages, `${field}.${rule}`)) {
  //   return '^' + messages[field][rule];
  // }
  if (messages && messages[field] && messages[field].hasOwnProperty(rule)) {
    console.log('resolveValidationMessage => ', '^' + messages[field][rule])
    return '^' + messages[field][rule];
  }console.log('transToLocale(field) => ', transToLocale(field))
  return '^' + trans(targetKey, { input: transToLocale(field), ...appendFields });
};

// 'onlyInteger=true&greaterThan=0&lessThanOrEqualTo=2
const resolveRuleOptions = (options, typesKey = {}) => {
  options = options.split('&');
  return options.reduce(function(carry, option) {
    option = option.split('=');
    if (option.length > 1) {
      let key = option[0].trim();
      let value = option[1].trim();
      if (typesKey[key]) {
        if (typesKey[key] === 'array') {
          value = value.split(',');
        } else if (typesKey[key] === 'number') {
           value = Number(value);
        } else if (typesKey[key] === 'boolean' || typesKey[key] === 'bool') {
          value = (value == 1 || value == 'true') ? true : false;
        }
      }
      carry[key] = value;
    }
    return carry;
  }, {});
};

/**
 * Wrap rules
 */
const Rules = {
  required: (messages = {}, field = '') => ({
    presence: {
      message: resolveValidationMessage(messages, field, 'required', 'validation_error_empty_input'),
      allowEmpty: false,
    },
  }),
  number: (messages = {}, field = '', options = '') => ({
    numericality: {
      strict: true,
      noStrings: true,
      message: resolveValidationMessage(messages, field, 'numeric', 'validation_error_not_numeric'),
    }
  }),
  numeric: (messages = {}, field = '', options = '') => ({
    numericality: {
      message: resolveValidationMessage(messages, field, 'numeric', 'validation_error_not_numeric'),
    }
  }),
  force_numeric: (messages = {}, field = '', options = '') => ({
    numericality: {
      strict: true,
      message: resolveValidationMessage(messages, field, 'numeric', 'validation_error_not_numeric'),
    }
  }),
  greaterThan: (messages = {}, field = '', options = '') => ({
    numericality: {
      strict: true,
      greaterThan: Number(options),
      message: resolveValidationMessage(messages, field, 'greaterThan', 'validation_error_not_greater_than', {input2: Number(options)}),
    }
  }),
  greaterThanOrEqualTo: (messages = {}, field = '', options = '') => ({
    numericality: {
      strict: true,
      greaterThanOrEqualTo: Number(options),
      message: resolveValidationMessage(messages, field, 'greaterThan', 'validation_error_not_greater_than_or_equal_to', {input2: Number(options)}),
    }
  }),
  equalTo: (messages = {}, field = '', options = '') => ({
    numericality: {
      strict: true,
      equalTo: Number(options),
      message: resolveValidationMessage(messages, field, 'greaterThan', 'validation_error_not_equal_to', {input2: Number(options)}),
    }
  }),
  lessThanOrEqualTo: (messages = {}, field = '', options = '') => ({
    numericality: {
      strict: true,
      lessThanOrEqualTo: Number(options),
      message: resolveValidationMessage(messages, field, 'greaterThan', 'validation_error_not_less_than_or_equal_to', {input2: Number(options)}),
    }
  }),
  lessThan: (messages = {}, field = '', options = '') => ({
    numericality: {
      strict: true,
      lessThan: Number(options),
      message: resolveValidationMessage(messages, field, 'greaterThan', 'validation_error_not_less_than', {input2: Number(options)}),
    }
  }),
  divisibleBy: (messages = {}, field = '', options = '') => ({
    numericality: {
      divisibleBy: Number(options),
      message: resolveValidationMessage(messages, field, 'greaterThan', 'validation_error_not_divisible_by', {input2: Number(options)}),
    }
  }),
  even: (messages = {}, field = '', options = '') => ({
    numericality: {
      even: true,
      message: resolveValidationMessage(messages, field, 'greaterThan', 'validation_error_not_even'),
    }
  }),
  odd: (messages = {}, field = '', options = '') => ({
    numericality: {
      odd: true,
      message: resolveValidationMessage(messages, field, 'greaterThan', 'validation_error_not_odd'),
    }
  }),
  email: (messages = {}, field = '') => ({
    email: {
      message: resolveValidationMessage(messages, field, 'email', 'validation_error_invalid_format'),
    },
  }),
  format: (messages = {}, field = '', format = '') => ({
    format: {
      pattern: new RegExp(format, 'i'),
      flags: 'i',
      message: resolveValidationMessage(messages, field, 'format', 'validation_error_invalid_format'),
    },
  }),
  min: (messages = {}, field = '', minLength = '') => ({
    length: {
      minimum: parseInt(minLength, 10),
      message: resolveValidationMessage(messages, field, 'min', 'validation_error_minimum_length', {chars: minLength}),
    },
  }),
  equal: (messages = {}, field = '', anotherField = '') => ({
    equality: {
      attribute: anotherField,
      comparator: (v1, v2) => {
        return JSON.stringify(v1) == JSON.stringify(v2);
      },
      message: resolveValidationMessage(messages, field, 'equal', 'validation_error_no_matching', {input2: transToLocale(anotherField)}),
    },
  }),
  force_equal: (messages = {}, field = '', anotherField = '') => ({
    equality: {
      attribute: anotherField,
      comparator: (v1, v2) => {
        return JSON.stringify(v1) === JSON.stringify(v2);
      },
      message: resolveValidationMessage(messages, field, 'equal', 'validation_error_no_matching', {input2: transToLocale(anotherField)}),
    },
  }),
  array: (messages = {}, field = '') => ({
    type: {
      type: 'array',
      message: resolveValidationMessage(messages, field, 'array', 'validation_error_not_array'),
    },
  }),
  integer: (messages = {}, field = '') => ({
    type: {
      type: 'integer',
      message: resolveValidationMessage(messages, field, 'integer', 'validation_error_not_integer'),
    },
  }),
  number: (messages = {}, field = '') => ({
    type: {
      type: 'number',
      message: resolveValidationMessage(messages, field, 'number', 'validation_error_not_number'),
    },
  }),
  string: (messages = {}, field = '') => ({
    type: {
      type: 'string',
      message: resolveValidationMessage(messages, field, 'string', 'validation_error_not_string'),
    },
  }),
  date: (messages = {}, field = '') => ({
    type: {
      type: 'date',
      message: resolveValidationMessage(messages, field, 'date', 'validation_error_not_date'),
    },
  }),
  boolean: (messages = {}, field = '') => ({
    type: {
      type: 'boolean',
      message: resolveValidationMessage(messages, field, 'boolean', 'validation_error_not_boolean'),
    },
  }),
  //'url:schemes=http,https&allowLocal=true&allowDataUrl=true'
  url: (messages = {}, field = '', options = '') => {
    options = resolveRuleOptions(options, {schemes: 'array', allowLocal: 'boolean', allowDataUrl: 'boolean'});
    return {
      url: {
        schemes: options.schemes || ['http', 'https'],
        allowLocal: typeof options.allowLocal === 'boolean' ? options.allowLocal : false,
        allowDataUrl: typeof options.allowDataUrl === 'boolean' ? options.allowDataUrl : false,
        message: resolveValidationMessage(messages, field, 'url', 'validation_error_not_url'),
      }
    };
  },
  // Checks that the given value exists in the list given
  in: (messages = {}, field = '', options = '') => ({
    inclusion: {
      within: isJsonString(options) ? JSON.parse(options) : options.split(','),
      message: resolveValidationMessage(messages, field, 'in', 'validation_error_not_in_list', {input2: options}),
    }
  }),
  // Checks that the given value not exists in the list given
  not_in: (messages = {}, field = '', options = '') => ({
    exclusion: {
      within: isJsonString(options) ? JSON.parse(options) : options.split(','),
      message: resolveValidationMessage(messages, field, 'in', 'validation_error_not_in_list', {input2: options}),
    }
  }),
  only_date: (messages = {}, field = '', options = '') => ({
    datetime: {
      dateOnly: true,
      message: resolveValidationMessage(messages, field, 'only_date', 'validation_error_only_date'),
    }
  }),
  date_before: (messages = {}, field = '', options = '') => ({
    datetime: {
      dateOnly: true,
      latest: options,
      message: resolveValidationMessage(messages, field, 'date_before', 'validation_error_not_date_before', {input2: options}),
    }
  }),
  date_after: (messages = {}, field = '', options = '') => ({
    datetime: {
      dateOnly: true,
      earliest: options,
      message: resolveValidationMessage(messages, field, 'date_after', 'validation_error_not_date_after', {input2: options}),
    }
  }),
  is_datetime: (messages = {}, field = '', options = '') => ({
    datetime: {
      dateOnly: false,
      message: resolveValidationMessage(messages, field, 'is_datetime', 'validation_error_not_is_datetime'),
    }
  }),
  datetime_before: (messages = {}, field = '', options = '') => ({
    datetime: {
      latest: options,
      message: resolveValidationMessage(messages, field, 'datetime_before', 'validation_error_not_datetime_before', {input2: options}),
    }
  }),
  datetime_after: (messages = {}, field = '', options = '') => ({
    datetime: {
      earliest: options,
      message: resolveValidationMessage(messages, field, 'datetime_after', 'validation_error_not_datetime_after', {input2: options}),
    }
  }),
  custom: (messages = {}, field = '', options = '') => ({
    custom: {
      message: resolveValidationMessage(messages, field, 'custom', 'validation_error_not_custom'),
    }
  }),
  custom_async: (messages = {}, field = '', options = '') => ({
    custom_async: {
      message: resolveValidationMessage(messages, field, 'custom_async', 'validation_error_not_custom_async'),
    }
  }),
};

export default Rules;
