import moment from 'moment';
import validate from 'validate.js';
import { RuleSet } from '../../bootstrap/validations';

// Before using it (datetime), we must add the parse and format functions
// Here is a sample implementation using moment.js
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

// Build constraints of validation rules
const buildConstraints = (rules, messages = {}, customFields = {}) => {
  if (!rules || Array.isArray(rules) || typeof rules !== 'object') {
    throw new Error("Parameter 'rules' must be an object or a json.");
  }
  const Rules = { ...RuleSet };
  let constraints = {};
  messages = messages || {};
  customFields = customFields || {};

  Object.keys(rules).forEach(field => {
    let rulesVerified = rules[field];
    if (typeof rulesVerified === 'string') {
      rulesVerified = rulesVerified.split('|');
    }
    // Save contraints of the validated rules
    constraints[field] = rulesVerified.reduce((carry, rule) => {
      let partsRule = rule.split(':');
      // Only extract parameters of rule
      let paramsRule = partsRule.length > 1 ? rule.substr(partsRule[0].length + 1) : '';
      rule = partsRule[0];

      if (!Rules.hasOwnProperty(rule)) {
        throw new Error('Rule [' + rule + '] not exists.');
      }
      return {
        ...carry,
        ...Rules[rule](messages, field, paramsRule)
      };
    }, {});
  });

  return constraints;
};

const Validator = {};

Validator.instance = validate;

// Add props of object to given object
Validator.extend = (oldRule, newRule) => Validator.instance.extend(oldRule, newRule);

/**
 * Sync validation
 *
 * @param json attributes
 * @param json rules
 * @param json messages
 * @param json customFields
 * @return null|undefined|string [null|undeined: valid, string: invalid (error)]
 */
Validator.validate = (attributes, rules, messages = {}, customFields = {}) => {
  return validate(attributes, buildConstraints(rules, messages, customFields));
};

/**
 * Async validation
 *
 * @param json attributes
 * @param json rules
 * @param json messages
 * @param json customFields
 * @return Promise
 */
Validator.validateAsync = (attributes, rules, messages = {}, customFields = {}) => {
  return validate.async(attributes, buildConstraints(rules, messages, customFields));
};

// Create your own rule (validator)
Validator.createRule = function(name, fn) {
  Validator.instance.validators[name] = fn; // (value, options, key, attributes)
};

// Create an async rule (validator)
Validator.createRuleAsync = function(name, fn) {
  validate.validators[name] = function(value, options, key, attributes) {
    return new validate.Promise(function(resolve, reject) {
      fn({value, options, key, attributes}, resolve, reject);
    });
  };
};

// Get values of input tags by specific form
Validator.collectFormValues = (form) => {
  if (typeof form === 'string') {
    form = document.querySelector(form);
  }
  return Validator.instance.collectFormValues(form);
};

export default Validator;
