import HTTPTransport from '../core/httpTransport.ts';
import baseURL from './apiBaseURL.ts';

const base = baseURL;
const userAPIinstance = new HTTPTransport();

export class UserAPI {
  static passwordChange(data: Record<string, unknown>){
    return userAPIinstance.put(`${base}/user/password`, {data});
  }

  static profileDataChange(data: Record<string, unknown>){
    return userAPIinstance.put(`${base}/user/profile`, {data});
  }

  static profileChangeAvatar(data: FormData){
    return userAPIinstance.put(`${base}/user/profile/avatar`, {data});
  }

  static addUser(data: Record<string, unknown>){
    return userAPIinstance.post(`${base}/user/search`, {data})
  }
}
