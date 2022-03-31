import { ENV } from "../../config";

const _isFn = fn => typeof fn === 'function';
const _getDateTimeStr = (separatorDate = '-', separatorTime = ':') => {
  let o = new Date();
  let hour = o.getHours() - (o.getHours() >= 12 ? 12 : 0);
  const _padZero = n => (n >= 0 && n < 10 ? '0' + n : n + '');
  return [
    [_padZero(o.getDate()), _padZero(o.getMonth() + 1), o.getFullYear()].join(
      separatorDate,
    ),
    [
      _padZero(hour),
      _padZero(o.getMinutes()),
      _padZero(o.getSeconds()),
      _padZero(o.getMilliseconds()),
    ].join(separatorTime),
    o.getHours() >= 12 ? 'PM' : 'AM',
  ].join(' ');
};

const _log = (type = 'log', ...args) => {
  ENV.__DEV__ && _isFn(console[type]) && console[type](...args);
};

const Log = {};

Log.group = (...args) => _log('group', ...args);
Log.groupEnd = (...args) => _log('groupEnd', ...args);
Log.info = (...args) => _log('log', ...args);
Log.warn = (...args) => _log('warn', ...args);
Log.error = (...args) => _log('error', ...args);
Log.track = (...args) => _log('info', '[' + _getDateTimeStr() + ']', ...args);

export default Log;
