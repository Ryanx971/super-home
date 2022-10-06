import axios from 'axios';
import { GOVEE } from '../config/configuration';

const instance = axios.create({
  baseURL: GOVEE.baseUrl,
});

instance.defaults.headers.common[GOVEE.ApiKeyName] = GOVEE.ApiKeyValue;

export default instance;

