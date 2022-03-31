export function throttle(fn, limit, time) {
  var timeoutId;
  var calledCount = 0;
  return function (...args) {
    if (limit > calledCount) {
      calledCount++;
      fn(...args);
    }
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        calledCount = 0;
        timeoutId = null;
      }, time || 300);
    }
  };
};
