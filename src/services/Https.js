import Http from './common/Http';
import { ENV } from '@config';

// Http for our server
export const httpApi = new Http().create({
  baseURL: 'https://reqres.in',
  headers: {
    'Content-Type': 'application/json',
    timezone: (new Date().getTimezoneOffset() / 60) * -1,
    'X-API-TOKEN': ENV.API_TOKEN || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  }
});

// Http for another service (google, apple)
export const httpGoogle = new Http().create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
    timezone: (new Date().getTimezoneOffset() / 60) * -1,
    'X-API-TOKEN': ENV.API_TOKEN_WEB || 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
  }
});
