import HTTPTransport from '../core/httpTransport.ts';
import baseURL from './apiBaseURL.ts';

const base = baseURL;
const chatAPIinstance = new HTTPTransport();

export class ChatAPI {
  static newChat(data: Record<string, unknown>){
    return chatAPIinstance.post(`${base}/chats`, {data});
  }

  static allChatsData(){
    return chatAPIinstance.get(`${base}/chats`);
  }

  static findUserByLogin(data: Record<string, unknown>){
    return chatAPIinstance.post(`${base}/user/search`, {data});
  }

  static addUserToChat(data: Record<string, unknown>){
    return chatAPIinstance.put(`${base}/chats/users`, {data});
  }

  static deleteUserFromChat(data: Record<string, unknown>){
    return chatAPIinstance.delete(`${base}/chats/users`, {data});
  }

  static deleteChat(data: Record<string, unknown>){
    return chatAPIinstance.delete(`${base}/chats`, {data});
  }

  static getChatToken(id: number){
    return chatAPIinstance.post(`${base}/chats/token/${id}`);
  }
}
