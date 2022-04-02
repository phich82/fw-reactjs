import { Pipe } from '../../services';

/**
 * Define new pipes here
 */

Pipe.extend('substr', function(value, start, length) {
  let args = [];
  if (start) {
    args.push(start);
  }
  if (length) {
    args.push(length);
  }
  return value.substr(...args);
});

Pipe.extend('repeat', function(value, count) {
  return value.repeat(count);
});
