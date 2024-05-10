import HTTPTransport from '../core/httpTransport.ts';
import baseURL from './apiBaseURL.ts';

const base = baseURL;
const signupAPIinstance = new HTTPTransport();

export class SignupAPI {
  static signup(data: Record<string, unknown>) {
    return signupAPIinstance.post(`${base}/auth/signup`, {data});
  }

  static login(data: Record<string, unknown> ){
    return signupAPIinstance.post(`${base}/auth/signin`, {data});
  }

  static getUser(){
    return signupAPIinstance.get(`${base}/auth/user`);
  }

  static logout(){
    return signupAPIinstance.post(`${base}/auth/logout`);
  }
}
