import HttpClass from './common/Http';
import { ENV } from '@config';

// Http for our server
export const Http = new HttpClass({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
    timezone: (new Date().getTimezoneOffset() / 60) * -1,
    'X-API-TOKEN': ENV.API_TOKEN || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  }
});

export const ResreqHttp = new HttpClass({
  baseURL: ENV.API_URL_REQRES,
  headers: {
    'Content-Type': 'application/json',
    timezone: (new Date().getTimezoneOffset() / 60) * -1,
    'X-API-TOKEN': ENV.API_TOKEN_REQRES || 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
  }
});

// Http for another service (google, apple)
export const GoogleHttp = new HttpClass({
  baseURL: ENV.API_URL_GOOGLE,
  headers: {
    'Content-Type': 'application/json',
    timezone: (new Date().getTimezoneOffset() / 60) * -1,
    'X-API-TOKEN': ENV.API_TOKEN_GOOGLE || 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
  }
});
