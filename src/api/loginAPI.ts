import baseURL from './apiBaseURL.ts';
import HTTPTransport from '../httpTransport/httpTransport.ts';

const base = baseURL;
const loginAPIinstance = new HTTPTransport();

export class LoginAPI {
  static login(data: Record<string, unknown> ){
    return loginAPIinstance.post(`${base}/auth/signin`, {data});
  }
}
