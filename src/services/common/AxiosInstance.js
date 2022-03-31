import axios from 'axios';
import { ENV } from '../../config';


const AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
    timezone: (new Date().getTimezoneOffset() / 60) * -1,
    'X-API-TOKEN': ENV.API_TOKEN,
  },
});

export default AxiosInstance;
