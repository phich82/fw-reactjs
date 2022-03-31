/*********************************************
 *********** Define New Rules Here ***********
 *********************************************/
import { httpGoogle, Validator, __ } from '@services';

/**
 * @Important
 *
 * After creating a new rule, you open 'services/common/Rule.js' file.
 * Then, add this rule to it.
 */

/*** Create new rule (custom) ***/
Validator.createRule('custom', function(value, options, key, attributes) {
  if (Array.isArray(value)) {
    return;
  }
  return options.message || this.message || 'must be an array.';
});

/*** Create new rule (custom_async) ***/
Validator.createRuleAsync('custom_async', (params, resolve, reject) => {
  const { value, options, key, attributes } = params;
  if (!__.isNumeric(value)) {
    return resolve(options.message || 'must be an integer.');
  }
  httpGoogle.get(`/todos/${value}`).then(result => {
    console.log('result => ', result);
    resolve(result.success ? null: result.message);
  })
});
