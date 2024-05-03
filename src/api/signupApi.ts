import HTTPTransport from '../httpTransport/httpTransport.ts';
import baseURL from './apiBaseURL.ts';

const base = baseURL;
const signupAPIinstance = new HTTPTransport();

export class SignupAPI {
  static signup(data: Record<string, unknown>) {
    return signupAPIinstance.post(`${base}/auth/signup`, {data});
  }
}
